/**
 * Utility functions for maintenance mode
 */

export interface MaintenanceConfig {
     isEnabled: boolean;
     message?: string;
     endTime?: string;
}

/**
 * Check if maintenance mode is currently active
 */
export function isMaintenanceMode(): boolean {
     return process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
}

/**
 * Get maintenance configuration
 */
export function getMaintenanceConfig(): MaintenanceConfig {
     return {
          isEnabled: isMaintenanceMode(),
          message: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE,
          endTime: process.env.NEXT_PUBLIC_MAINTENANCE_END_TIME,
     };
}

/**
 * Get formatted maintenance end time
 */
export function getMaintenanceEndTime(): Date | null {
     const endTime = process.env.NEXT_PUBLIC_MAINTENANCE_END_TIME;
     if (!endTime) return null;
     
     try {
          return new Date(endTime);
     } catch {
          return null;
     }
}

/**
 * Check if maintenance period has ended
 */
export function isMaintenanceExpired(): boolean {
     const endTime = getMaintenanceEndTime();
     if (!endTime) return false;
     
     return new Date() > endTime;
}

/**
 * Get time remaining until maintenance ends
 */
export function getMaintenanceTimeRemaining(): {
     days: number;
     hours: number;
     minutes: number;
     seconds: number;
} | null {
     const endTime = getMaintenanceEndTime();
     if (!endTime) return null;
     
     const now = new Date();
     const diff = endTime.getTime() - now.getTime();
     
     if (diff <= 0) return null;
     
     return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
     };
}
