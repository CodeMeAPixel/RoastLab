"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import useUrlStore from "@/app/components/AppContext"
import ResultsDisplay from "@/app/components/ResultsDisplay"

import ScannerWindowAnimation from "./Scaner"

interface AnalyzerFormProps {
  minLoadingTime?: number
}

export function AnalyzerForm({ minLoadingTime = 3000 }: AnalyzerFormProps) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)
  const results = useUrlStore((state) => state.results)
  const setResults = useUrlStore((state) => state.setResults)
  const clearState = useUrlStore((state) => state.clearState)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlParam = searchParams.get("url")
    if (urlParam) {
      setUrl(urlParam)
  updateStoreUrl(urlParam)
      handleAnalysis(urlParam)
    } else {
      clearState()
    }
  }, [searchParams])

  const startRef = useRef(0)
  const mutation = useMutation({
    mutationKey: ["analyze"],
    mutationFn: async (urlToAnalyze: string) => {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToAnalyze }),
      })
      if (!res.ok) throw new Error("Analysis failed")
      return res.json()
    },
    onSuccess: async (data, urlToAnalyze) => {
      setResults(data)
      updateStoreUrl(urlToAnalyze)
      router.push(`?url=${urlToAnalyze}`, undefined)
  const elapsedTime = Date.now() - (startRef.current || Date.now())
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
      await new Promise((r) => setTimeout(r, remainingTime))
      setIsLoading(false)
      setShowResults(true)
    },
    onError: (err) => {
      console.error("Error:", err)
      clearState()
      setIsLoading(false)
      setShowResults(true)
    },
  })

  const handleAnalysis = async (urlToAnalyze: string) => {
    setIsLoading(true)
    setShowResults(false)
    updateStoreUrl(urlToAnalyze)
    startRef.current = Date.now()
    mutation.mutate(urlToAnalyze)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAnalysis(url)
  }

  return (
    <div>
      {!currentUrl && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3"
        >
          <fieldset className="relative flex w-full gap-2 rounded-xl p-2 glass-surface">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="h-[40px] w-full flex-1 rounded-md px-3 font-sans text-sm transition-colors ease-out glass-input"
              required
            />
            <button
              type="submit"
              className="absolute right-3 top-3 flex h-[32px] w-24 items-center justify-center overflow-hidden glass-button-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              <span className="text-shadow-sm text-[13px]">
                {isLoading ? "Analyzing..." : "Analyze"}
              </span>
            </button>
          </fieldset>
        </form>
      )}
      {isLoading && <ScannerWindowAnimation />}
      {showResults && results && <ResultsDisplay results={results} />}
    </div>
  )
}

export default function WrappedAnalyzerForm({
  minLoadingTime,
}: AnalyzerFormProps) {
  return (
    <Suspense fallback={<ScannerWindowAnimation />}>
      <AnalyzerForm minLoadingTime={minLoadingTime} />
    </Suspense>
  )
}
