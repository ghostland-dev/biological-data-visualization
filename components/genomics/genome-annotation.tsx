"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { FileText, Play, Download, Database } from "lucide-react"

const mockAnnotations = [
  {
    id: "1",
    chromosome: "chr1",
    start: 1000000,
    end: 1002000,
    type: "gene",
    name: "GENE1",
    strand: "+",
    biotype: "protein_coding",
    description: "Hypothetical protein involved in cell cycle regulation",
    goTerms: ["GO:0005634", "GO:0006355", "GO:0003677"],
  },
  {
    id: "2",
    chromosome: "chr1",
    start: 1000200,
    end: 1000800,
    type: "exon",
    name: "GENE1_exon1",
    strand: "+",
    biotype: "protein_coding",
    description: "First exon of GENE1",
    goTerms: [],
  },
  {
    id: "3",
    chromosome: "chr1",
    start: 1500000,
    end: 1501500,
    type: "gene",
    name: "GENE2",
    strand: "-",
    biotype: "lncRNA",
    description: "Long non-coding RNA with regulatory function",
    goTerms: ["GO:0005634", "GO:0016070"],
  },
]

export function GenomeAnnotation() {
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedGenome, setSelectedGenome] = useState("")
  const [annotationType, setAnnotationType] = useState("comprehensive")
  const [showResults, setShowResults] = useState(false)

  const startAnnotation = () => {
    setIsAnnotating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnnotating(false)
          setShowResults(true)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 400)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "gene":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "exon":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intron":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "UTR":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getBiotypeColor = (biotype: string) => {
    switch (biotype) {
      case "protein_coding":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      case "lncRNA":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "miRNA":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Annotation Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Configuration de l'annotation
          </CardTitle>
          <CardDescription>Paramétrez votre annotation fonctionnelle du génome</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genome-file">Fichier génome</Label>
              <Select value={selectedGenome} onValueChange={setSelectedGenome}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fichier FASTA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="human_genome.fa">human_genome.fa (3.2 GB)</SelectItem>
                  <SelectItem value="mouse_genome.fa">mouse_genome.fa (2.7 GB)</SelectItem>
                  <SelectItem value="custom_assembly.fa">custom_assembly.fa (1.8 GB)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annotation-type">Type d'annotation</Label>
              <Select value={annotationType} onValueChange={setAnnotationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Annotation complète</SelectItem>
                  <SelectItem value="genes_only">Gènes uniquement</SelectItem>
                  <SelectItem value="functional">Annotation fonctionnelle</SelectItem>
                  <SelectItem value="structural">Annotation structurale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="database">Base de données</Label>
              <Select defaultValue="ensembl">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ensembl">Ensembl</SelectItem>
                  <SelectItem value="refseq">RefSeq</SelectItem>
                  <SelectItem value="gencode">GENCODE</SelectItem>
                  <SelectItem value="custom">Base personnalisée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Espèce</Label>
              <Select defaultValue="homo_sapiens">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homo_sapiens">Homo sapiens</SelectItem>
                  <SelectItem value="mus_musculus">Mus musculus</SelectItem>
                  <SelectItem value="drosophila">Drosophila melanogaster</SelectItem>
                  <SelectItem value="arabidopsis">Arabidopsis thaliana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={startAnnotation}
              disabled={!selectedGenome || isAnnotating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAnnotating ? "Annotation en cours..." : "Lancer l'annotation"}
            </Button>
          </div>

          {isAnnotating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression de l'annotation</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <>
          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé de l'annotation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">2,847</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Gènes annotés</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">12,456</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Exons</p>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">1,234</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">ncRNA</p>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">89.2%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Couverture</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annotations List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Annotations détaillées</CardTitle>
                  <CardDescription>{mockAnnotations.length} éléments annotés</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter GFF3
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnnotations.map((annotation) => (
                  <div key={annotation.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">{annotation.name}</h4>
                          <Badge variant="secondary" className={getTypeColor(annotation.type)}>
                            {annotation.type}
                          </Badge>
                          <Badge variant="secondary" className={getBiotypeColor(annotation.biotype)}>
                            {annotation.biotype}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {annotation.strand === "+" ? "Sens +" : "Sens -"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{annotation.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {annotation.chromosome}:{annotation.start.toLocaleString()}-{annotation.end.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-slate-900 dark:text-slate-100">
                          {(annotation.end - annotation.start).toLocaleString()} bp
                        </p>
                      </div>
                    </div>

                    {annotation.goTerms.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-slate-500" />
                        <div className="flex flex-wrap gap-1">
                          {annotation.goTerms.map((term) => (
                            <Badge key={term} variant="outline" className="text-xs">
                              {term}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
