"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Dna, Settings, Database, Clock, CheckCircle } from "lucide-react"
import { AnalysisMetrics } from "@/components/analysis-metrics"
import { RunningAnalyses } from "@/components/running-analyses"
import { SystemStatus } from "@/components/system-status"

export default function DashboardPage() {
  const [activeAnalyses, setActiveAnalyses] = useState(3)
  const [completedToday, setCompletedToday] = useState(12)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Tableau de bord d'analyse</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Supervision et contrôle des analyses biologiques
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Activity className="w-3 h-3 mr-1" />
                {activeAnalyses} analyses actives
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analyses actives</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{activeAnalyses}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">+2 depuis hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées aujourd'hui</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{completedToday}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">+20% vs hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Données traitées</CardTitle>
              <Database className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">2.4 TB</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">+15% cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1h 23m</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">-8% vs semaine dernière</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="analyses">Analyses</TabsTrigger>
            <TabsTrigger value="metrics">Métriques</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RunningAnalyses />
              <SystemStatus />
            </div>
          </TabsContent>

          <TabsContent value="analyses">
            <RunningAnalyses detailed={true} />
          </TabsContent>

          <TabsContent value="metrics">
            <AnalysisMetrics />
          </TabsContent>

          <TabsContent value="system">
            <SystemStatus detailed={true} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
