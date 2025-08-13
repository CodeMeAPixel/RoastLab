"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function NavPill() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <motion.nav
      className="fixed left-0 right-0 top-5 z-10 flex scale-75 items-center justify-center transition-transform duration-300"
      animate={{ top: isScrolled ? -50 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <span className="transition-background absolute left-1/2 top-0 z-20 flex h-14 -translate-x-1/2 transform flex-row items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/30 px-4 py-2 text-lg font-semibold text-light12 shadow-sm backdrop-blur-2xl transition duration-200 ease-in-out dark:border-white/10 dark:bg-white/5 dark:text-dark12">
        <div className="flex items-center gap-2">
          <span>👋 Welcome to Roast Lab</span>
        </div>
      </span>
    </motion.nav>
  )
}
