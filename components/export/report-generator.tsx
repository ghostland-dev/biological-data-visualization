"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, FileImage, File } from "lucide-react"

const reportSections = [
  { id: "summary", name: "Résumé exécutif", description: "Vue d'ensemble des résultats", required: true },
  { id: "methods", name: "Méthodes", description: "Protocoles et paramètres utilisés", required: false },
  { id: "results", name: "Résultats", description: "Données et analyses détaillées", required: true },
  { id: "visualizations", name: "Visualisations", description: "Graphiques et diagrammes", required: false },
  { id: "statistics", name: "Statistiques", description: "Métriques et tests statistiques", required: false },
  { id: "discussion", name: "Discussion", description: "Interprétation des résultats", required: false },
  { id: "references", name: "Références", description: "Bibliographie et sources", required: false },
  { id: "appendix", name: "Annexes", description: "Données supplémentaires", required: false },
]

const reportTemplates = [
  { id: "standard", name: "Rapport standard", description: "Format académique classique" },
  { id: "executive", name: "Résumé exécutif", description: "Format condensé pour dirigeants" },
  { id: "technical", name: "Rapport technique", description: "Détails techniques approfondis" },
  { id: "publication", name: "Article scientifique", description: "Format publication académique" },
]

export function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("standard")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [selectedSections, setSelectedSections] = useState(["summary", "results"])
  const [customTitle, setCustomTitle] = useState("")
  const [customIntro, setCustomIntro] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleSectionToggle = (sectionId: string) => {
    const section = reportSections.find((s) => s.id === sectionId)
    if (section?.required) return // Can't toggle required sections

    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const startGeneration = () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 400)
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <File className="w-4 h-4" />
      case "html":
        return <FileImage className="w-4 h-4" />
      case "docx":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Configuration du rapport
          </CardTitle>
          <CardDescription>Personnalisez votre rapport d'analyse</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Modèle de rapport</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {reportTemplates.find((t) => t.id === selectedTemplate)?.description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format de sortie</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="docx">Word (.docx)</SelectItem>
                  <SelectItem value="latex">LaTeX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre personnalisé (optionnel)</Label>
            <Input
              id="title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Analyse génomique de la cohorte COVID-19"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intro">Introduction personnalisée (optionnel)</Label>
            <Textarea
              id="intro"
              value={customIntro}
              onChange={(e) => setCustomIntro(e.target.value)}
              placeholder="Contexte et objectifs de l'étude..."
              className="h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Sections du rapport</CardTitle>
          <CardDescription>Sélectionnez les sections à inclure dans votre rapport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reportSections.map((section) => (
              <div
                key={section.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedSections.includes(section.id)
                    ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                } ${section.required ? "opacity-75" : ""}`}
                onClick={() => handleSectionToggle(section.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedSections.includes(section.id)}
                    disabled={section.required}
                    onChange={() => handleSectionToggle(section.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">{section.name}</h4>
                      {section.required && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        >
                          Requis
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{section.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {selectedSections.length} section(s) sélectionnée(s) • Longueur estimée: {selectedSections.length * 2 + 5}
              -{selectedSections.length * 4 + 10} pages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generation Options */}
      <Card>
        <CardHeader>
          <CardTitle>Options avancées</CardTitle>
          <CardDescription>Paramètres supplémentaires pour la génération</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style de citation</Label>
              <Select defaultValue="apa">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apa">APA</SelectItem>
                  <SelectItem value="mla">MLA</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Options d'inclusion</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="toc" defaultChecked />
                <Label htmlFor="toc" className="text-sm">
                  Table des matières
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="figures" defaultChecked />
                <Label htmlFor="figures" className="text-sm">
                  Liste des figures
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tables" defaultChecked />
                <Label htmlFor="tables" className="text-sm">
                  Liste des tableaux
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

      {/* Generate Report */}
      <Card>
        <CardHeader>
          <CardTitle>Générer le rapport</CardTitle>
          <CardDescription>Créer et télécharger votre rapport personnalisé</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={startGeneration}
              disabled={selectedSections.length === 0 || isGenerating}
              className="bg-green-600 hover:bg-green-700"
            >
              {getFormatIcon(reportFormat)}
              <span className="ml-2">
                {isGenerating ? "Génération en cours..." : `Générer en ${reportFormat.toUpperCase()}`}
              </span>
            </Button>

            <Button variant="outline" disabled={selectedSections.length === 0} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Génération du rapport</span>
                <span>{Math.round(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Compilation des données et mise en forme du document...
              </p>
            </div>
          )}

          {generationProgress === 100 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Rapport généré avec succès ! Le document est prêt au téléchargement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
