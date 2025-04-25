import { NextResponse } from "next/server"
import type { Song } from "@/lib/types"

// In a real application, this would connect to a database
// For now, we'll use the same sample data
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

// In a real app, this would be stored securely in environment variables
const ADMIN_TOKEN = "admin-secret-token-123"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const letter = searchParams.get("letter")
  const query = searchParams.get("q")
  const id = searchParams.get("id")

  // Get song by ID
  if (id) {
    const song = sampleSongs.find((song) => song.id === id)
    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 })
    }
    return NextResponse.json(song)
  }

  // Search songs
  if (query) {
    const lowercaseQuery = query.toLowerCase()
    const results = sampleSongs.filter(
      (song) =>
        song.name.toLowerCase().includes(lowercaseQuery) ||
        song.singer.toLowerCase().includes(lowercaseQuery) ||
        song.lyricist.toLowerCase().includes(lowercaseQuery) ||
        song.lyrics_marathi.toLowerCase().includes(lowercaseQuery) ||
        song.lyrics_english.toLowerCase().includes(lowercaseQuery) ||
        song.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
    return NextResponse.json(results)
  }

  // Get songs by first letter
  if (letter) {
    const results = sampleSongs.filter((song) => song.name.charAt(0) === letter)
    return NextResponse.json(results)
  }

  // Return all songs if no filters
  return NextResponse.json(sampleSongs)
}

export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.lyrics_marathi || !body.lyrics_english || !body.singer || !body.lyricist) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would add to a database
    // For now, we'll just return success
    return NextResponse.json({ message: "Song added successfully", id: "new-id" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
