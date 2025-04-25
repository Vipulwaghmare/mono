"use client";
import { useRouter } from "next/navigation";

const marathiAlphabets = [
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ए",
  "ऐ",
  "ओ",
  "औ",
  "क",
  "ख",
  "ग",
  "घ",
  "च",
  "छ",
  "ज",
  "झ",
  "ट",
  "ठ",
  "ड",
  "ढ",
  "ण",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "ष",
  "स",
  "ह",
  "क्ष",
  "ज्ञ",
];

export function AlphabetNav({ activeAlphabet }: { activeAlphabet: string }) {
  const router = useRouter();

  const handleAlphabetClick = (alphabet: string) => {
    router.push(`/alphabet/${encodeURIComponent(alphabet)}`);
  };

  return (
    <nav className="alphabet-nav">
      <div className="alphabet-list">
        {marathiAlphabets.map((alphabet) => (
          <div
            key={alphabet}
            className={`alphabet-item ${activeAlphabet === alphabet ? "active" : ""}`}
            onClick={() => handleAlphabetClick(alphabet)}
          >
            {alphabet}
          </div>
        ))}
      </div>
    </nav>
  );
}
