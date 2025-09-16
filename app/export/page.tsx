"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, ImageIcon, Database, Settings, Package } from "lucide-react"
import { DataExport } from "@/components/export/data-export"
import { ReportGenerator } from "@/components/export/report-generator"
import { VisualizationExport } from "@/components/export/visualization-export"
import { BatchExport } from "@/components/export/batch-export"

export default function ExportPage() {
  const [activeExport, setActiveExport] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Export des résultats</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Exportez vos analyses dans différents formats
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Package className="w-3 h-3 mr-1" />4 types d'export
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Export Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveExport("data")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Export de données</CardTitle>
              <CardDescription>Tableaux, matrices et données brutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  CSV, Excel, JSON
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveExport("reports")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Rapports</CardTitle>
              <CardDescription>Rapports complets avec analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  PDF, HTML, Word
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveExport("visualizations")}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ImageIcon className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Visualisations</CardTitle>
              <CardDescription>Graphiques et images haute résolution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  PNG, SVG, PDF
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveExport("batch")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Export groupé</CardTitle>
              <CardDescription>Plusieurs analyses en une fois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  ZIP, TAR
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Tools */}
        <Tabs value={activeExport || "overview"} onValueChange={setActiveExport} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="data">Données</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
            <TabsTrigger value="visualizations">Images</TabsTrigger>
            <TabsTrigger value="batch">Groupé</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Système d'export</CardTitle>
                <CardDescription>Sélectionnez un type d'export pour commencer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Download className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Choisissez un type d'export
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Cliquez sur l'une des cartes ci-dessus ou utilisez les onglets pour accéder aux différents outils
                    d'export.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <DataExport />
          </TabsContent>

          <TabsContent value="reports">
            <ReportGenerator />
          </TabsContent>

          <TabsContent value="visualizations">
            <VisualizationExport />
          </TabsContent>

          <TabsContent value="batch">
            <BatchExport />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
