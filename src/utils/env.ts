/**
 * @description: get environment variables
 */
 export function getEnv(): string {
    return import.meta.env.MODE
  }
  
  /**
   * @description: is it a development mode
   */
  export function isDevMode(): boolean {
    return import.meta.env.DEV
  }
  
  /**
   * @description: is it a production mode
   */
  export function isProdMode(): boolean {
    return import.meta.env.PROD
  }
  