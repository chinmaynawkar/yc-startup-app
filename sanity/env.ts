import { SANITY } from '@/constants'

export const apiVersion = SANITY.API_VERSION

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const writeToken = (() => {
  const token = process.env.SANITY_WRITE_TOKEN;
  console.log('Token value during initialization:', token);
  
  if (!token) {
    console.warn('Write token not found during initial load, retrying...');
    return process.env.SANITY_WRITE_TOKEN;
  }
  
  return token;
})();

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
