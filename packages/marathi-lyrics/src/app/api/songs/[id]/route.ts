import { NextResponse } from "next/server"
import type { Song } from "@/lib/types"

// In a real application, this would connect to a database
const sampleSongs: Song[] = [
  {
    id: "1",
    name: "अबोली",
    lyrics_marathi: `अबोली माझी माळावरती फुलली
सुगंध तिचा दरवळला
अबोली माझी माळावरती फुलली`,
    lyrics_english: `Aboli majhi maalavrati phulali
Sugandh ticha darvalala
Aboli majhi maalavrati phulali`,
    meaning:
      "This song describes the beauty of the Aboli flower blooming on a hill and how its fragrance spreads everywhere.",
    singer: "लता मंगेशकर",
    lyricist: "ग. दि. माडगूळकर",
    tags: ["भावगीत", "निसर्ग"],
  },
  // Other sample songs would be here
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const song = sampleSongs.find((song) => song.id === id)

  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 })
  }

  return NextResponse.json(song)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Check if song exists
  const songIndex = sampleSongs.findIndex((song) => song.id === id)

  if (songIndex === -1) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.lyrics || !body.singer || !body.lyricist) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would update the database
    // For now, we'll just return success
    return NextResponse.json({ message: "Song updated successfully" })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Check if song exists
  const songIndex = sampleSongs.findIndex((song) => song.id === id)

  if (songIndex === -1) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 })
  }

  // In a real app, this would delete from the database
  // For now, we'll just return success
  return NextResponse.json({ message: "Song deleted successfully" })
}
