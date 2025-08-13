"use client"

import useUrlStore from "@/app/components/AppContext"
import FeatureGrid from "@/app/components/FeatureGrid"
import StatsBar from "@/app/components/StatsBar"
import Steps from "@/app/components/Steps"

export default function LandingSections() {
  const currentUrl = useUrlStore((s) => s.currentUrl)
  const results = useUrlStore((s) => s.results)

  if (currentUrl || results) return null

  return (
    <div className="mt-10 space-y-10">
       <Steps />
      <FeatureGrid />
      <StatsBar />
    </div>
  )
}
