"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Zap, Download, Filter, Maximize, RotateCcw } from "lucide-react"

const mockNetworkData = {
  nodes: [
    { id: "BRCA1", type: "gene", degree: 15, betweenness: 0.8 },
    { id: "TP53", type: "gene", degree: 22, betweenness: 0.9 },
    { id: "EGFR", type: "gene", degree: 18, betweenness: 0.7 },
    { id: "MYC", type: "gene", degree: 12, betweenness: 0.6 },
    { id: "KRAS", type: "gene", degree: 16, betweenness: 0.75 },
    { id: "PIK3CA", type: "gene", degree: 14, betweenness: 0.65 },
    { id: "AKT1", type: "gene", degree: 20, betweenness: 0.85 },
    { id: "PTEN", type: "gene", degree: 13, betweenness: 0.6 },
  ],
  edges: [
    { source: "BRCA1", target: "TP53", weight: 0.9, type: "protein_interaction" },
    { source: "TP53", target: "EGFR", weight: 0.7, type: "regulatory" },
    { source: "EGFR", target: "MYC", weight: 0.8, type: "signaling" },
    { source: "MYC", target: "KRAS", weight: 0.6, type: "regulatory" },
    { source: "KRAS", target: "PIK3CA", weight: 0.75, type: "signaling" },
    { source: "PIK3CA", target: "AKT1", weight: 0.85, type: "signaling" },
    { source: "AKT1", target: "PTEN", weight: 0.7, type: "regulatory" },
    { source: "PTEN", target: "TP53", weight: 0.65, type: "regulatory" },
  ],
  communities: [
    { id: 1, nodes: ["BRCA1", "TP53", "PTEN"], color: "blue" },
    { id: 2, nodes: ["EGFR", "MYC", "KRAS"], color: "red" },
    { id: 3, nodes: ["PIK3CA", "AKT1"], color: "green" },
  ],
}

export function NetworkAnalysis() {
  const [layout, setLayout] = useState("force-directed")
  const [nodeSize, setNodeSize] = useState("degree")
  const [edgeFilter, setEdgeFilter] = useState([0.5])
  const [showCommunities, setShowCommunities] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState("betweenness")

  const getNodeColor = (nodeId: string) => {
    if (!showCommunities) return "bg-slate-500"

    const community = mockNetworkData.communities.find((c) => c.nodes.includes(nodeId))
    switch (community?.color) {
      case "blue":
        return "bg-blue-500"
      case "red":
        return "bg-red-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  const getNodeSize = (node: any) => {
    switch (nodeSize) {
      case "degree":
        return Math.max(8, node.degree * 2)
      case "betweenness":
        return Math.max(8, node.betweenness * 40)
      default:
        return 16
    }
  }

  const filteredEdges = mockNetworkData.edges.filter((edge) => edge.weight >= edgeFilter[0])

  return (
    <div className="space-y-6">
      {/* Network Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Analyse de réseaux biologiques
          </CardTitle>
          <CardDescription>Explorez les interactions et connexions biologiques</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="layout">Disposition</Label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="force-directed">Force-directed</SelectItem>
                  <SelectItem value="circular">Circulaire</SelectItem>
                  <SelectItem value="hierarchical">Hiérarchique</SelectItem>
                  <SelectItem value="grid">Grille</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-size">Taille des nœuds</Label>
              <Select value={nodeSize} onValueChange={setNodeSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="degree">Degré</SelectItem>
                  <SelectItem value="betweenness">Centralité</SelectItem>
                  <SelectItem value="uniform">Uniforme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metric">Métrique</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="betweenness">Centralité intermédiaire</SelectItem>
                  <SelectItem value="degree">Degré</SelectItem>
                  <SelectItem value="closeness">Centralité de proximité</SelectItem>
                  <SelectItem value="eigenvector">Centralité de vecteur propre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Seuil des arêtes ({edgeFilter[0]})</Label>
              <Slider value={edgeFilter} onValueChange={setEdgeFilter} min={0} max={1} step={0.1} className="mt-1" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Maximize className="w-4 h-4 mr-2" />
              Plein écran
            </Button>
            <Button
              variant={showCommunities ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCommunities(!showCommunities)}
              className={showCommunities ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
            >
              <Filter className="w-4 h-4 mr-2" />
              Communautés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Network Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques du réseau</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{mockNetworkData.nodes.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Nœuds</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{filteredEdges.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Arêtes</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{mockNetworkData.communities.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Communautés</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {(filteredEdges.length / mockNetworkData.nodes.length).toFixed(1)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Densité</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Visualisation du réseau</CardTitle>
              <CardDescription>Réseau d'interactions biologiques</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Network Viewer */}
          <div className="relative h-96 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border overflow-hidden">
            {/* Mock network visualization */}
            <svg className="w-full h-full">
              {/* Edges */}
              {filteredEdges.map((edge, index) => {
                const sourceIndex = mockNetworkData.nodes.findIndex((n) => n.id === edge.source)
                const targetIndex = mockNetworkData.nodes.findIndex((n) => n.id === edge.target)
                const x1 = 100 + (sourceIndex % 3) * 150
                const y1 = 100 + Math.floor(sourceIndex / 3) * 100
                const x2 = 100 + (targetIndex % 3) * 150
                const y2 = 100 + Math.floor(targetIndex / 3) * 100

                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#94a3b8"
                    strokeWidth={edge.weight * 3}
                    opacity={0.6}
                  />
                )
              })}

              {/* Nodes */}
              {mockNetworkData.nodes.map((node, index) => {
                const x = 100 + (index % 3) * 150
                const y = 100 + Math.floor(index / 3) * 100
                const size = getNodeSize(node)

                return (
                  <g key={node.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={size}
                      className={`${getNodeColor(node.id)} opacity-80`}
                      fill="currentColor"
                    />
                    <text
                      x={x}
                      y={y + 25}
                      textAnchor="middle"
                      className="text-xs font-medium fill-slate-700 dark:fill-slate-300"
                    >
                      {node.id}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-500">
              Cliquez sur un nœud pour plus d'informations
            </div>
          </div>

          {/* Legend */}
          {showCommunities && (
            <div className="mt-4 flex items-center justify-center gap-6">
              {mockNetworkData.communities.map((community) => (
                <div key={community.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 bg-${community.color}-500 rounded-full`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Communauté {community.id} ({community.nodes.length} nœuds)
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Node Details */}
      <Card>
        <CardHeader>
          <CardTitle>Détails des nœuds</CardTitle>
          <CardDescription>Métriques de centralité et propriétés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockNetworkData.nodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${getNodeColor(node.id)} rounded-full`} />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{node.id}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Degré: {node.degree} • Centralité: {node.betweenness.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{node.type}</Badge>
                  <Badge
                    variant="secondary"
                    className={
                      node.betweenness > 0.8
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : node.betweenness > 0.6
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }
                  >
                    {node.betweenness > 0.8 ? "Hub" : node.betweenness > 0.6 ? "Important" : "Standard"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
