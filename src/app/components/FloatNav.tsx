"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"

import useUrlStore from "@/app/components/AppContext"
import { ThemeSwitch } from "@/app/components/ThemeSwitch"

export function FloatNav() {
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const clearState = useUrlStore((state) => state.clearState)
  const router = useRouter()

  const handleClick = () => {
    clearState()
    router.push("/", undefined)
    router.refresh()
  }

  const formattedUrl = currentUrl
    ? currentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : ""

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-full border border-white/15 bg-white/30 px-4 py-2 text-light12 shadow-sm backdrop-blur-2xl transition dark:border-white/10 dark:bg-white/5 dark:text-dark12">
      <AnimatePresence>
        {currentUrl && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-[#FF2574]/5 px-2 py-1 font-mono text-[13px] text-[#FF2574] dark:bg-[#FF6B00]/5 dark:text-[#FF6B00]"
              onClick={handleClick}
            >
              <Trash2 size={16} />
              {formattedUrl}
            </motion.span>
          </>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-md p-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Home"
          title="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 11l9-7 9 7" />
            <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
          </svg>
          <span className="sr-only">Home</span>
        </Link>
        <Link
          href="/about"
          className="rounded-md p-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="About"
          title="About"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 17v-4" />
            <path d="M12 9h.01" />
          </svg>
          <span className="sr-only">About</span>
        </Link>
        <Link
          href="/disclaimer"
          className="rounded-md p-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Disclaimer"
          title="Disclaimer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            <path d="M12 8v5" />
            <path d="M12 17h.01" />
          </svg>
          <span className="sr-only">Disclaimer</span>
        </Link>
        <Link
          href="/faqs"
          className="rounded-md p-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="FAQs"
          title="FAQs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 115 0c0 1.2-.8 1.8-1.6 2.2-.7.35-.9.8-.9 1.8" />
            <path d="M12 17h.01" />
          </svg>
          <span className="sr-only">FAQs</span>
        </Link>
        <a
        href="https://x.com/RoastLabApp"
        aria-label="Find us on X"
        target="_blank"
        className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="fill-light12 dark:fill-dark12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.773 2.5h2.545l-5.56 6.354 6.54 8.646h-5.12l-4.01-5.244-4.59 5.244H2.032l5.946-6.796L1.704 2.5h5.25l3.626 4.793L14.773 2.5zm-.893 13.477h1.41L6.19 3.943H4.676l9.204 12.034z"></path>
        </svg>
      </a>
      </div>
     <ThemeSwitch />
    </nav>
  )
}
