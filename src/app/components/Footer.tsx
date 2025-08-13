export default function Footer() {
  return (
    <footer className="border-t border-white/10 dark:border-white/5">
      <div className="container mx-auto max-w-2xl px-6 text-base">
        <div className="py-8">
          <div className="glass-surface rounded-2xl p-4">
            <div className="flex flex-row items-center justify-between text-light12 dark:text-dark12">
              <a href="https://github.com/educlopez/web-roast" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  RoastLab on GitHub
                </div>
              </a>
              <a href="https://x.com/educalvolpz" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  Twitter
                </div>
              </a>
              <a href="https://www.linkedin.com/in/educlopez/" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  LinkedIn
                </div>
              </a>
            </div>
            <div className="mt-4 flex w-full justify-center text-center text-light12 dark:text-dark12">
              <div>Made with ❤️ from Canada.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
