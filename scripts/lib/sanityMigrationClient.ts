/**
 * Shared Sanity client for migration / patch scripts.
 * Validates token ↔ project pairing before running writes.
 */
import fs from 'fs';
import path from 'path';
import { createClient, type SanityClient } from '@sanity/client';

export function loadSanityEnvFiles() {
    for (const filename of ['.env.local', '.env']) {
        const envPath = path.join(process.cwd(), filename);
        if (!fs.existsSync(envPath)) continue;

        const contents = fs.readFileSync(envPath, 'utf8');
        for (const line of contents.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex === -1) continue;
            const key = trimmed.slice(0, eqIndex).trim();
            let value = trimmed.slice(eqIndex + 1).trim();
            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }
            if (!(key in process.env)) {
                process.env[key] = value;
            }
        }
    }
}

export function getSanityMigrationConfig() {
    loadSanityEnvFiles();

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08';
    const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim();
    const fallbackToken = process.env.SANITY_API_TOKEN?.trim();
    const token = writeToken || fallbackToken;

    if (!projectId || !dataset) {
        throw new Error(
            'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local'
        );
    }

    if (!token) {
        throw new Error(
            [
                'Missing Sanity write token.',
                '',
                'Add a token with Editor permissions to .env.local:',
                `  SANITY_API_WRITE_TOKEN=<token>`,
                '',
                `Create one at: https://sanity.io/manage/project/${projectId}/api/tokens`,
                '',
                'Do not use a Studio browser session string — use an API token from Manage.'
            ].join('\n')
        );
    }

    if (!writeToken && fallbackToken) {
        console.warn(
            'Warning: SANITY_API_WRITE_TOKEN is unset; falling back to SANITY_API_TOKEN.\n' +
                'Prefer a dedicated write token: SANITY_API_WRITE_TOKEN=...\n'
        );
    }

    return { projectId, dataset, apiVersion, token, writeToken, fallbackToken };
}

export class SanityMigrationAuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SanityMigrationAuthError';
    }
}

export async function assertSanityMigrationAccess(client: SanityClient, projectId: string) {
    try {
        await client.fetch('count(*[_type == "patristicQuote"])');
    } catch (error: unknown) {
        const err = error as {
            response?: { body?: { errorCode?: string; message?: string } };
            message?: string;
        };
        const errorCode = err.response?.body?.errorCode;
        const message = err.response?.body?.message ?? err.message ?? 'Unknown error';

        if (errorCode === 'SIO-401-AWH' || message.includes('Session does not match project host')) {
            throw new SanityMigrationAuthError(
                [
                    'Sanity API token does not match NEXT_PUBLIC_SANITY_PROJECT_ID.',
                    '',
                    `  Project in .env.local: ${projectId}`,
                    `  Token variable used: ${process.env.SANITY_API_WRITE_TOKEN ? 'SANITY_API_WRITE_TOKEN' : 'SANITY_API_TOKEN'}`,
                    '',
                    'This usually means the token was created for a different Sanity project.',
                    '',
                    'Fix:',
                    `  1. Open https://sanity.io/manage/project/${projectId}/api/tokens`,
                    '  2. Create a token with Editor permissions (needed for migrations)',
                    '  3. Add to .env.local:',
                    '       SANITY_API_WRITE_TOKEN=sk...',
                    '  4. Re-run the command',
                    '',
                    'If you use multiple Sanity accounts, run `npx sanity logout` then',
                    '`npx sanity login` with the account that owns this project before',
                    'creating the token.',
                    '',
                    '(Reads via the public CDN may still work without a valid token;',
                    'migration scripts require an authenticated token for this project.)'
                ].join('\n')
            );
        }

        throw error;
    }
}

export async function createSanityMigrationClient(): Promise<SanityClient> {
    const { projectId, dataset, apiVersion, token } = getSanityMigrationConfig();

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false
    });

    await assertSanityMigrationAccess(client, projectId);
    return client;
}
