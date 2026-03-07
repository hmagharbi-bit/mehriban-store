import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

/**
 * Admin client for secure server-side write operations.
 * This client uses the SANITY_API_TOKEN and bypasses the CDN.
 * IMPORTANT: This should ONLY be imported and used in server-side code (actions, API routes).
 */
const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

// Server-side log to verify token loading (redacted for security in real logs, but shown here for user confirmation)
if (typeof window === 'undefined') {
    console.log("--- Sanity Admin Client Check ---");
    console.log("Token Found:", !!token ? "YES (Starts with " + token.substring(0, 4) + "...)" : "NO");
    console.log("---------------------------------");
}

export const adminClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token,
});
