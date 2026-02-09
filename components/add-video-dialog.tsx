"use client"

import React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { categories } from "@/components/category-filter"

interface AddVideoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVideoAdded: () => void
}

export function AddVideoDialog({
  open,
  onOpenChange,
  onVideoAdded,
}: AddVideoDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    url: "",
    title: "",
    category: "educacao",
    description: "",
    submitted_by: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.url || !form.title) {
      toast.error("Preencha a URL e o titulo do video")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting video:", form)
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      console.log("[v0] Response status:", res.status)
      const responseText = await res.text()
      console.log("[v0] Response body:", responseText)

      if (!res.ok) {
        const err = responseText ? JSON.parse(responseText) : {}
        throw new Error(err.error || "Erro ao adicionar video")
      }

      toast.success("Video adicionado com sucesso!")
      setForm({
        url: "",
        title: "",
        category: "educacao",
        description: "",
        submitted_by: "",
      })
      onOpenChange(false)
      onVideoAdded()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao adicionar video"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Compartilhar Video
          </DialogTitle>
          <DialogDescription>
            Cole o link de um video do YouTube para compartilhar com a
            comunidade.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="url" className="text-foreground">Link do YouTube</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="url"
                placeholder="https://youtube.com/watch?v=..."
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-foreground">Titulo do video</Label>
            <Input
              id="title"
              placeholder="Ex: Como funciona a economia brasileira"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="category" className="text-foreground">Categoria</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm({ ...form, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.id !== "todos")
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="submitted_by" className="text-foreground">Seu nome (opcional)</Label>
              <Input
                id="submitted_by"
                placeholder="Anonimo"
                value={form.submitted_by}
                onChange={(e) =>
                  setForm({ ...form, submitted_by: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-foreground">
              Descricao (opcional)
            </Label>
            <Textarea
              id="description"
              placeholder="Por que esse video e importante?"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adicionando...
              </>
            ) : (
              "Compartilhar Video"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
