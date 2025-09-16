"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: "genomic" | "proteomic" | "transcriptomic"
  status: "uploading" | "completed" | "error"
  progress: number
}

interface DataUploadZoneProps {
  onUploadProgress: (progress: number) => void
  onUploadStart: () => void
  onUploadComplete: () => void
}

export function DataUploadZone({ onUploadProgress, onUploadStart, onUploadComplete }: DataUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const detectFileType = (fileName: string): "genomic" | "proteomic" | "transcriptomic" => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (["fasta", "fastq", "vcf", "bam", "sam"].includes(extension || "")) {
      return "genomic"
    } else if (["mgf", "mzml", "raw"].includes(extension || "")) {
      return "proteomic"
    } else {
      return "transcriptomic"
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const simulateUpload = useCallback(
    (file: UploadedFile) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: "completed", progress: 100 } : f)),
          )
          onUploadComplete()
        } else {
          setUploadedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
          onUploadProgress(progress)
        }
      }, 200)
    },
    [onUploadProgress, onUploadComplete],
  )

  const handleFileSelect = useCallback(
    (files: FileList) => {
      onUploadStart()

      Array.from(files).forEach((file) => {
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: detectFileType(file.name),
          status: "uploading",
          progress: 0,
        }

        setUploadedFiles((prev) => [...prev, uploadedFile])
        simulateUpload(uploadedFile)
      })
    },
    [onUploadStart, simulateUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (e.dataTransfer.files) {
        handleFileSelect(e.dataTransfer.files)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "genomic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "proteomic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "transcriptomic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-slate-300 dark:border-slate-700",
        )}
      >
        <CardContent className="p-8">
          <div className="text-center" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Glissez vos fichiers ici</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">ou cliquez pour sélectionner des fichiers</p>
            <Button
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.multiple = true
                input.accept = ".fasta,.fastq,.vcf,.bam,.sam,.mgf,.mzml,.raw,.csv,.tsv,.xlsx"
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files) handleFileSelect(files)
                }
                input.click()
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sélectionner des fichiers
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Formats supportés: FASTA, FASTQ, VCF, BAM, MGF, mzML, CSV, TSV, Excel
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Fichiers uploadés ({uploadedFiles.length})
            </h4>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <File className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                      <Badge variant="secondary" className={getTypeColor(file.type)}>
                        {file.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span>{formatFileSize(file.size)}</span>
                      {file.status === "uploading" && <span>• {Math.round(file.progress)}%</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {file.status === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="h-8 w-8 p-0">
                      <X className="w-4 h-4" />
                    </Button>
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
