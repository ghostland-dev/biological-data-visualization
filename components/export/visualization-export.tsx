"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Image, Download, Palette, Maximize } from "lucide-react"

const mockVisualizations = [
  {
    id: "genomic_browser",
    name: "Navigateur génomique - chr1:1000000-1100000",
    type: "Génomique",
    format: "Interactive",
    size: "1920x1080",
  },
  {
    id: "expression_heatmap",
    name: "Heatmap d'expression - Biomarqueurs cancer",
    type: "Expression",
    format: "Matrix",
    size: "1200x800",
  },
  {
    id: "protein_structure",
    name: "Structure 3D - BRCA1 BRCT Domain",
    type: "Structure",
    format: "3D",
    size: "800x600",
  },
  {
    id: "network_analysis",
    name: "Réseau d'interactions - Voies de signalisation",
    type: "Réseau",
    format: "Graph",
    size: "1000x1000",
  },
  {
    id: "phylogenetic_tree",
    name: "Arbre phylogénétique - 4 espèces",
    type: "Phylogénie",
    format: "Tree",
    size: "800x600",
  },
]

export function VisualizationExport() {
  const [selectedVisualizations, setSelectedVisualizations] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("png")
  const [resolution, setResolution] = useState("high")
  const [dpi, setDpi] = useState([300])
  const [includeBackground, setIncludeBackground] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleVisualizationToggle = (vizId: string) => {
    setSelectedVisualizations((prev) => (prev.includes(vizId) ? prev.filter((id) => id !== vizId) : [...prev, vizId]))
  }

  const startExport = () => {
    setIsExporting(true)
    setExportProgress(0)

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Génomique":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Expression":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Structure":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Réseau":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Phylogénie":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getResolutionDimensions = (baseSize: string, resolution: string) => {
    const [width, height] = baseSize.split("x").map(Number)
    const multiplier = resolution === "low" ? 0.5 : resolution === "medium" ? 1 : resolution === "high" ? 1.5 : 2
    return `${Math.round(width * multiplier)}x${Math.round(height * multiplier)}`
  }

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5 text-orange-600" />
            Configuration de l'export d'images
          </CardTitle>
          <CardDescription>Paramètres pour l'export des visualisations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format d'image</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (Recommandé)</SelectItem>
                  <SelectItem value="jpg">JPEG</SelectItem>
                  <SelectItem value="svg">SVG (Vectoriel)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="tiff">TIFF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution">Résolution</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Basse (Web)</SelectItem>
                  <SelectItem value="medium">Moyenne (Écran)</SelectItem>
                  <SelectItem value="high">Haute (Impression)</SelectItem>
                  <SelectItem value="ultra">Ultra (Publication)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorspace">Espace colorimétrique</Label>
              <Select defaultValue="srgb">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="srgb">sRGB</SelectItem>
                  <SelectItem value="adobe">Adobe RGB</SelectItem>
                  <SelectItem value="cmyk">CMYK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>DPI/Qualité ({dpi[0]})</Label>
            <Slider value={dpi} onValueChange={setDpi} min={72} max={600} step={1} className="mt-1" />
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>72 (Web)</span>
              <span>150 (Écran)</span>
              <span>300 (Impression)</span>
              <span>600 (Haute qualité)</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Options d'export</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="background" checked={includeBackground} onCheckedChange={setIncludeBackground} />
                <Label htmlFor="background" className="text-sm">
                  Inclure l'arrière-plan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="transparent" />
                <Label htmlFor="transparent" className="text-sm">
                  Arrière-plan transparent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="watermark" />
                <Label htmlFor="watermark" className="text-sm">
                  Filigrane
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualization Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Sélection des visualisations</CardTitle>
          <CardDescription>Choisissez les graphiques à exporter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockVisualizations.map((viz) => (
              <div
                key={viz.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedVisualizations.includes(viz.id)
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => handleVisualizationToggle(viz.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedVisualizations.includes(viz.id)}
                      onChange={() => handleVisualizationToggle(viz.id)}
                    />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{viz.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Badge variant="secondary" className={getTypeColor(viz.type)}>
                          {viz.type}
                        </Badge>
                        <span>•</span>
                        <span>Taille: {getResolutionDimensions(viz.size, resolution)}</span>
                        <span>•</span>
                        <span>{viz.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Maximize className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Palette className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {selectedVisualizations.length} visualisation(s) sélectionnée(s)
              </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                Taille estimée: {(selectedVisualizations.length * 2.5).toFixed(1)} MB
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Exporter les images</CardTitle>
          <CardDescription>Générer et télécharger les visualisations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={startExport}
              disabled={selectedVisualizations.length === 0 || isExporting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Image className="w-4 h-4 mr-2" />
              {isExporting ? "Export en cours..." : `Exporter en ${exportFormat.toUpperCase()}`}
            </Button>

            <Button variant="outline" disabled={selectedVisualizations.length === 0} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
          </div>

          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rendu des visualisations</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
              <p className="text-xs text-slate-600 dark:text-slate-400">Génération des images haute résolution...</p>
            </div>
          )}

          {exportProgress === 100 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Images exportées avec succès ! {selectedVisualizations.length} fichier(s) prêt(s) au téléchargement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
