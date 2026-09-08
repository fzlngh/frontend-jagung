export const CLASS_META = {
  healthy: {
    label: "Sehat",
    tag: "01",
    swatch: "#3C6E47",
    barClass: "bg-leaf",
    textClass: "text-leaf-dark",
    description: "Daun tampak normal — warna hijau merata, tanpa bercak atau lesi.",
    advice: "Tidak perlu tindakan. Lanjutkan pemantauan rutin setiap 1–2 minggu.",
  },
  gray_leaf_spot: {
    label: "Gray Leaf Spot",
    tag: "02",
    swatch: "#5A6B72",
    barClass: "bg-slate",
    textClass: "text-slate",
    description: "Bercak persegi panjang abu kecoklatan yang sejajar dengan tulang daun.",
    advice: "Pertimbangkan rotasi tanaman, jarak tanam lebih renggang, dan fungisida bila gejala meluas.",
  },
  common_rust: {
    label: "Common Rust",
    tag: "03",
    swatch: "#B5502D",
    barClass: "bg-rust",
    textClass: "text-rust-dark",
    description: "Bintik-bintik kecil kecoklatan seperti karat, tersebar di kedua sisi daun.",
    advice: "Periksa varietas tahan karat untuk musim tanam berikutnya; fungisida efektif bila diberi sejak dini.",
  },
  blight: {
    label: "Blight",
    tag: "04",
    swatch: "#8A6A2F",
    barClass: "bg-corn-dark",
    textClass: "text-corn-dark",
    description: "Lesi memanjang berbentuk seperti cerutu, abu-kehijauan hingga cokelat.",
    advice: "Buang sisa tanaman terinfeksi setelah panen dan pertimbangkan fungisida pada tahap awal infeksi.",
  },
};

export const CLASS_ORDER = ["healthy", "gray_leaf_spot", "common_rust", "blight"];
