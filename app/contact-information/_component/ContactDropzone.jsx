"use client"

import React, { useCallback, type ReactNode } from "react"
import { Upload } from "lucide-react"

interface DropzoneProps {
  maxSize?: number
  minSize?: number
  onDrop: (files: File[]) => void
  onError?: (error: Error) => void
  src?: File[]
  children?: ReactNode
}

export function Dropzone({ maxSize = 10 * 1024 * 1024, minSize = 0, onDrop, onError, src, children }: DropzoneProps) {
  const [isDragActive, setIsDragActive] = React.useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    validateAndProcess(files)
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    validateAndProcess(files)
  }, [])

  const validateAndProcess = (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        onError?.(new Error(`File ${file.name} exceeds maximum size of ${maxSize} bytes`))
        return false
      }
      if (file.size < minSize) {
        onError?.(new Error(`File ${file.name} is below minimum size of ${minSize} bytes`))
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      onDrop(validFiles)
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
      }`}
    >
      <input type="file" multiple onChange={handleChange} className="hidden" id="dropzone-input" />

      {children ? (
        children
      ) : (
        <label htmlFor="dropzone-input" className="flex flex-col items-center justify-center cursor-pointer gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Drag and drop files here, or click to select</p>
          <p className="text-xs text-muted-foreground">Max file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB</p>
        </label>
      )}

      {src && src.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground mb-2">Uploaded files:</p>
          <ul className="space-y-1">
            {src.map((file, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                ✓ {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function DropzoneEmptyState() {
  return null
}

export function DropzoneContent() {
  return null
}
