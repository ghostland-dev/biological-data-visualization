"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, Eye, Clock } from "lucide-react"

const mockAnalyses = [
  {
    id: "1",
    name: "Analyse génomique - Échantillon A",
    type: "genomic",
    status: "completed",
    date: "2024-01-15",
    duration: "2h 34min",
    results: "1,247 variants identifiés",
  },
  {
    id: "2",
    name: "Profil protéomique - Plasma",
    type: "proteomic",
    status: "running",
    date: "2024-01-15",
    duration: "45min",
    results: "En cours...",
  },
  {
    id: "3",
    name: "Expression transcriptomique",
    type: "transcriptomic",
    status: "completed",
    date: "2024-01-14",
    duration: "1h 12min",
    results: "3,456 gènes analysés",
  },
]

export function RecentAnalyses() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "genomic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "proteomic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "transcriptomic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "running":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analyses récentes</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Consultez vos dernières analyses et téléchargez les résultats
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <BarChart3 className="w-4 h-4" />
          Nouvelle analyse
        </Button>
      </div>

      <div className="grid gap-4">
        {mockAnalyses.map((analysis) => (
          <Card key={analysis.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{analysis.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    {analysis.date} • {analysis.duration}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getTypeColor(analysis.type)}>
                    {analysis.type}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(analysis.status)}>
                    {analysis.status === "completed"
                      ? "Terminé"
                      : analysis.status === "running"
                        ? "En cours"
                        : "Erreur"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">{analysis.results}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Eye className="w-4 h-4" />
                    Voir
                  </Button>
                  {analysis.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
