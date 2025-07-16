import type React from "react";
import { useState } from "react";
import type { S3Credentials } from "../types/s3";

interface CredentialsFormProps {
  onCredentialsSubmit: (credentials: S3Credentials) => void;
}

export default function CredentialsForm({
  onCredentialsSubmit,
}: CredentialsFormProps) {
  const [formData, setFormData] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
    sessionToken: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.accessKeyId || !formData.secretAccessKey) {
      setError("Access Key ID and Secret Access Key are required");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate validation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const credentials: S3Credentials = {
        accessKeyId: formData.accessKeyId,
        secretAccessKey: formData.secretAccessKey,
        region: formData.region,
        ...(formData.sessionToken && { sessionToken: formData.sessionToken }),
      };

      onCredentialsSubmit(credentials);
    } catch (err) {
      setError("Failed to validate credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="centered-container">
      <div className="card form-section">
        <div className="section-header">
          <h2>Connect to AWS S3</h2>
          <div className="underline" />
          <p>Enter your AWS credentials to browse S3 buckets and files</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accessKeyId">Access Key ID *</label>
            <input
              id="accessKeyId"
              name="accessKeyId"
              type="text"
              required
              value={formData.accessKeyId}
              onChange={handleInputChange}
              placeholder="AKIAIOSFODNN7EXAMPLE"
            />
          </div>
          <div className="form-group">
            <label htmlFor="secretAccessKey">Secret Access Key *</label>
            <input
              id="secretAccessKey"
              name="secretAccessKey"
              type="password"
              required
              value={formData.secretAccessKey}
              onChange={handleInputChange}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
            >
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-east-2">US East (Ohio)</option>
              <option value="us-west-1">US West (N. California)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">Europe (Ireland)</option>
              <option value="eu-central-1">Europe (Frankfurt)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sessionToken">Session Token (Optional)</label>
            <input
              id="sessionToken"
              name="sessionToken"
              type="password"
              value={formData.sessionToken}
              onChange={handleInputChange}
              placeholder="For temporary credentials"
            />
          </div>
          {error && <div className="form-message error">{error}</div>}
          <div className="form-actions">
            <button
              type="submit"
              className="btn primary-btn"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect to S3"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
