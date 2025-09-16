"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle } from "lucide-react"

interface SystemStatusProps {
  detailed?: boolean
}

const systemComponents = [
  {
    name: "Serveur principal",
    status: "healthy",
    uptime: "99.9%",
    load: 68,
    icon: Server,
  },
  {
    name: "Cluster de calcul",
    status: "healthy",
    uptime: "99.7%",
    load: 85,
    icon: Cpu,
  },
  {
    name: "Stockage distribué",
    status: "warning",
    uptime: "98.2%",
    load: 92,
    icon: HardDrive,
  },
  {
    name: "Réseau",
    status: "healthy",
    uptime: "99.8%",
    load: 45,
    icon: Wifi,
  },
]

const alerts = [
  {
    id: "1",
    type: "warning",
    message: "Espace disque faible sur le serveur de stockage",
    time: "Il y a 15 min",
  },
  {
    id: "2",
    type: "info",
    message: "Maintenance programmée ce weekend",
    time: "Il y a 2h",
  },
]

export function SystemStatus({ detailed = false }: SystemStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-green-600" />
            État du système
          </CardTitle>
          <CardDescription>
            {detailed ? "Surveillance détaillée des composants" : "Vue d'ensemble de l'infrastructure"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemComponents.map((component) => {
              const IconComponent = component.icon
              return (
                <div key={component.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{component.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Uptime: {component.uptime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {detailed && (
                      <div className="text-right min-w-[80px]">
                        <p className="text-sm font-medium">{component.load}%</p>
                        <Progress value={component.load} className="h-1 w-16" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {getStatusIcon(component.status)}
                      <Badge variant="secondary" className={getStatusColor(component.status)}>
                        {component.status === "healthy"
                          ? "Sain"
                          : component.status === "warning"
                            ? "Attention"
                            : "Erreur"}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {detailed && alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Alertes système
            </CardTitle>
            <CardDescription>Notifications et événements récents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {alert.type === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 dark:text-slate-100">{alert.message}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
