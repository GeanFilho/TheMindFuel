"use client"

import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Video } from "@/components/video-card"

interface VideoPlayerProps {
  video: Video
  onClose: () => void
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex-1 pr-4">
            <h2 className="line-clamp-1 font-display text-sm font-semibold text-card-foreground md:text-base">
              {video.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Abrir no YouTube</span>
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar player</span>
            </Button>
          </div>
        </div>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {video.description && (
          <div className="border-t px-4 py-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {video.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
