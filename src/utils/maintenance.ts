// src/utils/maintenance.ts

export interface MaintenanceConfig {
     isEnabled: boolean;
     message?: string;
     endTime?: string;
     password?: string;
}

const API_URL = "https://oktaa.my.id/api/maintenance-ormik";

interface MaintenanceResponse {
     maintenanceMode: boolean | "true" | "false";
     endtime: string;
     password: string;
     message: string;
}

/**
 * Fetch config (SSR & browser-safe)
 * SELALU return objek dengan struktur lengkap agar aman dipakai di mana pun.
 */
export async function fetchMaintenanceConfig(): Promise<MaintenanceConfig> {
     try {
          const response = await fetch(API_URL, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               // no-store supaya SSR metadata tidak mem-cache versi lama
               cache: "no-store"
          });

          if (!response.ok) throw new Error("Bad response");

          const data = (await response.json()) as MaintenanceResponse;

          // cocokkan apapun bentuk boolean-nya
          const enabled = (data.maintenanceMode === true || data.maintenanceMode === "true");

          return {
               isEnabled: enabled,
               message: data.message,
               endTime: data.endtime,
               password: data.password
          };
     } catch (err) {
          console.warn("[Maintenance] fetch failed:", err);
          // fallback safe
          return {
               isEnabled: false,
               message: undefined,
               endTime: undefined,
               password: undefined
          };
     }
}

export async function getMaintenanceEndTime(): Promise<Date | null> {
     const cfg = await fetchMaintenanceConfig();
     if (!cfg.endTime) return null;
     try {
          return new Date(cfg.endTime);
     } catch {
          return null;
     }
}

export async function isMaintenanceExpired() {
     const end = await getMaintenanceEndTime();
     if (!end) return false;
     return new Date() > end;
}

export async function getMaintenanceTimeRemaining() {
     const cfg = await fetchMaintenanceConfig();
     if (!cfg.endTime) return null;
     const now = new Date();
     const end = new Date(cfg.endTime);
     const diff = end.getTime() - now.getTime();
     if (diff <= 0) return null;

     return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
     };


}
