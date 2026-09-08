"use client";

import { useEffect, useState } from "react";
import UploadPanel from "@/components/UploadPanel";
import ResultPanel from "@/components/ResultPanel";
import { scanCornLeaf, getBackendHealth } from "@/lib/api";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    getBackendHealth().then(setHealth);
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSelectFile = (selected) => {
    setFile(selected);
    setResult(null);
    setError(null);
  };

  const handleScan = async () => {
    if (!file) return;
    setIsScanning(true);
    setError(null);
    try {
      const data = await scanCornLeaf(file);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-10 flex flex-col gap-3 border-b border-line pb-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-leaf-dark">Panduan Lapangan · Jagung</p>
          {health && (
            <span
              className={`font-mono text-[11px] ${
                health.mode === "mock" ? "text-corn-dark" : "text-leaf-dark"
              }`}
            >
              {health.mode === "mock" ? "● server: mode contoh" : "● server: Roboflow aktif"}
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Pindai Daun Jagung untuk <em className="not-italic text-leaf">Deteksi Dini Penyakit</em>
        </h1>
        <p className="max-w-2xl text-sm text-ink/70 sm:text-base">
          Foto satu lembar daun jagung, dan model klasifikasi citra dari Roboflow akan memeriksanya
          untuk empat kondisi: Sehat, Gray Leaf Spot, Common Rust, dan Blight.
        </p>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        <UploadPanel
          onSelectFile={handleSelectFile}
          previewUrl={previewUrl}
          onScan={handleScan}
          isScanning={isScanning}
          disabled={!file}
        />
        <ResultPanel result={result} error={error} />
      </div>

      <footer className="mt-12 border-t border-line pt-6 font-mono text-[11px] text-ink/40">
        Frontend Next.js · Backend Express.js · Inferensi Roboflow
      </footer>
    </main>
  );
}
