export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";

  // Si estás en Vercel u otro hosting
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Fallback local
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
