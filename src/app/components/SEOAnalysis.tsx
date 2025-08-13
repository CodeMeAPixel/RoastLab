import { SEOData } from "@/app/lib/seoAnalyzer"

interface SEOAnalysisProps {
  data: SEOData
}

export default function SEOAnalysis({ data }: SEOAnalysisProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Title</h4>
          <p className="break-words whitespace-pre-wrap">{data.title}</p>
          {typeof data.titleLength === "number" && (
            <p className="mt-1 text-sm opacity-70">Length: {data.titleLength}</p>
          )}
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Description</h4>
          <p className="break-words whitespace-pre-wrap">{data.metaDescription}</p>
          {typeof data.descriptionLength === "number" && (
            <p className="mt-1 text-sm opacity-70">Length: {data.descriptionLength}</p>
          )}
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Keywords</h4>
          <p className="max-h-32 overflow-y-auto break-words whitespace-pre-wrap pr-1">{data.keywords ? data.keywords : "N/A"}</p>
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Og Image</h4>
          {data.ogImg ? (
            <img
              src={data.ogImg}
              alt={data.title || "Open Graph Image"}
              className="w-[400px] rounded-md"
            />
          ) : (
            <p>Not found</p>
          )}
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm opacity-70">
            <span>OG basics: {data.hasOgBasic ? "Yes" : "No"}</span>
            <span>Twitter card: {data.hasTwitterCard ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="col-span-1 flex h-full flex-col gap-4">
          <div className="h-1/2 rounded-xl p-4 glass-surface">
            <h4 className="text-lg font-semibold">H1</h4>
            <p>{data.h1Count}</p>
            {data.firstH1 && (
              <p className="mt-1 break-words whitespace-pre-wrap text-sm opacity-70">First: {data.firstH1}</p>
            )}
          </div>
          <div className="h-1/2 rounded-xl p-4 glass-surface">
            <h4 className="text-lg font-semibold">H2</h4>
            <p>{data.h2Count}</p>
          </div>
        </div>
        <div className="col-span-1 flex h-full flex-col gap-4">
          <div className="h-1/2 rounded-xl p-4 glass-surface">
            <h4 className="text-lg font-semibold">Robots</h4>
            <p className="break-words whitespace-pre-wrap">{data.robots ? data.robots : "N/A"}</p>
            <p className="mt-1 text-sm opacity-70">
              Indexable: {data.indexable === null ? "Unknown" : data.indexable ? "Yes" : "No"} • Follow: {data.follow === null ? "Unknown" : data.follow ? "Yes" : "No"}
            </p>
          </div>
          <div className="h-1/2 rounded-xl p-4 glass-surface">
            <h4 className="text-lg font-semibold">GoogleBots</h4>
            <p className="break-words whitespace-pre-wrap">{data.googlebot ? data.googlebot : "N/A"}</p>
          </div>
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Canonical & URL</h4>
          <p className="break-all">Final URL: {data.finalUrl}</p>
          <p className="break-all">Canonical: {data.canonical || "N/A"}</p>
          <p className="mt-1 text-sm opacity-70">Self-referential: {data.canonicalIsSelf ? "Yes" : "No"}</p>
          <p className="mt-1 text-sm opacity-70">Status: {data.status}</p>
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Viewport & Theme</h4>
          <p>Viewport: {data.viewport ? "Present" : "Missing"}</p>
          <p>Responsive: {data.viewportIsResponsive ? "Yes" : "No"}</p>
          <p>Theme color: {data.metaThemeColor || "N/A"}</p>
          <p>Lang: {data.lang || "N/A"}</p>
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Resources & Intl</h4>
          <div className="grid grid-cols-2 gap-2 text-sm opacity-80">
            <span>Favicon: {data.hasFavicon ? "Yes" : "No"}</span>
            <span>JSON-LD: {data.jsonLdCount}</span>
            <span>Hreflang: {data.hreflangCount}</span>
            <span>Preconnect: {data.preconnectCount}</span>
            <span>Preload: {data.preloadCount}</span>
            <span>Charset: {data.metaCharset || "N/A"}</span>
          </div>
        </div>
        <div className="rounded-xl p-4 glass-surface">
          <h4 className="text-lg font-semibold">Images</h4>
          <p>Total: {data.imgCount}</p>
          <p className="mt-1 text-sm opacity-70">Without alt: {data.imgWithoutAlt}</p>
        </div>
      </div>
    </div>
  )
}
