"use client";
import api from "@/lib/api";
import { AartiResponseDto } from "@vipulwaghmare/apis";
import type React from "react";
import { useState } from "react";

const defaultValues = {
  name_english: "",
  name_marathi: "",
  deity: "",
  lyrics_marathi: "",
  lyrics_english: "",
  tags: "",
  _id: "",
};

export default function AddAartiPage() {
  const [formData, setFormData] = useState<
    Omit<AartiResponseDto, "tags"> & { tags: string }
  >(defaultValues);
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
      // if (!formData.adminToken) {
      //   throw new Error("Admin token is required");
      // }
      const response = await api.marathiControllerAddAarti({
        ...formData,
        tags: formData.tags.split(","),
      });

      if (response.status !== 201) {
        throw new Error("Failed to add aarti");
      }

      setSuccess("Aarti added successfully!");
      // Reset form
      setFormData(defaultValues);
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
      <h1 className="section-title">Add New Aarti (Admin Only)</h1>

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
        {" "}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="name_marathi"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Aarti Marathi Name*
          </label>
          <input
            type="text"
            id="name_marathi"
            name="name_marathi"
            value={formData.name_marathi}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="name_english"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Aarti English Name*
          </label>
          <input
            type="text"
            id="name_english"
            name="name_english"
            value={formData.name_english}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="deity"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Deity*
          </label>
          <input
            type="text"
            id="deity"
            name="deity"
            value={formData.deity}
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
            placeholder="गणेश, आरती, देवी"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          {isSubmitting ? "Adding Aarti..." : "Add Aarti"}
        </button>
      </form>
    </div>
  );
}
