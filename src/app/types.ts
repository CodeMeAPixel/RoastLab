import { PSIData } from "@/app/lib/psiAnalyzer"
import { SEOData } from "@/app/lib/seoAnalyzer"

export interface AnalysisResult {
  seoData: SEOData
  psiData: PSIData
  suggestions: string[]
}
