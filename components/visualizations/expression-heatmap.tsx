"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BarChart3, Download, Palette, Filter } from "lucide-react"

// Mock expression data
const mockExpressionData = {
  genes: ["BRCA1", "TP53", "EGFR", "MYC", "KRAS", "PIK3CA", "AKT1", "PTEN", "RB1", "CDKN2A"],
  samples: ["Sample_1", "Sample_2", "Sample_3", "Sample_4", "Sample_5", "Sample_6", "Sample_7", "Sample_8"],
  conditions: ["Control", "Control", "Control", "Control", "Treatment", "Treatment", "Treatment", "Treatment"],
  data: [
    [2.1, 1.8, 2.3, 1.9, 4.2, 3.8, 4.1, 3.9], // BRCA1
    [1.5, 1.7, 1.4, 1.6, 3.2, 3.5, 3.1, 3.4], // TP53
    [3.2, 2.9, 3.1, 3.0, 1.2, 1.5, 1.1, 1.3], // EGFR
    [2.8, 3.1, 2.7, 2.9, 5.1, 4.8, 5.2, 4.9], // MYC
    [1.9, 2.2, 1.8, 2.1, 2.8, 3.1, 2.7, 3.0], // KRAS
    [2.5, 2.3, 2.6, 2.4, 1.8, 2.1, 1.7, 2.0], // PIK3CA
    [3.4, 3.2, 3.5, 3.3, 2.1, 2.4, 2.0, 2.3], // AKT1
    [1.2, 1.4, 1.1, 1.3, 3.8, 4.1, 3.7, 4.0], // PTEN
    [2.7, 2.5, 2.8, 2.6, 1.5, 1.8, 1.4, 1.7], // RB1
    [1.6, 1.9, 1.5, 1.8, 4.5, 4.2, 4.6, 4.3], // CDKN2A
  ],
}

export function ExpressionHeatmap() {
  const [colorScheme, setColorScheme] = useState("RdYlBu")
  const [clustering, setClustering] = useState("hierarchical")
  const [threshold, setThreshold] = useState([2.0])
  const [showDendrogram, setShowDendrogram] = useState(true)

  const getColorIntensity = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min)
    if (colorScheme === "RdYlBu") {
      if (normalized < 0.5) {
        const intensity = Math.round(normalized * 2 * 255)
        return `rgb(${255}, ${255 - intensity}, ${255 - intensity})`
      } else {
        const intensity = Math.round((normalized - 0.5) * 2 * 255)
        return `rgb(${255 - intensity}, ${255 - intensity}, 255)`
      }
    }
    // Default to grayscale
    const intensity = Math.round(normalized * 255)
    return `rgb(${intensity}, ${intensity}, ${intensity})`
  }

  const allValues = mockExpressionData.data.flat()
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)

  return (
    <div className="space-y-6">
      {/* Heatmap Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Configuration de la heatmap
          </CardTitle>
          <CardDescription>Paramétrez l'affichage de votre carte de chaleur d'expression</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color-scheme">Palette de couleurs</Label>
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RdYlBu">Rouge-Jaune-Bleu</SelectItem>
                  <SelectItem value="RdBu">Rouge-Bleu</SelectItem>
                  <SelectItem value="Viridis">Viridis</SelectItem>
                  <SelectItem value="Plasma">Plasma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clustering">Clustering</Label>
              <Select value={clustering} onValueChange={setClustering}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hierarchical">Hiérarchique</SelectItem>
                  <SelectItem value="kmeans">K-means</SelectItem>
                  <SelectItem value="none">Aucun</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Seuil d'expression ({threshold[0]})</Label>
              <Slider value={threshold} onValueChange={setThreshold} min={0} max={5} step={0.1} className="mt-1" />
            </div>

            <div className="flex items-end gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Palette className="w-4 h-4 mr-2" />
                Thème
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expression Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques d'expression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{mockExpressionData.genes.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Gènes</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{mockExpressionData.samples.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Échantillons</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{minValue.toFixed(1)}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Min</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{maxValue.toFixed(1)}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Max</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Heatmap d'expression génique</CardTitle>
              <CardDescription>Expression différentielle entre conditions</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample labels */}
            <div className="flex">
              <div className="w-20"></div> {/* Space for gene names */}
              <div className="flex-1 grid grid-cols-8 gap-1">
                {mockExpressionData.samples.map((sample, index) => (
                  <div key={sample} className="text-center">
                    <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-1">{sample}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        mockExpressionData.conditions[index] === "Control"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {mockExpressionData.conditions[index]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="border rounded-lg overflow-hidden">
              {mockExpressionData.genes.map((gene, geneIndex) => (
                <div key={gene} className="flex border-b last:border-b-0">
                  <div className="w-20 p-2 bg-slate-50 dark:bg-slate-800 border-r flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{gene}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-8 gap-0">
                    {mockExpressionData.data[geneIndex].map((value, sampleIndex) => (
                      <div
                        key={sampleIndex}
                        className="h-8 flex items-center justify-center text-xs font-medium border-r last:border-r-0"
                        style={{
                          backgroundColor: getColorIntensity(value, minValue, maxValue),
                          color: value > (minValue + maxValue) / 2 ? "white" : "black",
                        }}
                        title={`${gene} - ${mockExpressionData.samples[sampleIndex]}: ${value.toFixed(2)}`}
                      >
                        {value.toFixed(1)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Color scale legend */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Faible</span>
              <div className="flex h-4 w-48 rounded overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{
                      backgroundColor: getColorIntensity(
                        minValue + (i / 19) * (maxValue - minValue),
                        minValue,
                        maxValue,
                      ),
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Élevé</span>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
              <p>
                <strong>Échelle:</strong> {minValue.toFixed(1)} à {maxValue.toFixed(1)} (log2 fold change)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
