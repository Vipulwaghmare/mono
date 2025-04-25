import Link from "next/link";
import api from "@/lib/api";

export default async function AartiPage() {
  const aartiList = (await api.marathiControllerGetAarti()).data;

  return (
    <div className="container">
      <h1 className="section-title">आरती संग्रह (Aarti Collection)</h1>

      <div className="song-list">
        {aartiList.map((aarti) => (
          <Link
            href={`/aarti/${aarti._id}`}
            key={aarti._id}
            className="song-card"
          >
            <div className="song-card-content">
              <h3 className="song-title">
                {aarti.name_marathi} {aarti.name_english}
              </h3>
              <div className="song-meta">
                <span>Deity: {aarti.deity}</span>
              </div>
              <div className="song-tags">
                {aarti.tags.map((tag, index) => (
                  <span key={index} className="song-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
