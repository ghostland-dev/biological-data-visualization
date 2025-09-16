"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, BarChart3, Dna, Activity, Zap, Bitcoin as Button } from "lucide-react"
import { DataUploadZone } from "@/components/data-upload-zone"
import { RecentAnalyses } from "@/components/recent-analyses"

export default function HomePage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

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
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">BioAnalyzer Pro</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Analyse de données biologiques avancée</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Système actif
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 text-balance">
            Analysez vos données biologiques avec précision
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-pretty">
            Plateforme intégrée pour l'analyse génomique, protéomique et transcriptomique avec des outils de
            visualisation avancés
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analyser
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Résultats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Zone */}
              <div className="lg:col-span-2">
                <DataUploadZone
                  onUploadProgress={setUploadProgress}
                  onUploadStart={() => setIsUploading(true)}
                  onUploadComplete={() => setIsUploading(false)}
                />
              </div>

              {/* Data Types Info */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Types de données supportés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Génomique</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">FASTA, FASTQ, VCF, BAM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Protéomique</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">MGF, mzML, RAW</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Transcriptomique</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">CSV, TSV, Excel</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isUploading && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Progression</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={uploadProgress} className="mb-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">{uploadProgress}% terminé</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analyze">
            <Card>
              <CardHeader>
                <CardTitle>Outils d'analyse</CardTitle>
                <CardDescription>Sélectionnez les analyses à effectuer sur vos données</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Les outils d'analyse seront disponibles après l'upload des données.
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a href="/dashboard">Accéder au tableau de bord</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <RecentAnalyses />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
