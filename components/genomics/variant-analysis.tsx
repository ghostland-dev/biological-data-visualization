"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Play, Upload, Download, Search, AlertCircle } from "lucide-react"

const mockVariants = [
  {
    id: "1",
    chromosome: "chr1",
    position: 12345678,
    ref: "A",
    alt: "G",
    quality: 95.2,
    depth: 45,
    type: "SNV",
    effect: "missense_variant",
    gene: "BRCA1",
    impact: "MODERATE",
  },
  {
    id: "2",
    chromosome: "chr2",
    position: 23456789,
    ref: "ATCG",
    alt: "A",
    quality: 87.5,
    depth: 32,
    type: "INDEL",
    effect: "frameshift_variant",
    gene: "TP53",
    impact: "HIGH",
  },
  {
    id: "3",
    chromosome: "chr3",
    position: 34567890,
    ref: "C",
    alt: "T",
    quality: 92.1,
    depth: 38,
    type: "SNV",
    effect: "synonymous_variant",
    gene: "EGFR",
    impact: "LOW",
  },
]

export function VariantAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<string>("")
  const [filterImpact, setFilterImpact] = useState<string>("all")

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "MODERATE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredVariants = filterImpact === "all" ? mockVariants : mockVariants.filter((v) => v.impact === filterImpact)

  return (
    <div className="space-y-6">
      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Configuration de l'analyse de variants
          </CardTitle>
          <CardDescription>Paramétrez votre analyse de variants génétiques</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vcf-file">Fichier VCF</Label>
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fichier VCF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sample1.vcf">sample1.vcf (2.3 MB)</SelectItem>
                  <SelectItem value="cohort_variants.vcf">cohort_variants.vcf (15.7 MB)</SelectItem>
                  <SelectItem value="exome_data.vcf">exome_data.vcf (8.9 MB)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Génome de référence</Label>
              <Select defaultValue="hg38">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hg38">GRCh38/hg38</SelectItem>
                  <SelectItem value="hg19">GRCh37/hg19</SelectItem>
                  <SelectItem value="mm10">GRCm38/mm10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality-threshold">Seuil de qualité</Label>
              <Input id="quality-threshold" type="number" defaultValue="30" min="0" max="100" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth-threshold">Profondeur minimale</Label>
              <Input id="depth-threshold" type="number" defaultValue="10" min="1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regions">Régions d'intérêt (optionnel)</Label>
            <Textarea id="regions" placeholder="chr1:1000000-2000000&#10;chr2:3000000-4000000" className="h-20" />
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={startAnalysis}
              disabled={!selectedFile || isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAnalyzing ? "Analyse en cours..." : "Lancer l'analyse"}
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Charger un fichier
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression de l'analyse</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {progress === 100 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Résultats de l'analyse</CardTitle>
                <CardDescription>{filteredVariants.length} variants détectés</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={filterImpact} onValueChange={setFilterImpact}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les impacts</SelectItem>
                    <SelectItem value="HIGH">Impact élevé</SelectItem>
                    <SelectItem value="MODERATE">Impact modéré</SelectItem>
                    <SelectItem value="LOW">Impact faible</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredVariants.map((variant) => (
                <div key={variant.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">
                          {variant.chromosome}:{variant.position.toLocaleString()}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {variant.type}
                        </Badge>
                        <Badge variant="secondary" className={getImpactColor(variant.impact)}>
                          {variant.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {variant.ref} → {variant.alt} • {variant.effect} • Gène: {variant.gene}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-slate-900 dark:text-slate-100">Qualité: {variant.quality}</p>
                      <p className="text-slate-600 dark:text-slate-400">Profondeur: {variant.depth}x</p>
                    </div>
                  </div>

                  {variant.impact === "HIGH" && (
                    <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/30 rounded text-sm">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-red-800 dark:text-red-200">
                        Variant à impact élevé - Révision recommandée
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
