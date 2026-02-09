"use client"

import { cn } from "@/lib/utils"
import {
  BookOpen,
  Brain,
  TrendingUp,
  Lightbulb,
  GraduationCap,
  Globe,
  Heart,
  LayoutGrid,
} from "lucide-react"

const categories = [
  { id: "todos", label: "Todos", icon: LayoutGrid },
  { id: "educacao", label: "Educacao", icon: GraduationCap },
  { id: "filosofia", label: "Filosofia", icon: Brain },
  { id: "economia", label: "Economia", icon: TrendingUp },
  { id: "tecnologia", label: "Tecnologia", icon: Lightbulb },
  { id: "ciencia", label: "Ciencia", icon: BookOpen },
  { id: "saude", label: "Saude", icon: Heart },
  { id: "cultura", label: "Cultura", icon: Globe },
]

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-4 md:flex-wrap md:px-0">
      {categories.map((cat) => {
        const isActive = selected === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}

export { categories }
