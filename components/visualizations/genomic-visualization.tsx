"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dna, ZoomIn, ZoomOut, Move, Download, Search } from "lucide-react"

const mockGenomicData = {
  chromosome: "chr1",
  start: 1000000,
  end: 1100000,
  genes: [
    { name: "GENE1", start: 1010000, end: 1020000, strand: "+", type: "protein_coding" },
    { name: "GENE2", start: 1030000, end: 1045000, strand: "-", type: "lncRNA" },
    { name: "GENE3", start: 1060000, end: 1080000, strand: "+", type: "protein_coding" },
  ],
  variants: [
    { position: 1015000, type: "SNV", impact: "HIGH" },
    { position: 1035000, type: "INDEL", impact: "MODERATE" },
    { position: 1065000, type: "SNV", impact: "LOW" },
  ],
  tracks: ["Genes", "Variants", "Conservation", "Repeats"],
}

export function GenomicVisualization() {
  const [selectedChromosome, setSelectedChromosome] = useState("chr1")
  const [viewStart, setViewStart] = useState(1000000)
  const [viewEnd, setViewEnd] = useState(1100000)
  const [zoomLevel, setZoomLevel] = useState([50])
  const [activeTracks, setActiveTracks] = useState(["Genes", "Variants"])

  const chromosomes = Array.from({ length: 22 }, (_, i) => `chr${i + 1}`).concat(["chrX", "chrY"])

  const getVariantColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "bg-red-500"
      case "MODERATE":
        return "bg-yellow-500"
      case "LOW":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getGeneColor = (type: string) => {
    switch (type) {
      case "protein_coding":
        return "bg-blue-600"
      case "lncRNA":
        return "bg-purple-600"
      case "miRNA":
        return "bg-pink-600"
      default:
        return "bg-gray-600"
    }
  }

  const formatPosition = (pos: number) => {
    return pos.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Navigation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="w-5 h-5 text-blue-600" />
            Navigateur génomique
          </CardTitle>
          <CardDescription>Explorez les régions génomiques avec annotations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chromosome">Chromosome</Label>
              <Select value={selectedChromosome} onValueChange={setSelectedChromosome}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chromosomes.map((chr) => (
                    <SelectItem key={chr} value={chr}>
                      {chr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start">Position de début</Label>
              <Input
                id="start"
                type="number"
                value={viewStart}
                onChange={(e) => setViewStart(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end">Position de fin</Label>
              <Input id="end" type="number" value={viewEnd} onChange={(e) => setViewEnd(Number(e.target.value))} />
            </div>

            <div className="space-y-2">
              <Label>Recherche</Label>
              <div className="flex gap-2">
                <Input placeholder="Nom du gène..." />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Move className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 max-w-xs">
              <Label className="text-sm">Niveau de zoom</Label>
              <Slider value={zoomLevel} onValueChange={setZoomLevel} max={100} step={1} className="mt-1" />
            </div>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Track Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Pistes d'annotation</CardTitle>
          <CardDescription>Sélectionnez les pistes à afficher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockGenomicData.tracks.map((track) => (
              <Badge
                key={track}
                variant={activeTracks.includes(track) ? "default" : "outline"}
                className={`cursor-pointer ${
                  activeTracks.includes(track) ? "bg-blue-600 text-white" : "hover:bg-blue-50 dark:hover:bg-blue-950"
                }`}
                onClick={() => {
                  setActiveTracks((prev) => (prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]))
                }}
              >
                {track}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Genome Browser */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedChromosome}:{formatPosition(viewStart)}-{formatPosition(viewEnd)}
              </CardTitle>
              <CardDescription>Région de {formatPosition(viewEnd - viewStart)} bp</CardDescription>
            </div>
            <Badge variant="outline">{mockGenomicData.genes.length} gènes</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Coordinate ruler */}
            <div className="relative h-8 bg-slate-100 dark:bg-slate-800 rounded">
              <div className="absolute inset-0 flex items-center justify-between px-4 text-xs text-slate-600 dark:text-slate-400">
                <span>{formatPosition(viewStart)}</span>
                <span>{formatPosition((viewStart + viewEnd) / 2)}</span>
                <span>{formatPosition(viewEnd)}</span>
              </div>
            </div>

            {/* Genes track */}
            {activeTracks.includes("Genes") && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Gènes</h4>
                <div className="relative h-16 bg-slate-50 dark:bg-slate-900 rounded border">
                  {mockGenomicData.genes.map((gene) => {
                    const left = ((gene.start - viewStart) / (viewEnd - viewStart)) * 100
                    const width = ((gene.end - gene.start) / (viewEnd - viewStart)) * 100
                    return (
                      <div
                        key={gene.name}
                        className={`absolute top-2 h-8 ${getGeneColor(gene.type)} rounded flex items-center justify-center text-white text-xs font-medium`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        title={`${gene.name} (${gene.type})`}
                      >
                        {width > 10 && gene.name}
                        {gene.strand === "+" ? "→" : "←"}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Variants track */}
            {activeTracks.includes("Variants") && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Variants</h4>
                <div className="relative h-12 bg-slate-50 dark:bg-slate-900 rounded border">
                  {mockGenomicData.variants.map((variant, index) => {
                    const left = ((variant.position - viewStart) / (viewEnd - viewStart)) * 100
                    return (
                      <div
                        key={index}
                        className={`absolute top-2 w-2 h-8 ${getVariantColor(variant.impact)} rounded`}
                        style={{ left: `${left}%` }}
                        title={`${variant.type} at ${formatPosition(variant.position)} (${variant.impact})`}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Conservation track */}
            {activeTracks.includes("Conservation") && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Conservation</h4>
                <div className="relative h-12 bg-slate-50 dark:bg-slate-900 rounded border">
                  <div className="absolute inset-2 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 dark:from-red-800 dark:via-yellow-800 dark:to-green-800 rounded opacity-60" />
                </div>
              </div>
            )}

            {/* Repeats track */}
            {activeTracks.includes("Repeats") && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Éléments répétés</h4>
                <div className="relative h-12 bg-slate-50 dark:bg-slate-900 rounded border">
                  <div className="absolute top-2 left-[20%] w-[15%] h-8 bg-orange-400 rounded opacity-70" />
                  <div className="absolute top-2 left-[60%] w-[10%] h-8 bg-orange-400 rounded opacity-70" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>Légende:</strong> Bleu = Gènes codants, Violet = lncRNA, Rouge = Variants à impact élevé, Jaune =
              Impact modéré, Vert = Impact faible
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
