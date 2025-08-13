import * as Tabs from "@radix-ui/react-tabs"

import AISuggestions from "@/app/components/AISuggestions"
import SEOAnalysis from "@/app/components/SEOAnalysis"
import LighthouseSummary from "@/app/components/LighthouseSummary"
import { AnalysisResult } from "@/app/types"

interface ResultsDisplayProps {
  results: AnalysisResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { seoData, psiData, suggestions } = results

  const suggestionsArray = Array.isArray(suggestions) ? suggestions : []
  return (
    <div>
  <h2 className="my-4 text-center text-2xl font-bold md:my-8">Results</h2>
      <div className="flex flex-row gap-4">
        <Tabs.Root className="flex w-full flex-col" defaultValue="seo">
          <Tabs.List
            className="glass-tabbar flex shrink-0 rounded-t-xl border-b border-white/10 px-1 py-1"
            aria-label="Manage your seo"
          >
            <Tabs.Trigger
              className="group flex h-[42px] flex-1 cursor-pointer select-none items-center justify-center rounded-lg px-0 text-[15px] leading-none outline-none data-[state=active]:cursor-not-allowed data-[state=active]:text-[#FF2574] data-[state=active]:focus:relative md:px-5"
              value="seo"
            >
              <span className="rounded-md px-4 py-2 group-data-[state=active]:bg-[#FF2574]/10 group-data-[state=active]:dark:bg-[#FF6B00]/10 group-data-[state=active]:dark:text-[#FF6B00]">
                Web Vitals
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger
              className="group flex h-[42px] flex-1 cursor-pointer select-none items-center justify-center rounded-lg px-0 text-[15px] leading-none outline-none data-[state=active]:cursor-not-allowed data-[state=active]:text-[#FF2574] data-[state=active]:focus:relative md:px-5"
              value="ai"
            >
              <span className="rounded-md px-4 py-2 group-data-[state=active]:bg-[#FF2574]/10 group-data-[state=active]:dark:bg-[#FF6B00]/10 group-data-[state=active]:dark:text-[#FF6B00]">
                AI Roast
              </span>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow rounded-b-xl p-5 outline-none glass-surface"
            value="seo"
          >
            <div className="flex flex-col gap-4">
              {seoData ? (
                <SEOAnalysis data={seoData} />
              ) : (
                <div>No SEO data available</div>
              )}
              {psiData ? (
                <LighthouseSummary data={psiData} />
              ) : (
                <div>No Lighthouse data available</div>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="grow rounded-b-xl p-5 outline-none glass-surface"
            value="ai"
          >
            {suggestionsArray.length > 0 ? (
              <AISuggestions suggestions={suggestionsArray} />
            ) : (
              <div>No suggestions available</div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
