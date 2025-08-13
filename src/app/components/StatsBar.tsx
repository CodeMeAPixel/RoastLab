export default function StatsBar() {
  const stats = [
    { k: "SEO checks", v: "12+" },
    { k: "Core metrics", v: "3" },
    { k: "Time to insight", v: "~3s" },
  ]
  return (
    <section className="mx-auto w-full max-w-3xl px-4 lg:px-8">
      <div className="glass-surface-soft rounded-2xl px-5 py-4">
        <ul className="grid grid-cols-3">
          {stats.map((s, i) => (
            <li key={i} className="flex flex-col items-center justify-center py-1">
              <span className="text-sm text-light11 dark:text-dark11">{s.k}</span>
              <span className="text-lg font-semibold">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
