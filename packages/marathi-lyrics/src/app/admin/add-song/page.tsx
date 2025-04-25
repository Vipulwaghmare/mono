"use client";
import type React from "react";
import { useState } from "react";

export default function AddSongPage() {
  const [formData, setFormData] = useState({
    name: "",
    lyrics_marathi: "",
    lyrics_english: "",
    meaning: "",
    singer: "",
    lyricist: "",
    tags: "",
    adminToken: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // In a real app, you would validate the admin token on the server
      if (!formData.adminToken) {
        throw new Error("Admin token is required");
      }

      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formData.adminToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          lyrics_marathi: formData.lyrics_marathi,
          lyrics_english: formData.lyrics_english,
          meaning: formData.meaning,
          singer: formData.singer,
          lyricist: formData.lyricist,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add song");
      }

      setSuccess("Song added successfully!");
      // Reset form
      setFormData({
        name: "",
        lyrics_marathi: "",
        lyrics_english: "",
        meaning: "",
        singer: "",
        lyricist: "",
        tags: "",
        adminToken: formData.adminToken, // Keep the token
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1 className="section-title">Add New Song (Admin Only)</h1>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            borderRadius: "var(--border-radius)",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "1rem",
            borderRadius: "var(--border-radius)",
            marginBottom: "1rem",
          }}
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "var(--color-white)",
          padding: "2rem",
          borderRadius: "var(--border-radius)",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Song Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="lyrics_marathi"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Lyrics (Marathi)*
          </label>
          <textarea
            id="lyrics_marathi"
            name="lyrics_marathi"
            value={formData.lyrics_marathi}
            onChange={handleChange}
            required
            className="search-input"
            style={{ minHeight: "200px" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="lyrics_english"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Lyrics (English Transliteration)*
          </label>
          <textarea
            id="lyrics_english"
            name="lyrics_english"
            value={formData.lyrics_english}
            onChange={handleChange}
            required
            className="search-input"
            style={{ minHeight: "200px" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="meaning"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Meaning (Optional)
          </label>
          <textarea
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            className="search-input"
            style={{ minHeight: "150px" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="singer"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Singer*
          </label>
          <input
            type="text"
            id="singer"
            name="singer"
            value={formData.singer}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="lyricist"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Lyricist*
          </label>
          <input
            type="text"
            id="lyricist"
            name="lyricist"
            value={formData.lyricist}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="tags"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Tags* (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            className="search-input"
            placeholder="भावगीत, प्रेमगीत, चित्रपट"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="adminToken"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Admin Token*
          </label>
          <input
            type="password"
            id="adminToken"
            name="adminToken"
            value={formData.adminToken}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          {isSubmitting ? "Adding Song..." : "Add Song"}
        </button>
      </form>
    </div>
  );
}
