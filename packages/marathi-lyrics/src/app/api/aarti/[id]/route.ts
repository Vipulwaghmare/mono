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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const aarti = sampleAartis.find((aarti) => aarti.id === id)

  if (!aarti) {
    return NextResponse.json({ error: "Aarti not found" }, { status: 404 })
  }

  return NextResponse.json(aarti)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Verify admin token
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.split(" ")[1]

  if (!token || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if aarti exists
  const aartiIndex = sampleAartis.findIndex((aarti) => aarti.id === id)

  if (aartiIndex === -1) {
    return NextResponse.json({ error: "Aarti not found" }, { status: 404 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.deity || !body.lyrics_marathi || !body.lyrics_english) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would update the database
    // For now, we'll just return success
    return NextResponse.json({ message: "Aarti updated successfully" })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Verify admin token
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.split(" ")[1]

  if (!token || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if aarti exists
  const aartiIndex = sampleAartis.findIndex((aarti) => aarti.id === id)

  if (aartiIndex === -1) {
    return NextResponse.json({ error: "Aarti not found" }, { status: 404 })
  }

  // In a real app, this would delete from the database
  // For now, we'll just return success
  return NextResponse.json({ message: "Aarti deleted successfully" })
}
