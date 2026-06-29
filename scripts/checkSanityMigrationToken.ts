/**
 * Verifies Sanity migration env + token access before running patch scripts.
 *
 *   yarn sanity:check-migration-token
 */
import {
    assertSanityMigrationAccess,
    getSanityMigrationConfig,
    loadSanityEnvFiles,
    SanityMigrationAuthError
} from './lib/sanityMigrationClient';
import { createClient } from '@sanity/client';

async function main() {
    loadSanityEnvFiles();

    const { projectId, dataset, apiVersion, token, writeToken, fallbackToken } =
        getSanityMigrationConfig();

    console.log('Sanity migration config');
    console.log(`  projectId: ${projectId}`);
    console.log(`  dataset:   ${dataset}`);
    console.log(`  apiVersion: ${apiVersion}`);
    console.log(`  write token: ${writeToken ? 'SANITY_API_WRITE_TOKEN (set)' : '(unset)'}`);
    console.log(
        `  fallback:  ${fallbackToken ? 'SANITY_API_TOKEN (set)' : '(unset)'}`
    );

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false
    });

    try {
        await assertSanityMigrationAccess(client, projectId);
        const count = await client.fetch<number>('count(*[_type == "patristicQuote"])');
        console.log(`\n✓ Token is valid for project ${projectId}`);
        console.log(`  patristicQuote documents: ${count}`);
    } catch (error) {
        if (error instanceof SanityMigrationAuthError) {
            console.error(`\n✗ ${error.message}`);
            process.exit(1);
        }
        throw error;
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
