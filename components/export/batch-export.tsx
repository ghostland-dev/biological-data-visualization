"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Package, Download, FolderArchive, Calendar } from "lucide-react"

const mockAnalyses = [
  {
    id: "analysis_1",
    name: "Analyse génomique - Cohorte COVID-19",
    date: "2024-01-15",
    type: "Génomique",
    status: "completed",
    size: "15.2 MB",
    files: 8,
  },
  {
    id: "analysis_2",
    name: "Profil protéomique - Biomarqueurs cancer",
    date: "2024-01-14",
    type: "Protéomique",
    status: "completed",
    size: "8.7 MB",
    files: 12,
  },
  {
    id: "analysis_3",
    name: "Expression transcriptomique - Thérapie génique",
    date: "2024-01-13",
    type: "Transcriptomique",
    status: "completed",
    size: "22.1 MB",
    files: 15,
  },
  {
    id: "analysis_4",
    name: "Alignement de séquences - Phylogénie",
    date: "2024-01-12",
    type: "Alignement",
    status: "completed",
    size: "3.4 MB",
    files: 5,
  },
  {
    id: "analysis_5",
    name: "Annotation génomique - Génome de référence",
    date: "2024-01-11",
    type: "Annotation",
    status: "completed",
    size: "45.8 MB",
    files: 20,
  },
]

const exportTypes = [
  { id: "data", name: "Données", description: "Fichiers CSV, Excel, JSON" },
  { id: "reports", name: "Rapports", description: "Documents PDF, HTML" },
  { id: "visualizations", name: "Visualisations", description: "Images PNG, SVG" },
  { id: "raw", name: "Données brutes", description: "Fichiers originaux" },
]

export function BatchExport() {
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["data", "reports"])
  const [archiveFormat, setArchiveFormat] = useState("zip")
  const [dateRange, setDateRange] = useState("all")
  const [customName, setCustomName] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleAnalysisToggle = (analysisId: string) => {
    setSelectedAnalyses((prev) =>
      prev.includes(analysisId) ? prev.filter((id) => id !== analysisId) : [...prev, analysisId],
    )
  }

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  const selectByDateRange = (range: string) => {
    setDateRange(range)
    const today = new Date()
    let cutoffDate: Date

    switch (range) {
      case "today":
        cutoffDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        break
      case "week":
        cutoffDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "month":
        cutoffDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        break
      default:
        setSelectedAnalyses(mockAnalyses.map((a) => a.id))
        return
    }

    const filtered = mockAnalyses.filter((analysis) => new Date(analysis.date) >= cutoffDate).map((a) => a.id)
    setSelectedAnalyses(filtered)
  }

  const startBatchExport = () => {
    setIsExporting(true)
    setExportProgress(0)

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 600)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Génomique":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Protéomique":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Transcriptomique":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Alignement":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Annotation":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const totalSize = selectedAnalyses.reduce((total, id) => {
    const analysis = mockAnalyses.find((a) => a.id === id)
    return total + Number.parseFloat(analysis?.size.replace(" MB", "") || "0")
  }, 0)

  const totalFiles = selectedAnalyses.reduce((total, id) => {
    const analysis = mockAnalyses.find((a) => a.id === id)
    return total + (analysis?.files || 0)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Batch Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-600" />
            Configuration de l'export groupé
          </CardTitle>
          <CardDescription>Exportez plusieurs analyses en une seule archive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="archive-format">Format d'archive</Label>
              <Select value={archiveFormat} onValueChange={setArchiveFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP</SelectItem>
                  <SelectItem value="tar">TAR</SelectItem>
                  <SelectItem value="7z">7-Zip</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compression">Compression</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="fast">Rapide</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="maximum">Maximum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Chiffrement</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun</SelectItem>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="aes256">AES-256</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-name">Nom de l'archive (optionnel)</Label>
            <Input
              id="custom-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="export_batch_2024"
            />
          </div>

          <div className="space-y-3">
            <Label>Sélection rapide par date</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={dateRange === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => selectByDateRange("today")}
                className={dateRange === "today" ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Aujourd'hui
              </Button>
              <Button
                variant={dateRange === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => selectByDateRange("week")}
                className={dateRange === "week" ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Cette semaine
              </Button>
              <Button
                variant={dateRange === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => selectByDateRange("month")}
                className={dateRange === "month" ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Ce mois
              </Button>
              <Button
                variant={dateRange === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => selectByDateRange("all")}
                className={dateRange === "all" ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
              >
                Tout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Types de contenu à inclure</CardTitle>
          <CardDescription>Sélectionnez les types de fichiers à exporter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportTypes.map((type) => (
              <div
                key={type.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTypes.includes(type.id)
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => handleTypeToggle(type.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={selectedTypes.includes(type.id)} onChange={() => handleTypeToggle(type.id)} />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{type.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Sélection des analyses</CardTitle>
          <CardDescription>Choisissez les analyses à inclure dans l'export groupé</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnalyses.includes(analysis.id)
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => handleAnalysisToggle(analysis.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedAnalyses.includes(analysis.id)}
                      onChange={() => handleAnalysisToggle(analysis.id)}
                    />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{analysis.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Badge variant="secondary" className={getTypeColor(analysis.type)}>
                          {analysis.type}
                        </Badge>
                        <span>•</span>
                        <span>{analysis.date}</span>
                        <span>•</span>
                        <span>{analysis.files} fichiers</span>
                        <span>•</span>
                        <span>{analysis.size}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {analysis.status === "completed" ? "Terminé" : "En cours"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Analyses sélectionnées:</span>
                <span className="font-medium text-slate-900 dark:text-slate-100 ml-2">{selectedAnalyses.length}</span>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Fichiers totaux:</span>
                <span className="font-medium text-slate-900 dark:text-slate-100 ml-2">{totalFiles}</span>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Taille totale:</span>
                <span className="font-medium text-slate-900 dark:text-slate-100 ml-2">{totalSize.toFixed(1)} MB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Lancer l'export groupé</CardTitle>
          <CardDescription>Créer et télécharger l'archive complète</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={startBatchExport}
              disabled={selectedAnalyses.length === 0 || selectedTypes.length === 0 || isExporting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <FolderArchive className="w-4 h-4 mr-2" />
              {isExporting ? "Export en cours..." : `Créer l'archive ${archiveFormat.toUpperCase()}`}
            </Button>

            <Button
              variant="outline"
              disabled={selectedAnalyses.length === 0 || selectedTypes.length === 0}
              className="bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Estimer la taille
            </Button>
          </div>

          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Création de l'archive</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Compression et archivage de {selectedAnalyses.length} analyse(s)...
              </p>
            </div>
          )}

          {exportProgress === 100 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Archive créée avec succès ! Fichier de {totalSize.toFixed(1)} MB prêt au téléchargement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
