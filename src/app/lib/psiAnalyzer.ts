"use server";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const API_KEY = process.env.GOOGLE_API_KEY;

export interface LighthouseMetrics {
  performanceScore: number | null; // 0-100
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  seoScore: number | null;
  pwaScore: number | null;
  fcp: number | null; // ms
  lcp: number | null; // ms
  cls: number | null; // unitless
  tbt: number | null; // ms
  speedIndex: number | null; // ms
  ttfb: number | null; // ms
  totalByteWeight: number | null; // bytes
  networkRequests: number | null; // count
  opportunities: Array<{ id: string; title: string; savingsMs: number }>; // top 5
  largestAssets: Array<{ url: string; size: number; type: string }>; // top 5
  thirdPartySummary: Array<{ domain: string; requests: number; bytes: number }>; // top 5
  screenshot: string | null; // base64
}

export interface PSIData {
  mobile: LighthouseMetrics;
  desktop: LighthouseMetrics;
}

const EMPTY: LighthouseMetrics = {
  performanceScore: null,
  accessibilityScore: null,
  bestPracticesScore: null,
  seoScore: null,
  pwaScore: null,
  fcp: null,
  lcp: null,
  cls: null,
  tbt: null,
  speedIndex: null,
  ttfb: null,
  totalByteWeight: null,
  networkRequests: null,
  opportunities: [],
  largestAssets: [],
  thirdPartySummary: [],
  screenshot: null,
};

function toMs(v: any): number | null {
  return typeof v === "number" && isFinite(v) ? Math.round(v) : null;
}

function parseLighthouse(json: any): LighthouseMetrics {
  try {
    const lh = json?.lighthouseResult;
    if (!lh) return EMPTY;
    const audits = lh.audits || {};
    const cats = lh.categories || {};
    const perfScore = cats.performance?.score != null ? Math.round(cats.performance.score * 100) : null;
    const accessibilityScore = cats.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null;
    const bestPracticesScore = cats["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : null;
    const seoScore = cats.seo?.score != null ? Math.round(cats.seo.score * 100) : null;
    const pwaScore = cats.pwa?.score != null ? Math.round(cats.pwa.score * 100) : null;

    const netReq = (() => {
      const details = audits["network-requests"]?.details;
      if (details?.items?.length != null) return details.items.length as number;
      return null;
    })();

    const opps = (lh?.audits ? Object.values(lh.audits) : [])
      .filter((a: any) => a?.details?.type === "opportunity" && typeof a?.details?.overallSavingsMs === "number" && a?.title)
      .map((a: any) => ({ id: a?.id || a?.title, title: a?.title, savingsMs: Math.round(a.details.overallSavingsMs) }))
      .sort((a: any, b: any) => b.savingsMs - a.savingsMs)
      .slice(0, 5);

    // Largest assets (images/scripts/styles)
    const largestAssets: Array<{ url: string; size: number; type: string }> = [];
    const assetDetails = audits["resource-summary"]?.details?.items || [];
    assetDetails.forEach((item: any) => {
      if (item.url && item.transferSize && item.resourceType) {
        largestAssets.push({ url: item.url, size: item.transferSize, type: item.resourceType });
      }
    });
    largestAssets.sort((a, b) => b.size - a.size);
    const topAssets = largestAssets.slice(0, 5);

    // Third-party summary
    const thirdPartySummary: Array<{ domain: string; requests: number; bytes: number }> = [];
    const thirdPartyDetails = audits["third-party-summary"]?.details?.items || [];
    thirdPartyDetails.forEach((item: any) => {
      if (item.entity && item.requestCount && item.transferSize) {
        thirdPartySummary.push({ domain: item.entity, requests: item.requestCount, bytes: item.transferSize });
      }
    });
    thirdPartySummary.sort((a, b) => b.bytes - a.bytes);
    const topThirdParty = thirdPartySummary.slice(0, 5);

    // Screenshot
    const screenshot = audits["final-screenshot"]?.details?.data || null;

    return {
      performanceScore: perfScore,
      accessibilityScore,
      bestPracticesScore,
      seoScore,
      pwaScore,
      fcp: toMs(audits["first-contentful-paint"]?.numericValue),
      lcp: toMs(audits["largest-contentful-paint"]?.numericValue),
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      tbt: toMs(audits["total-blocking-time"]?.numericValue),
      speedIndex: toMs(audits["speed-index"]?.numericValue),
      ttfb: toMs(audits["server-response-time"]?.numericValue ?? audits["time-to-first-byte"]?.numericValue),
      totalByteWeight: audits["total-byte-weight"]?.numericValue ?? null,
      networkRequests: netReq,
      opportunities: opps as any,
      largestAssets: topAssets,
      thirdPartySummary: topThirdParty,
      screenshot,
    };
  } catch {
    return EMPTY;
  }
}

async function runPSI(url: string, strategy: "mobile" | "desktop"): Promise<LighthouseMetrics> {
  try {
    const params = new URLSearchParams({ url, strategy, category: "performance" });
    if (API_KEY) params.set("key", API_KEY);
  const psiUrl = `${PSI_ENDPOINT}?${params.toString()}`;
    const res = await fetch(psiUrl, { signal: (AbortSignal as any).timeout?.(30000) });
    if (!res.ok) throw new Error(`PSI ${strategy} failed: ${res.status}`);
    const json = await res.json();
    return parseLighthouse(json);
  } catch (e) {
    console.error(`PageSpeed Insights error (${strategy}):`, (e as any)?.message || e);
    return EMPTY;
  }
}

export async function analyzePSI(url: string): Promise<PSIData> {
  const [mobile, desktop] = await Promise.all([runPSI(url, "mobile"), runPSI(url, "desktop")]);
  return { mobile, desktop };
}
