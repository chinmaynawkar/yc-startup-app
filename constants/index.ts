export const ROUTES = {
    HOME: '/',
    STARTUP: '/startup',
    USER: '/user',
    CREATE: '/startup/create',
    STUDIO: '/studio',
  } as const;
  
  export const SANITY = {
    API_VERSION: '2024-10-26',
    DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  } as const;
  
  export const PAGINATION = {
    ITEMS_PER_PAGE: 12,
    MAX_PAGES: 100,
  } as const;
  
  export const META = {
    TITLE: 'YC Startup App',
    DESCRIPTION: 'Platform for startups to pitch their ideas to investors',
    KEYWORDS: ['startup', 'pitch', 'investors', 'YC'],
  } as const;
  
  export const UI = {
    TOAST_DURATION: 5000,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  } as const;