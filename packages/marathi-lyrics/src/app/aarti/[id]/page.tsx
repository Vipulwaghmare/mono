import api from "@/lib/api";

export default async function AartiPage({
  params,
}: {
  params: { id: string };
}) {
  const aarti = (await api.marathiControllerGetAartiById(params.id)).data;

  if (!aarti) {
    return (
      <div className="container">
        <div style={{ padding: "4rem 0", textAlign: "center" }}>
          <h1>Aarti not found</h1>
          <p>{`The aarti you're looking for doesn't exist or has been removed.`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1 className="section-title">
        {aarti.name_english} {aarti.name_marathi}
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span style={{ fontWeight: "bold" }}>Deity:</span> {aarti.deity}
      </p>

      <div className="lyrics-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h2 className="section-title">मराठी (Marathi)</h2>
            <div style={{ whiteSpace: "pre-line" }}>{aarti.lyrics_marathi}</div>
          </div>
          <div>
            <h2 className="section-title">English</h2>
            <div style={{ whiteSpace: "pre-line" }}>{aarti.lyrics_english}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
