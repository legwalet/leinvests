const isStaging = import.meta.env.VITE_APP_ENV === 'staging';

export const logger = {
  error: (message: string, error?: any) => {
    if (isStaging) {
      console.error(`[STAGING] ${message}`, error);
    }
  },
  info: (message: string, data?: any) => {
    if (isStaging) {
      console.log(`[STAGING] ${message}`, data);
    }
  }
}; 