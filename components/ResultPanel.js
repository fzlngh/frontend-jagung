"use client";

import { CLASS_META, CLASS_ORDER } from "@/lib/classes";

export default function ResultPanel({ result, error }) {
  if (error) {
    return (
      <div className="card-index border-rust/40 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-rust-dark">Gagal memindai</p>
        <p className="mt-2 text-sm text-ink/80">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card-index flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-ink/50">
        <p className="font-display text-lg italic">Belum ada hasil</p>
        <p className="max-w-xs text-sm">
          Unggah atau ambil foto daun jagung, lalu tekan &ldquo;Pindai Daun&rdquo; untuk melihat diagnosis di sini.
        </p>
      </div>
    );
  }

  const meta = CLASS_META[result.predictedClass];
  const isMock = result.source === "mock";

  return (
    <div className="card-index p-6 sm:p-8">
      {isMock && (
        <p className="mb-4 border border-corn-dark/30 bg-corn/10 px-3 py-2 text-xs text-corn-dark">
          Mode contoh: backend belum terhubung ke model Roboflow (USE_MOCK_INFERENCE=true). Hasil di
          bawah ini acak untuk keperluan pengujian tampilan.
        </p>
      )}

      <p className="font-mono text-xs uppercase tracking-wide text-ink/50">Hasil Diagnosis · {meta.tag}</p>
      <h2 className={`mt-1 font-display text-3xl font-semibold ${meta.textClass}`}>{meta.label}</h2>
      <p className="mt-2 text-sm text-ink/70">{meta.description}</p>

      <div className="mt-3 flex items-center gap-2">
        <span className="font-mono text-xs text-ink/50">Keyakinan</span>
        <span className="font-mono text-sm font-medium text-ink">{(result.confidence * 100).toFixed(1)}%</span>
      </div>

      <div className="mt-6 space-y-3">
        {CLASS_ORDER.map((slug) => {
          const classMeta = CLASS_META[slug];
          const score = result.scores?.[slug]?.score ?? 0;
          const pct = Math.max(0, Math.min(100, score * 100));
          const isTop = slug === result.predictedClass;

          return (
            <div key={slug}>
              <div className="flex items-baseline justify-between text-xs">
                <span className={isTop ? `font-semibold ${classMeta.textClass}` : "text-ink/60"}>
                  {classMeta.label}
                </span>
                <span className="font-mono text-ink/50">{pct.toFixed(1)}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-line/60">
                <div
                  className={`h-full rounded-full ${classMeta.barClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/50">Saran Penanganan</p>
        <p className="mt-1 text-sm text-ink/80">{meta.advice}</p>
      </div>

      <p className="mt-6 font-mono text-[11px] text-ink/40">
        Dipindai {new Date(result.scannedAt).toLocaleString("id-ID")}
      </p>
    </div>
  );
}
