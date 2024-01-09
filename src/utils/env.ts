// Get environment variables
export function getEnv(): string {
  return import.meta.env.MODE
}

// It is a development mode
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

// It is a production mode
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
