export const metadata = { title: "FAQs" }

export default function FaqsPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 pt-28 lg:pt-36 text-light12 dark:text-dark12 mb-12">
      <div className="glass-surface rounded-2xl p-6">
        <h1 className="mb-4 text-3xl font-semibold">FAQs</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">What data do you use?</h2>
            <p className="opacity-90">Chrome UX Report (CrUX) field data and on-page SEO signals.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Does it run JavaScript?</h2>
            <p className="opacity-90">No pages are parsed as static HTML. Some SPA only meta may not appear.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Will AI hallucinate?</h2>
            <p className="opacity-90">We constrain the prompt and map outputs to a fixed schema to reduce fluff.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Do you store my URLs?</h2>
            <p className="opacity-90">No persistent storage is used in this app.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Is the roast mean? Will it hurt feelings?</h2>
            <p className="opacity-90">The tone is witty and blunt, but the goal is to help you ship fixes not to insult anyone. If the sass stings, take the win and apply the advice. We’re not responsible for bruised egos.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Why don’t I see data for my URL?</h2>
            <p className="opacity-90">CrUX may lack URL level data. We automatically fall back to origin level data when possible.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Can I use this in production audits?</h2>
            <p className="opacity-90">Use it as a starting point. Always validate with your own lab tests, Lighthouse runs, and RUM before deploying changes.</p>
          </div>
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
