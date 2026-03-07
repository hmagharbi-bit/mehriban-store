export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04'

export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').toLowerCase()

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '17ryprkd'

export const useCdn = false