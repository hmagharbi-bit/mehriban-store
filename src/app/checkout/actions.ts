'use server';

import { adminClient } from '@/sanity/lib/adminClient';

export async function submitOrderAction(orderData: any) {
    try {
        const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

        if (!token) {
            console.error("CRITICAL: SANITY_API_TOKEN is missing in environment variables.");
            return {
                success: false,
                error: 'MISSING_TOKEN',
                message: 'Configuration Error: SANITY_API_TOKEN is not defined in .env.local'
            };
        }

        // Use the dedicated admin client for write operations
        const result = await adminClient.create(orderData);
        return { success: true, orderId: result._id };
    } catch (error: any) {
        console.error("Sanity Write Error:", error);

        // Check for specific permission errors
        if (error.status === 403 || error.message?.includes('Insufficient permissions')) {
            return {
                success: false,
                error: 'INVALID_TOKEN',
                message: 'Permission Error: The SANITY_API_TOKEN does not have Write permissions.'
            };
        }

        return {
            success: false,
            error: 'UNKNOWN_ERROR',
            message: error.message || 'An unexpected error occurred while saving the order.'
        };
    }
}
