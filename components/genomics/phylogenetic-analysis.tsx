"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dna, Play, Download, GitBranch } from "lucide-react"

const mockTree = {
  newick: "((Species_A:0.1,Species_B:0.2):0.05,(Species_C:0.3,Species_D:0.15):0.1);",
  species: ["Species_A", "Species_B", "Species_C", "Species_D"],
  stats: {
    totalLength: 0.9,
    avgBranchLength: 0.15,
    maxDistance: 0.45,
    bootstrap: 85,
  },
}

export function PhylogeneticAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [method, setMethod] = useState("nj")
  const [sequences, setSequences] = useState("")
  const [showResults, setShowResults] = useState(false)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setShowResults(true)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 600)
  }

  return (
    <div className="space-y-6">
      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="w-5 h-5 text-orange-600" />
            Configuration de l'analyse phylogénétique
          </CardTitle>
          <CardDescription>Paramétrez votre construction d'arbre phylogénétique</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">Méthode de construction</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nj">Neighbor-Joining</SelectItem>
                  <SelectItem value="ml">Maximum Likelihood</SelectItem>
                  <SelectItem value="mp">Maximum Parsimony</SelectItem>
                  <SelectItem value="upgma">UPGMA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modèle évolutif</Label>
              <Select defaultValue="jc69">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jc69">Jukes-Cantor</SelectItem>
                  <SelectItem value="k2p">Kimura 2-parameter</SelectItem>
                  <SelectItem value="gtr">GTR</SelectItem>
                  <SelectItem value="hky">HKY85</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bootstrap">Bootstrap (réplications)</Label>
              <Select defaultValue="1000">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                  <SelectItem value="2000">2000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outgroup">Groupe externe (optionnel)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un outgroup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seq1">Sequence_1</SelectItem>
                  <SelectItem value="seq2">Sequence_2</SelectItem>
                  <SelectItem value="seq3">Sequence_3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sequences">Séquences alignées (format FASTA)</Label>
            <Textarea
              id="sequences"
              value={sequences}
              onChange={(e) => setSequences(e.target.value)}
              placeholder=">Species_A&#10;ATCGATCGATCGATCGATCG&#10;>Species_B&#10;ATCGATCGAATCGATCGATC&#10;>Species_C&#10;ATCGATCGATCGATCGATCG&#10;>Species_D&#10;ATCGATCGATCGATCGATCG"
              className="h-32 font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={startAnalysis}
              disabled={!sequences.trim() || isAnalyzing}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAnalyzing ? "Construction en cours..." : "Construire l'arbre"}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression de l'analyse</span>
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
          {/* Tree Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de l'arbre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{mockTree.stats.totalLength}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Longueur totale</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{mockTree.stats.avgBranchLength}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Branche moyenne</p>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{mockTree.stats.maxDistance}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Distance max</p>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{mockTree.stats.bootstrap}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Support bootstrap</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tree Visualization */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-orange-600" />
                    Arbre phylogénétique
                  </CardTitle>
                  <CardDescription>Représentation de l'arbre construit</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Newick
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simple ASCII tree representation */}
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="space-y-1">
                  <div>┌─ Species_A (0.1)</div>
                  <div>├─┤</div>
                  <div>│ └─ Species_B (0.2)</div>
                  <div>├─┤</div>
                  <div>│ ┌─ Species_C (0.3)</div>
                  <div>└─┤</div>
                  <div> └─ Species_D (0.15)</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Format Newick:</p>
                <code className="text-xs text-blue-800 dark:text-blue-200 font-mono break-all">{mockTree.newick}</code>
              </div>

              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  <strong>Interprétation:</strong> Les longueurs de branches représentent la distance évolutive. Plus la
                  branche est longue, plus les espèces sont éloignées génétiquement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Species Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations sur les espèces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTree.species.map((species, index) => (
                  <div key={species} className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">{species}</h4>
                      <Badge variant="outline" className="text-xs">
                        Séquence {index + 1}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Distance à la racine: {(Math.random() * 0.4 + 0.1).toFixed(3)}
                    </p>
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
