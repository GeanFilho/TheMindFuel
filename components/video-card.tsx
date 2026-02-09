"use client"

import React from "react"

import { useState } from "react"
import { ExternalLink, Heart, Play, Clock, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export interface Video {
  id: string
  title: string
  url: string
  youtube_id: string
  category: string
  description: string | null
  thumbnail_url: string
  submitted_by: string
  likes_count: number
  created_at: string
}

interface VideoCardProps {
  video: Video
  onPlay: (video: Video) => void
  onLike: (id: string) => void
}

const categoryColors: Record<string, string> = {
  educacao: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  filosofia:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  economia:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  tecnologia:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  ciencia:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  saude: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  cultura:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  geral: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
}

export function VideoCard({ video, onPlay, onLike }: VideoCardProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLiking || liked) return
    setIsLiking(true)
    setLiked(true)
    await onLike(video.id)
    setIsLiking(false)
  }

  const timeAgo = formatDistanceToNow(new Date(video.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card className="group cursor-pointer overflow-hidden border bg-card transition-all hover:shadow-lg hover:border-primary/20">
      <div className="relative" onClick={() => onPlay(video)}>
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={video.thumbnail_url || "/placeholder.svg"}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all group-hover:bg-foreground/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 group-hover:scale-100 scale-75">
            <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
          </div>
        </div>
        <Badge
          className={cn(
            "absolute left-3 top-3 border-0 text-xs font-medium",
            categoryColors[video.category] || categoryColors.geral
          )}
        >
          {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3
          className="line-clamp-2 font-display text-sm font-semibold leading-snug text-card-foreground"
          onClick={() => onPlay(video)}
        >
          {video.title}
        </h3>

        {video.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {video.description}
          </p>
        )}

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {video.submitted_by}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all",
                liked
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                  : "bg-secondary text-muted-foreground hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
              )}
            >
              <Heart
                className={cn("h-3 w-3", liked && "fill-current")}
              />
              {video.likes_count + (liked ? 1 : 0)}
            </button>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
