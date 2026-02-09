import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: video, error: fetchError } = await supabase
      .from("videos")
      .select("likes_count")
      .eq("id", id)
      .single()

    if (fetchError || !video) {
      return NextResponse.json(
        { error: "Video nao encontrado" },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from("videos")
      .update({ likes_count: video.likes_count + 1 })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.log("[v0] Unexpected error in like POST:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
