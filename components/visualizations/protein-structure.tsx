"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Activity, Download, RotateCcw, Maximize, Eye } from "lucide-react"

const mockProteinData = {
  name: "BRCA1 BRCT Domain",
  pdbId: "1JNX",
  organism: "Homo sapiens",
  resolution: "1.95 Å",
  method: "X-ray crystallography",
  chains: ["A", "B"],
  residues: 156,
  secondaryStructure: {
    helices: 8,
    sheets: 12,
    loops: 15,
  },
  domains: [
    { name: "BRCT1", start: 1, end: 78, color: "blue" },
    { name: "BRCT2", start: 79, end: 156, color: "red" },
  ],
}

export function ProteinStructure() {
  const [representation, setRepresentation] = useState("cartoon")
  const [colorScheme, setColorScheme] = useState("chain")
  const [selectedChain, setSelectedChain] = useState("all")
  const [transparency, setTransparency] = useState([0])
  const [showSurface, setShowSurface] = useState(false)

  return (
    <div className="space-y-6">
      {/* Structure Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Visualisation de structure protéique
          </CardTitle>
          <CardDescription>Explorez la structure 3D des protéines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="representation">Représentation</Label>
              <Select value={representation} onValueChange={setRepresentation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="ribbon">Ribbon</SelectItem>
                  <SelectItem value="surface">Surface</SelectItem>
                  <SelectItem value="sticks">Sticks</SelectItem>
                  <SelectItem value="spheres">Spheres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-scheme">Coloration</Label>
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chain">Par chaîne</SelectItem>
                  <SelectItem value="secondary">Structure secondaire</SelectItem>
                  <SelectItem value="hydrophobicity">Hydrophobicité</SelectItem>
                  <SelectItem value="bfactor">Facteur B</SelectItem>
                  <SelectItem value="domain">Par domaine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chain">Chaîne</Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  {mockProteinData.chains.map((chain) => (
                    <SelectItem key={chain} value={chain}>
                      Chaîne {chain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transparence ({transparency[0]}%)</Label>
              <Slider value={transparency} onValueChange={setTransparency} max={100} step={5} className="mt-1" />
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
              variant={showSurface ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSurface(!showSurface)}
              className={showSurface ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}
            >
              <Eye className="w-4 h-4 mr-2" />
              Surface
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Protein Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations sur la protéine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Nom</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">ID PDB</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.pdbId}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Organisme</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.organism}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Méthode</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.method}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Résolution</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.resolution}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Chaînes</Label>
                <div className="flex gap-1">
                  {mockProteinData.chains.map((chain) => (
                    <Badge key={chain} variant="outline">
                      {chain}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Résidus</Label>
                <p className="text-slate-900 dark:text-slate-100">{mockProteinData.residues}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewer */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Visualiseur 3D</CardTitle>
              <CardDescription>Structure tridimensionnelle interactive</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 3D Viewer Placeholder */}
          <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">Visualiseur 3D</h3>
              <p className="text-slate-500 dark:text-slate-500 max-w-md">
                Ici s'afficherait la structure 3D interactive de la protéine avec les contrôles de rotation, zoom et
                sélection.
              </p>
            </div>

            {/* Mock 3D elements */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-100" />
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200" />
            </div>

            <div className="absolute bottom-4 right-4 text-xs text-slate-500 dark:text-slate-500">
              Cliquez et glissez pour faire tourner
            </div>
          </div>

          {/* Structure Analysis */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{mockProteinData.secondaryStructure.helices}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Hélices α</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{mockProteinData.secondaryStructure.sheets}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Feuillets β</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{mockProteinData.secondaryStructure.loops}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Boucles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Information */}
      <Card>
        <CardHeader>
          <CardTitle>Domaines protéiques</CardTitle>
          <CardDescription>Régions fonctionnelles identifiées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProteinData.domains.map((domain) => (
              <div key={domain.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 bg-${domain.color}-500 rounded`} />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{domain.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Résidus {domain.start}-{domain.end}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{domain.end - domain.start + 1} aa</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
