export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04'

export const dataset = (() => {
    const val = process.env.NEXT_PUBLIC_SANITY_DATASET
    return (val ? val.replace(/['"\s]+/g, '') : '') || 'production'
})()

export const projectId = (() => {
    const val = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    return (val ? val.replace(/['"\s]+/g, '') : '') || '17ryprkd'
})()

export const useCdn = false