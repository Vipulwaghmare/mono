export interface Song {
  id: string
  name: string
  lyrics_marathi: string
  lyrics_english: string
  meaning?: string
  singer: string
  lyricist: string
  tags: string[]
  musicLinks?: {
    spotify?: string
    youtube?: string
    jiosaavn?: string
    gaana?: string
  }
}

export interface Aarti {
  id: string
  name: string
  deity: string
  lyrics_marathi: string
  lyrics_english: string
  tags: string[]
}
