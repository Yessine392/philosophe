import { useSyncExternalStore } from "react";
import { currentRoute, getVersion, subscribe } from "../router-store";

export class NotFoundError extends Error {}

export function notFound(): never {
  throw new NotFoundError("not found");
}

export function usePathname() {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  return currentRoute().pathname;
}

export function useSearchParams() {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  return new URLSearchParams((window as Window & { __philoSearch?: string }).__philoSearch ?? "");
}
