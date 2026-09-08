"use client";

import { useCallback, useRef, useState } from "react";

export default function UploadPanel({ onSelectFile, previewUrl, onScan, isScanning, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0];
      if (!file) return;
      if (!/^image\/(jpeg|png|jpg)$/.test(file.type)) {
        alert("Mohon unggah gambar berformat JPG atau PNG.");
        return;
      }
      onSelectFile(file);
    },
    [onSelectFile]
  );

  return (
    <div className="card-index p-6 sm:p-8">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative flex flex-col items-center justify-center gap-4 rounded-sm border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging ? "border-leaf bg-leaf/5" : "border-line"
        }`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Pratinjau daun jagung yang dipilih"
            className="max-h-64 rounded-sm border border-line object-cover"
          />
        ) : (
          <>
            <LeafIcon />
            <p className="max-w-xs text-sm text-ink/70">
              Seret &amp; letakkan foto daun jagung di sini, atau pilih dari galeri / kamera.
            </p>
          </>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="focus-ring rounded-sm border border-ink/20 bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf-dark"
          >
            Pilih dari galeri
          </button>
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="focus-ring rounded-sm border border-ink/20 bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf-dark"
          >
            Ambil foto
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/jpeg,image/png"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <button
        type="button"
        onClick={onScan}
        disabled={disabled || isScanning}
        className="focus-ring mt-6 w-full rounded-sm bg-leaf px-4 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-colors hover:bg-leaf-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-ink/40"
      >
        {isScanning ? "Memindai…" : "Pindai Daun"}
      </button>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-leaf" aria-hidden="true">
      <path
        d="M8 32C8 18 18 8 32 8C32 22 22 32 8 32Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 31L22 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
