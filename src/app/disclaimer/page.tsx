export const metadata = { title: "Disclaimer" }

export default function DisclaimerPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 pt-28 lg:pt-36 text-light12 dark:text-dark12">
      <div className="glass-surface rounded-2xl p-6">
        <h1 className="mb-3 text-3xl font-semibold">Disclaimer</h1>
        <p className="opacity-90">
          The information provided by RoastLab is for informational purposes only and may not
          reflect your full production environment. Always validate changes with your own lab and
          field data before deployment.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 opacity-85">
          <li>CrUX data availability varies by URL and origin.</li>
          <li>On page parsing does not execute client side JavaScript.</li>
          <li>AI generated content may contain inaccuracies; review before acting.</li>
          <li>Nothing here constitutes legal, security, or compliance advice.</li>
          <li>We do not accept responsibility for hurt feelings, singed egos, or dramatic gasps. The roast is playful; the fixes are serious.</li>
        </ul>
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
