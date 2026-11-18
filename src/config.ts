// Satu tempat untuk nama aplikasi dan konfigurasi landing page.
export const APP_NAME = "Lumina";

export const ROUTES = {
  login: "/masuk",
  // Dipakai jika /api/auth/me tidak mengembalikan rute progres.
  continueDefault: "/peta",
  // Tujuan tombol "Pelajari lebih lanjut" di hero dan bagian penutup.
  learnMore: "#fitur",
} as const;

export const SESSION = {
  // Matikan dulu sampai backend siap; CTA otomatis memakai versi "belum login".
  enabled: false,
  endpoint: "/api/auth/me",
  timeoutMs: 3000,
} as const;
