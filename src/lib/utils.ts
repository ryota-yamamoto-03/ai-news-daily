import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const JST_TIME_ZONE = "Asia/Tokyo";

/** ISO文字列を "2026/07/11" 形式（JST）にフォーマットする */
export function formatDateJST(iso: string | Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: JST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(typeof iso === "string" ? new Date(iso) : iso);
}

/** ISO文字列を "07:00 JST" 形式にフォーマットする */
export function formatTimeJST(iso: string | Date): string {
  const time = new Intl.DateTimeFormat("ja-JP", {
    timeZone: JST_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(typeof iso === "string" ? new Date(iso) : iso);
  return `${time} JST`;
}

/** ISO文字列を "2026/07/11 07:00 JST" 形式にフォーマットする */
export function formatDateTimeJST(iso: string | Date): string {
  return `${formatDateJST(iso)} ${formatTimeJST(iso)}`;
}

/** JST基準の「その日の0:00」をUTCのDateで返す */
export function startOfTodayJST(now: Date = new Date()): Date {
  const jstOffsetMs = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffsetMs);
  const startJst = Date.UTC(
    jstNow.getUTCFullYear(),
    jstNow.getUTCMonth(),
    jstNow.getUTCDate(),
  );
  return new Date(startJst - jstOffsetMs);
}
