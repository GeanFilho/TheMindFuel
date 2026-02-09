"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CategoryFilter } from "@/components/category-filter"
import { VideoGrid } from "@/components/video-grid"
import { VideoPlayer } from "@/components/video-player"
import { AddVideoDialog } from "@/components/add-video-dialog"
import type { Video } from "@/components/video-card"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchVideos = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/videos?category=${selectedCategory}`)
      const data = await res.json()
      setVideos(data)
    } catch {
      setVideos([])
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  const handleLike = useCallback(
    async (id: string) => {
      try {
        await fetch(`/api/videos/${id}/like`, { method: "POST" })
        fetchVideos()
      } catch {
        // silently fail
      }
    },
    [fetchVideos]
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onOpenAddVideo={() => setAddDialogOpen(true)} />
      <Hero />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 md:px-6">
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="mt-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {!isLoading && (
                <>
                  <span className="font-semibold text-foreground">
                    {videos.length}
                  </span>{" "}
                  {videos.length === 1 ? "video" : "videos"} encontrado
                  {videos.length === 1 ? "" : "s"}
                </>
              )}
            </p>
          </div>
          <VideoGrid
            videos={videos}
            isLoading={isLoading}
            onPlay={setPlayingVideo}
            onLike={handleLike}
          />
        </div>
      </main>

      <footer className="border-t bg-card py-6 text-center">
        <p className="text-sm text-muted-foreground">
          MindFuel &mdash; Feito para quem quer trocar o doomscrolling por
          conhecimento.
        </p>
      </footer>

      {playingVideo && (
        <VideoPlayer
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}

      <AddVideoDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onVideoAdded={() => fetchVideos()}
      />
    </div>
  )
}
