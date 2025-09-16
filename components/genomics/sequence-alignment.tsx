"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Play, Download, Copy } from "lucide-react"

const mockAlignment = {
  sequences: [
    { id: "Seq1", sequence: "ATCGATCGATCGATCGATCG", aligned: "ATCGATCGATCG--ATCGATCG" },
    { id: "Seq2", sequence: "ATCGATCGAATCGATCGATC", aligned: "ATCGATCGAATCGATCGATC-" },
    { id: "Seq3", sequence: "ATCGATCGATCGATCGATCG", aligned: "ATCGATCGATCGATCGATCG-" },
  ],
  stats: {
    identity: 85.7,
    similarity: 92.3,
    gaps: 7.1,
    length: 21,
  },
}

export function SequenceAlignment() {
  const [isAligning, setIsAligning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [algorithm, setAlgorithm] = useState("clustalw")
  const [sequences, setSequences] = useState("")
  const [showResults, setShowResults] = useState(false)

  const startAlignment = () => {
    setIsAligning(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAligning(false)
          setShowResults(true)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 300)
  }

  const copyAlignment = () => {
    const alignmentText = mockAlignment.sequences.map((seq) => `>${seq.id}\n${seq.aligned}`).join("\n\n")
    navigator.clipboard.writeText(alignmentText)
  }

  return (
    <div className="space-y-6">
      {/* Alignment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Configuration de l'alignement
          </CardTitle>
          <CardDescription>Paramétrez votre alignement de séquences multiples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="algorithm">Algorithme d'alignement</Label>
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clustalw">ClustalW</SelectItem>
                  <SelectItem value="muscle">MUSCLE</SelectItem>
                  <SelectItem value="mafft">MAFFT</SelectItem>
                  <SelectItem value="tcoffee">T-Coffee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matrix">Matrice de substitution</Label>
              <Select defaultValue="blosum62">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blosum62">BLOSUM62</SelectItem>
                  <SelectItem value="pam250">PAM250</SelectItem>
                  <SelectItem value="identity">Identity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sequences">Séquences (format FASTA)</Label>
            <Textarea
              id="sequences"
              value={sequences}
              onChange={(e) => setSequences(e.target.value)}
              placeholder=">Sequence1&#10;ATCGATCGATCGATCGATCG&#10;>Sequence2&#10;ATCGATCGAATCGATCGATC&#10;>Sequence3&#10;ATCGATCGATCGATCGATCG"
              className="h-32 font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={startAlignment}
              disabled={!sequences.trim() || isAligning}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAligning ? "Alignement en cours..." : "Lancer l'alignement"}
            </Button>
          </div>

          {isAligning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression de l'alignement</span>
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
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de l'alignement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{mockAlignment.stats.identity}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Identité</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{mockAlignment.stats.similarity}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Similarité</p>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{mockAlignment.stats.gaps}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Gaps</p>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{mockAlignment.stats.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Longueur</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alignment Visualization */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Alignement multiple</CardTitle>
                  <CardDescription>Visualisation de l'alignement des séquences</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={copyAlignment} className="bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {mockAlignment.sequences.map((seq, index) => (
                  <div key={seq.id} className="mb-2">
                    <div className="flex items-center gap-4">
                      <span className="w-12 text-slate-600 dark:text-slate-400 font-semibold">{seq.id}</span>
                      <span className="text-slate-900 dark:text-slate-100 tracking-wider">
                        {seq.aligned.split("").map((char, i) => (
                          <span
                            key={i}
                            className={char === "-" ? "text-red-500" : "text-slate-900 dark:text-slate-100"}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Consensus line */}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span className="w-12 text-slate-600 dark:text-slate-400 font-semibold">Cons</span>
                    <span className="text-slate-600 dark:text-slate-400 tracking-wider">
                      {"*".repeat(15) + "  " + "*".repeat(6)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  <strong>Légende:</strong> * = position conservée, - = gap
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
