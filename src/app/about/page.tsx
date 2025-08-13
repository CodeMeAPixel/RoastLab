export const metadata = { title: "About" }

export default function AboutPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 pt-28 lg:pt-36 text-light12 dark:text-dark12 mb-12">
      <div className="glass-surface rounded-2xl p-6">
        <h1 className="mb-3 text-3xl font-semibold">About Roast Lab</h1>
        <p className="opacity-80">
          RoastLab gives you a blunt, helpful critique of your site using real-user data and on-page signals.
          It blends Chrome UX Report (CrUX), SEO parsing, and an AI assistant to prioritize fixes that matter.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-4 dark:border-white/5">
            <h2 className="mb-2 text-xl font-semibold">What it checks</h2>
            <ul className="list-disc space-y-1 pl-5 opacity-90">
              <li>Core Web Vitals from CrUX (Mobile & Desktop)</li>
              <li>SEO basics (title, description, keywords/tags)</li>
              <li>Robots directives and canonical hints</li>
              <li>Headings and basic content structure</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 p-4 dark:border-white/5">
            <h2 className="mb-2 text-xl font-semibold">How it works</h2>
            <ol className="list-decimal space-y-1 pl-5 opacity-90">
              <li>Fetches your page HTML (no JS execution)</li>
              <li>Queries CrUX for field data (URL then origin fallback)</li>
              <li>Generates prioritized suggestions with AI</li>
              <li>Shows quick wins first</li>
            </ol>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-white/10 p-4 dark:border-white/5">
          <h2 className="mb-2 text-xl font-semibold">Roadmap</h2>
          <ul className="list-disc space-y-1 pl-5 opacity-90">
            <li>Deeper metadata and link audit</li>
            <li>Screenshot-based LCP heuristics</li>
            <li>Exportable checklists</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 glass-surface rounded-2xl p-4">
        <h3 className="text-lg font-semibold">Credits</h3>
        <p className="opacity-90">
          Built by <a className="underline hover:opacity-80" href="https://codemeapixel.dev" target="_blank" rel="noopener noreferrer">CodeMeAPixel</a>.
        </p>
      </div>
    </section>
  )
}
