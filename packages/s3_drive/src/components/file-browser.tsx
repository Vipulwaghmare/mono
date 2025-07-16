import { useState, useEffect } from "react";
import type { S3Credentials, S3Bucket, S3Object } from "../types/s3";
import { S3Service } from "../services/s3-service";

interface FileBrowserProps {
  credentials: S3Credentials;
  onLogout: () => void;
}

export default function FileBrowser({
  credentials,
  onLogout,
}: FileBrowserProps) {
  const [buckets, setBuckets] = useState<S3Bucket[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");
  const [objects, setObjects] = useState<S3Object[]>([]);
  const [currentPrefix, setCurrentPrefix] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const s3Service = new S3Service(credentials);

  useEffect(() => {
    loadBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucket) {
      loadObjects(selectedBucket, currentPrefix);
    }
  }, [selectedBucket, currentPrefix]);

  const loadBuckets = async () => {
    setIsLoading(true);
    setError("");
    try {
      const bucketList = await s3Service.listBuckets();
      setBuckets(bucketList);
    } catch (err) {
      setError("Failed to load buckets. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadObjects = async (bucket: string, prefix = "") => {
    setIsLoading(true);
    setError("");
    try {
      const objectList = await s3Service.listObjects(bucket, prefix);
      setObjects(objectList);
    } catch (err) {
      setError(`Failed to load objects from bucket: ${bucket}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBucketSelect = (bucketName: string) => {
    setSelectedBucket(bucketName);
    setCurrentPrefix("");
  };

  const handleFolderClick = (folderPath: string) => {
    setCurrentPrefix(folderPath);
  };

  const handleBackClick = () => {
    const pathParts = currentPrefix.split("/").filter(Boolean);
    pathParts.pop();
    setCurrentPrefix(pathParts.length > 0 ? pathParts.join("/") + "/" : "");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFolders = (): string[] => {
    const folders = new Set<string>();
    objects.forEach((obj) => {
      const relativePath = obj.Key.substring(currentPrefix.length);
      const slashIndex = relativePath.indexOf("/");
      if (slashIndex > 0) {
        folders.add(relativePath.substring(0, slashIndex));
      }
    });
    return Array.from(folders).sort();
  };

  const getFiles = (): S3Object[] => {
    return objects.filter((obj) => {
      const relativePath = obj.Key.substring(currentPrefix.length);
      return relativePath && !relativePath.includes("/");
    });
  };

  return (
    <div className="main-layout">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-title">
              <h1>S3 File Browser</h1>
              <span className="region">Region: {credentials.region}</span>
            </div>
            <button onClick={onLogout} className="btn secondary-btn small-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container content">
        <div className="layout-flex">
          {/* Buckets Sidebar */}
          <aside className="sidebar">
            <div className="card">
              <h3 className="sidebar-title">Buckets ({buckets.length})</h3>
              {isLoading && !selectedBucket ? (
                <div className="empty-state">
                  <span className="form-message">Loading...</span>
                </div>
              ) : (
                <ul className="bucket-list">
                  {buckets.map((bucket) => (
                    <li key={bucket.Name}>
                      <button
                        onClick={() => handleBucketSelect(bucket.Name)}
                        className={`btn small-btn ${selectedBucket === bucket.Name ? "primary-btn" : "secondary-btn"}`}
                      >
                        <div className="bucket-name">{bucket.Name}</div>
                        <div className="bucket-date">
                          {formatDate(bucket.CreationDate)}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
          {/* Files Content */}
          <section className="content-area">
            <div className="card">
              {selectedBucket ? (
                <>
                  {/* Breadcrumb */}
                  <div className="breadcrumb">
                    <div className="breadcrumb-path">
                      <span className="bucket-selected">{selectedBucket}</span>
                      {currentPrefix && (
                        <>
                          <span className="breadcrumb-sep">/</span>
                          <span>{currentPrefix}</span>
                        </>
                      )}
                    </div>
                    {currentPrefix && (
                      <button
                        onClick={handleBackClick}
                        className="btn secondary-btn small-btn"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  {error && <div className="form-message error">{error}</div>}
                  {isLoading ? (
                    <div className="empty-state">
                      <span className="form-message">Loading objects...</span>
                    </div>
                  ) : (
                    <div className="file-list">
                      {/* Folders */}
                      {getFolders().map((folder) => (
                        <button
                          key={folder}
                          onClick={() =>
                            handleFolderClick(currentPrefix + folder + "/")
                          }
                          className="btn secondary-btn small-btn folder-btn"
                        >
                          <span className="folder-name">{folder}/</span>
                          <span className="folder-label">Folder</span>
                        </button>
                      ))}
                      {/* Files */}
                      {getFiles().map((object) => (
                        <div
                          key={object.Key}
                          className="project-card file-card"
                        >
                          <div className="file-info">
                            <div className="file-name">
                              {object.Key.substring(currentPrefix.length)}
                            </div>
                            <div className="file-meta">
                              {formatFileSize(object.Size)} •{" "}
                              {formatDate(object.LastModified)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {getFolders().length === 0 && getFiles().length === 0 && (
                        <div className="empty-state">
                          <span className="form-message">
                            This location is empty.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state">
                  <span className="form-message">
                    Select a bucket to view its contents.
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
