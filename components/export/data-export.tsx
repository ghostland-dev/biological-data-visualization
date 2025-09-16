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
import { Database, Download, FileSpreadsheet, FileJson, Table } from "lucide-react"

const mockDataSets = [
  {
    id: "variants_analysis",
    name: "Analyse de variants - Cohorte COVID-19",
    type: "Variants",
    size: "2.3 MB",
    rows: 1247,
    columns: 15,
    format: "VCF",
  },
  {
    id: "expression_data",
    name: "Données d'expression - Biomarqueurs cancer",
    type: "Expression",
    size: "8.7 MB",
    rows: 20000,
    columns: 48,
    format: "Matrix",
  },
  {
    id: "alignment_results",
    name: "Résultats d'alignement - Séquences multiples",
    type: "Alignement",
    size: "1.2 MB",
    rows: 156,
    columns: 8,
    format: "FASTA",
  },
  {
    id: "annotation_data",
    name: "Annotations génomiques - Génome humain",
    type: "Annotation",
    size: "15.4 MB",
    rows: 45000,
    columns: 12,
    format: "GFF3",
  },
]

export function DataExport() {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("csv")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleDatasetToggle = (datasetId: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(datasetId) ? prev.filter((id) => id !== datasetId) : [...prev, datasetId],
    )
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
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
      case "excel":
        return <FileSpreadsheet className="w-4 h-4" />
      case "json":
        return <FileJson className="w-4 h-4" />
      default:
        return <Table className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Variants":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Expression":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Alignement":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Annotation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Configuration de l'export de données
          </CardTitle>
          <CardDescription>Sélectionnez les données et le format d'export</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format d'export</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Comma-separated)</SelectItem>
                  <SelectItem value="tsv">TSV (Tab-separated)</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encoding">Encodage</Label>
              <Select defaultValue="utf8">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utf8">UTF-8</SelectItem>
                  <SelectItem value="ascii">ASCII</SelectItem>
                  <SelectItem value="latin1">Latin-1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compression">Compression</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="gzip">GZIP</SelectItem>
                  <SelectItem value="zip">ZIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Options d'export</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="headers" checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
                <Label htmlFor="headers" className="text-sm">
                  Inclure les en-têtes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metadata" checked={includeMetadata} onCheckedChange={setIncludeMetadata} />
                <Label htmlFor="metadata" className="text-sm">
                  Inclure les métadonnées
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="timestamps" defaultChecked />
                <Label htmlFor="timestamps" className="text-sm">
                  Horodatage
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filename">Nom du fichier (optionnel)</Label>
            <Input id="filename" placeholder="export_data_2024" />
          </div>
        </CardContent>
      </Card>

      {/* Dataset Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Sélection des jeux de données</CardTitle>
          <CardDescription>Choisissez les analyses à exporter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDataSets.map((dataset) => (
              <div
                key={dataset.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDatasets.includes(dataset.id)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => handleDatasetToggle(dataset.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedDatasets.includes(dataset.id)}
                      onChange={() => handleDatasetToggle(dataset.id)}
                    />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{dataset.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Badge variant="secondary" className={getTypeColor(dataset.type)}>
                          {dataset.type}
                        </Badge>
                        <span>•</span>
                        <span>{dataset.rows.toLocaleString()} lignes</span>
                        <span>•</span>
                        <span>{dataset.columns} colonnes</span>
                        <span>•</span>
                        <span>{dataset.size}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dataset.format}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {selectedDatasets.length} jeu(x) de données sélectionné(s)
              </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                Taille totale:{" "}
                {selectedDatasets
                  .reduce((total, id) => {
                    const dataset = mockDataSets.find((d) => d.id === id)
                    return total + Number.parseFloat(dataset?.size.replace(" MB", "") || "0")
                  }, 0)
                  .toFixed(1)}{" "}
                MB
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Lancer l'export</CardTitle>
          <CardDescription>Générer et télécharger les fichiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={startExport}
              disabled={selectedDatasets.length === 0 || isExporting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {getFormatIcon(exportFormat)}
              <span className="ml-2">
                {isExporting ? "Export en cours..." : `Exporter en ${exportFormat.toUpperCase()}`}
              </span>
            </Button>

            <Button variant="outline" disabled={selectedDatasets.length === 0} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
          </div>

          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression de l'export</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Traitement des données et génération des fichiers...
              </p>
            </div>
          )}

          {exportProgress === 100 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Export terminé avec succès ! Les fichiers sont prêts au téléchargement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
