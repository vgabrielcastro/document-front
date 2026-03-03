export const config = {
  apiUrl:
    typeof window !== "undefined"
      ? "/api/proxy"
      : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050",
} as const;
