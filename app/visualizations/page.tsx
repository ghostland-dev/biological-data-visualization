"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Dna, Activity, Zap, Settings, Eye } from "lucide-react"
import { GenomicVisualization } from "@/components/visualizations/genomic-visualization"
import { ProteinStructure } from "@/components/visualizations/protein-structure"
import { ExpressionHeatmap } from "@/components/visualizations/expression-heatmap"
import { NetworkAnalysis } from "@/components/visualizations/network-analysis"

export default function VisualizationsPage() {
  const [activeViz, setActiveViz] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Visualisations biologiques</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Outils de visualisation avancés pour données biologiques
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                <Eye className="w-3 h-3 mr-1" />4 visualisations
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Visualization Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveViz("genomic")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Dna className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Visualisation génomique</CardTitle>
              <CardDescription>Navigateur de génome et annotations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Interactif
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveViz("protein")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Structure protéique</CardTitle>
              <CardDescription>Visualisation 3D des protéines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  3D
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveViz("heatmap")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Heatmap d'expression</CardTitle>
              <CardDescription>Cartes de chaleur pour l'expression génique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Matriciel
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveViz("network")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Réseaux biologiques</CardTitle>
              <CardDescription>Analyse de réseaux d'interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Graphique
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualization Tools */}
        <Tabs value={activeViz || "overview"} onValueChange={setActiveViz} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="genomic">Génomique</TabsTrigger>
            <TabsTrigger value="protein">Protéines</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmaps</TabsTrigger>
            <TabsTrigger value="network">Réseaux</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Outils de visualisation</CardTitle>
                <CardDescription>Sélectionnez un type de visualisation pour commencer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Choisissez une visualisation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Cliquez sur l'une des cartes ci-dessus ou utilisez les onglets pour accéder aux différents outils de
                    visualisation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="genomic">
            <GenomicVisualization />
          </TabsContent>

          <TabsContent value="protein">
            <ProteinStructure />
          </TabsContent>

          <TabsContent value="heatmap">
            <ExpressionHeatmap />
          </TabsContent>

          <TabsContent value="network">
            <NetworkAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
