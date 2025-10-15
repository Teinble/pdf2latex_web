import { useEffect, useState } from "react";

interface FileUploadInputProps {
  setFile: (file: File) => void;
}

export const FileUploadInput = ({ setFile }: FileUploadInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mime, setMime] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setMime(f.type || null);

    // revoke old URL if any, then create a new one
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(f);
    });
  };

  // revoke on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const isImage = mime?.startsWith("image/");
  const isPdf = mime === "application/pdf";

  return (
    <div className="card p-4 space-y-3">
      <label className="card-title">Upload Your LaTeX Image Here:</label>

      <input
        className="file-input"
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleChange}
      />

      <p className="text-sm opacity-70">Preview your uploaded file:</p>

      {previewUrl && isImage && (
        <img
          src={previewUrl}
          alt="Preview"
          className="max-h-80 rounded-xl object-contain border"
        />
      )}

      {previewUrl && isPdf && (
        <embed
          src={previewUrl}
          type="application/pdf"
          className="w-full h-96 border rounded-xl"
        />
      )}

      {!previewUrl && <div className="text-sm opacity-50">No file selected yet.</div>}
    </div>
  );
};
