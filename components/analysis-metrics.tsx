"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyData = [
  { day: "Lun", genomic: 4, proteomic: 3, transcriptomic: 2 },
  { day: "Mar", genomic: 6, proteomic: 4, transcriptomic: 3 },
  { day: "Mer", genomic: 8, proteomic: 6, transcriptomic: 4 },
  { day: "Jeu", genomic: 5, proteomic: 7, transcriptomic: 5 },
  { day: "Ven", genomic: 9, proteomic: 5, transcriptomic: 6 },
  { day: "Sam", genomic: 3, proteomic: 2, transcriptomic: 1 },
  { day: "Dim", genomic: 2, proteomic: 1, transcriptomic: 1 },
]

const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, storage: 78 },
  { time: "04:00", cpu: 52, memory: 68, storage: 82 },
  { time: "08:00", cpu: 78, memory: 85, storage: 88 },
  { time: "12:00", cpu: 85, memory: 92, storage: 91 },
  { time: "16:00", cpu: 92, memory: 88, storage: 85 },
  { time: "20:00", cpu: 68, memory: 75, storage: 80 },
]

const analysisTypes = [
  { name: "Génomique", value: 45, color: "#3b82f6" },
  { name: "Protéomique", value: 30, color: "#10b981" },
  { name: "Transcriptomique", value: 25, color: "#8b5cf6" },
]

export function AnalysisMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Analyses par jour</CardTitle>
            <CardDescription>Répartition des analyses cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="genomic" stackId="a" fill="#3b82f6" name="Génomique" />
                <Bar dataKey="proteomic" stackId="a" fill="#10b981" name="Protéomique" />
                <Bar dataKey="transcriptomic" stackId="a" fill="#8b5cf6" name="Transcriptomique" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Analysis Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par type</CardTitle>
            <CardDescription>Distribution des analyses ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysisTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analysisTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {analysisTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {type.name} ({type.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance système</CardTitle>
          <CardDescription>Utilisation des ressources sur 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#ef4444" name="CPU %" strokeWidth={2} />
              <Line type="monotone" dataKey="memory" stroke="#f59e0b" name="Mémoire %" strokeWidth={2} />
              <Line type="monotone" dataKey="storage" stroke="#06b6d4" name="Stockage %" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Utilisation CPU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Moyenne</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Pic: 92%</span>
                <span>Min: 45%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mémoire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Utilisée</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>124 GB / 160 GB</span>
                <span>Libre: 36 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stockage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Utilisé</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>8.5 TB / 10 TB</span>
                <span>Libre: 1.5 TB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
