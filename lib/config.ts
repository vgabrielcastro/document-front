export const config = {
  apiUrl:
    typeof window !== "undefined"
      ? "/api/proxy"
      : process.env.NEXT_PUBLIC_API_URL,
} as const;
