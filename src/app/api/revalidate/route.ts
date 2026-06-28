import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    let slug: string | undefined;
    try {
        const body = await request.json();
        slug = body?.slug?.current;
    } catch {
        // Webhook may send no body on delete; revalidate listing only.
    }

    revalidatePath('/apologetics/quotes');

    if (slug) {
        revalidatePath(`/apologetics/quotes/${slug}`);
    }

    return NextResponse.json({
        revalidated: true,
        paths: slug ? ['/apologetics/quotes', `/apologetics/quotes/${slug}`] : ['/apologetics/quotes']
    });
}
