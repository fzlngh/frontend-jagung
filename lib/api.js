const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function scanCornLeaf(file) {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${API_BASE}/api/scan`, {
    method: "POST",
    body: form,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `Pemindaian gagal (${res.status}).`);
  }

  return data;
}

export async function getBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
