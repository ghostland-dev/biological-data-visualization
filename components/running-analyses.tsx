"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, Clock, User, FileText } from "lucide-react"

interface RunningAnalysesProps {
  detailed?: boolean
}

const runningAnalyses = [
  {
    id: "1",
    name: "Analyse génomique - Cohorte COVID-19",
    type: "genomic",
    status: "running",
    progress: 67,
    startTime: "14:23",
    estimatedEnd: "16:45",
    user: "Dr. Martin",
    priority: "high",
    samples: 1247,
  },
  {
    id: "2",
    name: "Profil protéomique - Biomarqueurs cancer",
    type: "proteomic",
    status: "running",
    progress: 34,
    startTime: "13:15",
    estimatedEnd: "17:30",
    user: "Dr. Dubois",
    priority: "medium",
    samples: 856,
  },
  {
    id: "3",
    name: "Expression transcriptomique - Thérapie génique",
    type: "transcriptomic",
    status: "queued",
    progress: 0,
    startTime: "15:00",
    estimatedEnd: "18:15",
    user: "Dr. Leroy",
    priority: "low",
    samples: 2341,
  },
]

export function RunningAnalyses({ detailed = false }: RunningAnalysesProps) {
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
      case "running":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "queued":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "paused":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-600" />
          Analyses en cours
        </CardTitle>
        <CardDescription>
          {detailed ? "Gestion détaillée des analyses" : "Vue d'ensemble des analyses actives"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {runningAnalyses.map((analysis) => (
            <div key={analysis.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{analysis.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    {analysis.user}
                    <span>•</span>
                    <FileText className="w-4 h-4" />
                    {analysis.samples.toLocaleString()} échantillons
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getTypeColor(analysis.type)}>
                    {analysis.type}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(analysis.status)}>
                    {analysis.status === "running" ? "En cours" : analysis.status === "queued" ? "En attente" : "Pausé"}
                  </Badge>
                  {detailed && (
                    <Badge variant="secondary" className={getPriorityColor(analysis.priority)}>
                      {analysis.priority === "high" ? "Haute" : analysis.priority === "medium" ? "Moyenne" : "Basse"}
                    </Badge>
                  )}
                </div>
              </div>

              {analysis.status === "running" && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression</span>
                    <span className="font-medium">{analysis.progress}%</span>
                  </div>
                  <Progress value={analysis.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Début: {analysis.startTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Fin estimée: {analysis.estimatedEnd}
                  </div>
                </div>

                {detailed && (
                  <div className="flex items-center gap-2">
                    {analysis.status === "running" ? (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Square className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
