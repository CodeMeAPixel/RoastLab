import { PSIData } from "@/app/lib/psiAnalyzer"

interface LighthouseSummaryProps {
  data: PSIData
}

export default function LighthouseSummary({ data }: LighthouseSummaryProps) {
  const Tile = ({ title, mobile, desktop }: { title: string; mobile: any; desktop: any }) => (
    <div className="rounded-xl p-4 glass-surface">
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="mt-1 grid grid-cols-2 gap-2 text-sm opacity-90">
        <div>
          <div className="opacity-70">Mobile</div>
          <div>{mobile ?? "N/A"}</div>
        </div>
        <div>
          <div className="opacity-70">Desktop</div>
          <div>{desktop ?? "N/A"}</div>
        </div>
      </div>
    </div>
  )

  // Defensive: default all arrays/fields to avoid undefined errors
  const m = {
    ...data.mobile,
    largestAssets: Array.isArray(data.mobile?.largestAssets) ? data.mobile.largestAssets : [],
    thirdPartySummary: Array.isArray(data.mobile?.thirdPartySummary) ? data.mobile.thirdPartySummary : [],
    opportunities: Array.isArray(data.mobile?.opportunities) ? data.mobile.opportunities : [],
    screenshot: typeof data.mobile?.screenshot === "string" ? data.mobile.screenshot : null,
  }
  const d = {
    ...data.desktop,
    largestAssets: Array.isArray(data.desktop?.largestAssets) ? data.desktop.largestAssets : [],
    thirdPartySummary: Array.isArray(data.desktop?.thirdPartySummary) ? data.desktop.thirdPartySummary : [],
    opportunities: Array.isArray(data.desktop?.opportunities) ? data.desktop.opportunities : [],
    screenshot: typeof data.desktop?.screenshot === "string" ? data.desktop.screenshot : null,
  }

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">PageSpeed Insights</h3>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Tile title="Performance" mobile={m.performanceScore} desktop={d.performanceScore} />
        <Tile title="Accessibility" mobile={m.accessibilityScore} desktop={d.accessibilityScore} />
        <Tile title="Best Practices" mobile={m.bestPracticesScore} desktop={d.bestPracticesScore} />
        <Tile title="SEO" mobile={m.seoScore} desktop={d.seoScore} />
        <Tile title="PWA" mobile={m.pwaScore} desktop={d.pwaScore} />
        <Tile title="LCP (ms)" mobile={m.lcp} desktop={d.lcp} />
        <Tile title="CLS" mobile={m.cls} desktop={d.cls} />
        <Tile title="FCP (ms)" mobile={m.fcp} desktop={d.fcp} />
        <Tile title="TBT (ms)" mobile={m.tbt} desktop={d.tbt} />
        <Tile title="Speed Index (ms)" mobile={m.speedIndex} desktop={d.speedIndex} />
        <Tile title="TTFB (ms)" mobile={m.ttfb} desktop={d.ttfb} />
        <Tile title="# Requests" mobile={m.networkRequests} desktop={d.networkRequests} />
        <Tile title="Bytes (KB)" mobile={m.totalByteWeight != null ? Math.round(m.totalByteWeight / 1024) : null} desktop={d.totalByteWeight != null ? Math.round(d.totalByteWeight / 1024) : null} />
      </div>

      {/* Largest assets */}
      {(m.largestAssets.length > 0 || d.largestAssets.length > 0) && (
        <div className="mt-4 rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Largest Assets (Mobile)</h4>
          <ul className="ml-5 list-disc text-sm">
            {m.largestAssets.map((a, i) => (
              <li key={`m-asset-${i}`}>{a.type}: <span className="break-all">{a.url}</span> — {Math.round(a.size / 1024)} KB</li>
            ))}
            {m.largestAssets.length === 0 && <li className="opacity-70">None</li>}
          </ul>
          <h4 className="mt-3 text-lg font-semibold">Largest Assets (Desktop)</h4>
          <ul className="ml-5 list-disc text-sm">
            {d.largestAssets.map((a, i) => (
              <li key={`d-asset-${i}`}>{a.type}: <span className="break-all">{a.url}</span> — {Math.round(a.size / 1024)} KB</li>
            ))}
            {d.largestAssets.length === 0 && <li className="opacity-70">None</li>}
          </ul>
        </div>
      )}

      {/* Third-party summary */}
      {(m.thirdPartySummary.length > 0 || d.thirdPartySummary.length > 0) && (
        <div className="mt-4 rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Third-Party Domains (Mobile)</h4>
          <ul className="ml-5 list-disc text-sm">
            {m.thirdPartySummary.map((t, i) => (
              <li key={`m-third-${i}`}>{t.domain} — {t.requests} req, {Math.round(t.bytes / 1024)} KB</li>
            ))}
            {m.thirdPartySummary.length === 0 && <li className="opacity-70">None</li>}
          </ul>
          <h4 className="mt-3 text-lg font-semibold">Third-Party Domains (Desktop)</h4>
          <ul className="ml-5 list-disc text-sm">
            {d.thirdPartySummary.map((t, i) => (
              <li key={`d-third-${i}`}>{t.domain} — {t.requests} req, {Math.round(t.bytes / 1024)} KB</li>
            ))}
            {d.thirdPartySummary.length === 0 && <li className="opacity-70">None</li>}
          </ul>
        </div>
      )}

      {/* Top opportunities */}
      {m.opportunities.length > 0 || d.opportunities.length > 0 ? (
        <div className="mt-4 rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Top Opportunities (Mobile)</h4>
          <ul className="ml-5 list-disc text-sm">
            {m.opportunities.map((o) => (
              <li key={`m-${o.id}`}>{o.title} — save ~{o.savingsMs} ms</li>
            ))}
            {m.opportunities.length === 0 && <li className="opacity-70">None</li>}
          </ul>
          <h4 className="mt-3 text-lg font-semibold">Top Opportunities (Desktop)</h4>
          <ul className="ml-5 list-disc text-sm">
            {d.opportunities.map((o) => (
              <li key={`d-${o.id}`}>{o.title} — save ~{o.savingsMs} ms</li>
            ))}
            {d.opportunities.length === 0 && <li className="opacity-70">None</li>}
          </ul>
        </div>
      ) : null}

      {/* Screenshot */}
      {(m.screenshot || d.screenshot) && (
        <div className="mt-4 rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Final Screenshot (Mobile)</h4>
          {m.screenshot && (
            <img src={m.screenshot} alt="Mobile screenshot" className="mb-2 w-full max-w-[320px] rounded-md border border-white/10" />
          )}
          <h4 className="mt-3 text-lg font-semibold">Final Screenshot (Desktop)</h4>
          {d.screenshot && (
            <img src={d.screenshot} alt="Desktop screenshot" className="mb-2 w-full max-w-[320px] rounded-md border border-white/10" />
          )}
        </div>
      )}
    </div>
  )
}
