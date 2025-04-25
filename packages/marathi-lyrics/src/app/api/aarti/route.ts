import { NextResponse } from "next/server"
import type { Aarti } from "@/lib/types"

// In a real application, this would connect to a database
const sampleAartis: Aarti[] = [
  {
    id: "1",
    name: "गणपती आरती",
    deity: "श्री गणेश",
    lyrics_marathi: `सुखकर्ता दुःखहर्ता वार्ता विघ्नाची
नुरवी पुरवी प्रेम कृपा जयाची`,
    lyrics_english: `Sukhakarta Dukhharta Varta Vighnachi
Nurvi Purvi Prem Krupa Jayachi`,
    tags: ["गणेश", "आरती"],
  },
  // Other sample aartis would be here
]

// In a real app, this would be stored securely in environment variables
const ADMIN_TOKEN = "admin-secret-token-123"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  // Get aarti by ID
  if (id) {
    const aarti = sampleAartis.find((aarti) => aarti.id === id)
    if (!aarti) {
      return NextResponse.json({ error: "Aarti not found" }, { status: 404 })
    }
    return NextResponse.json(aarti)
  }

  // Return all aartis if no filters
  return NextResponse.json(sampleAartis)
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
    if (!body.name || !body.deity || !body.lyrics_marathi || !body.lyrics_english) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would add to a database
    // For now, we'll just return success
    return NextResponse.json({ message: "Aarti added successfully", id: "new-id" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
