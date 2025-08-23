// Asset Cache Management Utility

export interface CacheData {
     version: string;
     timestamp: number;
     loadedAssets: string[];
     userAgent?: string;
}

export class AssetCache {
     private static readonly CACHE_KEY = 'ormik-assets-cache';
     private static readonly CACHE_VERSION = '1.0.0';
     private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
     private static readonly MAX_CACHE_SIZE = 5 * 1024 * 1024; // 5MB limit

     // Check if cache is valid
     static isValid(): boolean {
          try {
               const cached = localStorage.getItem(this.CACHE_KEY);
               if (!cached) return false;

               const cacheData: CacheData = JSON.parse(cached);
               const now = Date.now();
               
               // Check version, expiry, and user agent
               if (
                    cacheData.version !== this.CACHE_VERSION ||
                    (now - cacheData.timestamp) > this.CACHE_DURATION ||
                    (cacheData.userAgent && cacheData.userAgent !== navigator.userAgent)
               ) {
                    this.clear();
                    return false;
               }

               return true;
          } catch (error) {
               console.warn('Cache validation failed:', error);
               this.clear();
               return false;
          }
     }

     // Save assets to cache
     static save(assets: string[]): boolean {
          try {
               const cacheData: CacheData = {
                    version: this.CACHE_VERSION,
                    timestamp: Date.now(),
                    loadedAssets: assets,
                    userAgent: navigator.userAgent
               };

               const serialized = JSON.stringify(cacheData);
               
               // Check cache size before saving
               if (this.getStorageSize() + serialized.length > this.MAX_CACHE_SIZE) {
                    console.warn('Cache size limit exceeded, clearing old cache');
                    this.clear();
               }

               localStorage.setItem(this.CACHE_KEY, serialized);
               return true;
          } catch (error) {
               console.warn('Cache save failed:', error);
               return false;
          }
     }

     // Get cached data
     static get(): CacheData | null {
          try {
               const cached = localStorage.getItem(this.CACHE_KEY);
               return cached ? JSON.parse(cached) : null;
          } catch (error) {
               console.warn('Cache retrieval failed:', error);
               return null;
          }
     }

     // Clear cache
     static clear(): void {
          try {
               localStorage.removeItem(this.CACHE_KEY);
          } catch (error) {
               console.warn('Cache clear failed:', error);
          }
     }

     // Get remaining cache time
     static getRemainingTime(): number {
          const cache = this.get();
          if (!cache) return 0;
          
          const elapsed = Date.now() - cache.timestamp;
          return Math.max(0, this.CACHE_DURATION - elapsed);
     }

     // Get cache info for debugging
     static getInfo(): string {
          const cache = this.get();
          if (!cache) return 'No cache found';

          const remainingTime = this.getRemainingTime();
          const hours = Math.floor(remainingTime / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

          return `Cache valid for ${hours}h ${minutes}m, ${cache.loadedAssets.length} assets`;
     }

     // Get current localStorage usage
     private static getStorageSize(): number {
          let total = 0;
          for (let key in localStorage) {
               if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length + key.length;
               }
          }
          return total;
     }

     // Preload assets with cache awareness
     static async preloadAssets(assets: string[], onProgress?: (progress: number) => void): Promise<boolean> {
          let loadedCount = 0;
          const totalAssets = assets.length;

          const preloadPromises = assets.map((src) => {
               return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                         loadedCount++;
                         if (onProgress) {
                              onProgress((loadedCount / totalAssets) * 100);
                         }
                         resolve();
                    };
                    img.onerror = () => {
                         loadedCount++;
                         if (onProgress) {
                              onProgress((loadedCount / totalAssets) * 100);
                         }
                         resolve(); // Continue even if some images fail
                    };
                    img.src = src;
               });
          });

          try {
               await Promise.all(preloadPromises);
               return true;
          } catch (error) {
               console.warn('Asset preloading failed:', error);
               return false;
          }
     }
}

export default AssetCache;
