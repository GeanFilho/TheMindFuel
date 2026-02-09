import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    console.log("[v0] GET /api/videos - category:", category)
    console.log("[v0] SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "MISSING")
    console.log("[v0] SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "MISSING")

    const supabase = await createClient()

    let query = supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false })

    if (category && category !== "todos") {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) {
      console.log("[v0] Supabase GET error:", JSON.stringify(error))
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] GET success - returned", data?.length, "videos")
    return NextResponse.json(data ?? [])
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.log("[v0] Unexpected error in GET:", message)
    console.log("[v0] Stack:", stack)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, title, category, description, submitted_by } = body

    console.log("[v0] POST /api/videos - body:", { url, title, category })

    if (!url || !title) {
      return NextResponse.json(
        { error: "URL e titulo sao obrigatorios" },
        { status: 400 }
      )
    }

    const youtube_id = extractYouTubeId(url)
    if (!youtube_id) {
      return NextResponse.json(
        { error: "URL do YouTube invalida" },
        { status: 400 }
      )
    }

    const thumbnail_url = `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`

    const supabase = await createClient()

    console.log("[v0] Inserting video with youtube_id:", youtube_id)

    const { data, error } = await supabase
      .from("videos")
      .insert({
        url,
        title,
        youtube_id,
        category: category || "geral",
        description: description || null,
        thumbnail_url,
        submitted_by: submitted_by || "Anonimo",
      })
      .select()
      .single()

    if (error) {
      console.log("[v0] Supabase insert error:", JSON.stringify(error))
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Video inserted successfully:", data?.id)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.log("[v0] Unexpected error in POST:", message)
    console.log("[v0] Stack:", stack)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
