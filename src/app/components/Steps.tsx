import { CheckCircle2, Link2, ScanSearch } from "lucide-react"

export default function Steps() {
  const steps = [
    {
      title: "Drop a URL",
      body: "Any public site. We sanitize inputs for safety.",
      icon: <Link2 className="h-5 w-5" />,
    },
    {
      title: "We analyze",
      body: "Fetch HTML, parse SEO, and pull field data from CrUX.",
      icon: <ScanSearch className="h-5 w-5" />,
    },
    {
      title: "Get the roast",
      body: "Clear fixes with a spicy tone. Prioritized and pragmatic.",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ]
  return (
    <section className="mx-auto w-full max-w-4xl px-4 lg:px-8">
      <h2 className="mb-4 text-center text-xl font-semibold">How it works</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="glass-surface-soft rounded-2xl p-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/20 px-2 py-1 text-xs font-medium dark:border-white/10 dark:bg-white/10">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/40 text-[12px] font-semibold text-light12 dark:bg-white/10 dark:text-dark12">
                {i + 1}
              </span>
              {s.icon}
              <span className="text-sm">{s.title}</span>
            </div>
            <p className="text-sm text-light11 dark:text-dark11">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
