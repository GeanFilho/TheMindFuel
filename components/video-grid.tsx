"use client"

import { VideoCard, type Video } from "@/components/video-card"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoOff } from "lucide-react"

interface VideoGridProps {
  videos: Video[]
  isLoading: boolean
  onPlay: (video: Video) => void
  onLike: (id: string) => void
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-card">
          <Skeleton className="aspect-video w-full" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="mt-1 flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <VideoOff className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        Nenhum video encontrado
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Seja o primeiro a compartilhar um video nesta categoria. Clique em
        &quot;Compartilhar Video&quot; para comecar.
      </p>
    </div>
  )
}

export function VideoGrid({ videos, isLoading, onPlay, onLike }: VideoGridProps) {
  if (isLoading) return <VideoGridSkeleton />
  if (videos.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onPlay={onPlay}
          onLike={onLike}
        />
      ))}
    </div>
  )
}
