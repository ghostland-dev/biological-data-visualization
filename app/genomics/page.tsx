"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dna, Search, BarChart3, FileText, Settings, Zap } from "lucide-react"
import { VariantAnalysis } from "@/components/genomics/variant-analysis"
import { SequenceAlignment } from "@/components/genomics/sequence-alignment"
import { GenomeAnnotation } from "@/components/genomics/genome-annotation"
import { PhylogeneticAnalysis } from "@/components/genomics/phylogenetic-analysis"

export default function GenomicsPage() {
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null)

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
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Outils d'analyse génomique</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Suite complète d'outils pour l'analyse génomique
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Zap className="w-3 h-3 mr-1" />4 outils disponibles
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tools Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveAnalysis("variants")}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Analyse de variants</CardTitle>
              <CardDescription>Détection et annotation des variants génétiques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Prêt
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveAnalysis("alignment")}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Alignement de séquences</CardTitle>
              <CardDescription>Alignement multiple et comparaison de séquences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Prêt
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveAnalysis("annotation")}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Annotation du génome</CardTitle>
              <CardDescription>Annotation fonctionnelle et structurale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Prêt
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveAnalysis("phylogenetic")}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Dna className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Analyse phylogénétique</CardTitle>
              <CardDescription>Construction d'arbres phylogénétiques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Prêt
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tools */}
        <Tabs value={activeAnalysis || "overview"} onValueChange={setActiveAnalysis} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="alignment">Alignement</TabsTrigger>
            <TabsTrigger value="annotation">Annotation</TabsTrigger>
            <TabsTrigger value="phylogenetic">Phylogénie</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Outils d'analyse génomique</CardTitle>
                <CardDescription>Sélectionnez un outil pour commencer votre analyse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Dna className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Choisissez un outil d'analyse
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Cliquez sur l'une des cartes ci-dessus ou utilisez les onglets pour accéder aux différents outils
                    d'analyse génomique.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <VariantAnalysis />
          </TabsContent>

          <TabsContent value="alignment">
            <SequenceAlignment />
          </TabsContent>

          <TabsContent value="annotation">
            <GenomeAnnotation />
          </TabsContent>

          <TabsContent value="phylogenetic">
            <PhylogeneticAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
