import { Bot, GaugeCircle, Search, Sparkles, Share2, ShieldCheck } from "lucide-react"

export default function FeatureGrid() {
  const features = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "SEO scan",
      body: "Titles, descriptions, headings, robots the stuff that actually matters.",
    },
    {
      icon: <GaugeCircle className="h-5 w-5" />,
      title: "Core Web Vitals",
      body: "Real-user CrUX data for LCP, CLS, and INP on mobile and desktop.",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI roast",
      body: "Blunt, actionable feedback with steps you can ship today.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "No setup",
      body: "Paste a URL. We’ll do the rest. No extensions. No fluff.",
    },
    {
  icon: <Share2 className="h-5 w-5" />,
  title: "Shareable link",
  body: "Bookmark or share results with the ?url= parameter.",
    },
    {
  icon: <ShieldCheck className="h-5 w-5" />,
  title: "Privacy first",
  body: "No login, no storage. Analysis runs server-side.",
    }
  ]
  return (
    <section className="mx-auto w-full max-w-6xl px-4 lg:px-8">
      <h2 className="mb-4 text-center text-xl font-semibold">What you get</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="glass-surface-soft rounded-2xl p-5">
            <div className="mb-3 inline-flex items-center justify-center rounded-md border border-white/20 bg-white/20 p-2 text-light12 dark:border-white/10 dark:bg-white/10 dark:text-dark12">
              {f.icon}
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-light11 dark:text-dark11">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
