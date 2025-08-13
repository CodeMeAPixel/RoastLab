"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"

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

        {/* GitHub link */}
        <a
          href="https://github.com/CodeMeAPixel/RoastLab"
          aria-label="GitHub Repository"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-auto cursor-pointer items-center justify-center gap-2 p-1"
        >
          <FaGithub size={18} className="text-black dark:text-white" aria-hidden="true" />
        </a>

        {/* Discord link */}
        <a
          href="https://discord.gg/Vv2bdC44Ge"
          aria-label="Join us on Discord"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-auto cursor-pointer items-center justify-center gap-2 p-1"
        >
          <FaDiscord size={18} className="text-[#5865F2] dark:text-[#5865F2]" aria-hidden="true" />
        </a>

        {/* X/Twitter link */}
        <a
          href="https://x.com/RoastLabApp"
          aria-label="Find us on X"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-auto cursor-pointer items-center justify-center gap-2 p-1"
        >
          <FaXTwitter size={16} className="fill-light12 dark:fill-dark12" aria-hidden="true" />
        </a>
      </div>
     <ThemeSwitch />
    </nav>
  )
}
