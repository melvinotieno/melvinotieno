import { BASE_URL } from "./constants";

export function resolveImage(title: string, image?: string): string {
  return image ?? `${BASE_URL}/og?title=${encodeURIComponent(title)}`;
}
