import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// This is an admin client that requires a write token
const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Ensure token exists to prevent silent write failures
        if (!process.env.SANITY_API_TOKEN) {
            console.error("Missing SANITY_API_TOKEN. Cannot document orders.");
            return NextResponse.json(
                { message: 'Server configuration error (missing token)' },
                { status: 500 }
            );
        }

        const doc = {
            _type: 'order',
            ...body
        };

        const result = await client.create(doc);
        return NextResponse.json({ message: 'Order created successfully', orderId: result._id }, { status: 201 });

    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { message: 'Error creating order in Sanity' },
            { status: 500 }
        );
    }
}
