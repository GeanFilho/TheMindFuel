"use client"

import { Flame, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onOpenAddVideo: () => void
}

export function Header({ onOpenAddVideo }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            MindFuel
          </span>
        </div>
        <Button onClick={onOpenAddVideo} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Compartilhar Video</span>
          <span className="sm:hidden">Adicionar</span>
        </Button>
      </div>
    </header>
  )
}
