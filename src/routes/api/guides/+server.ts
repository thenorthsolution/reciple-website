import { readdir } from 'fs/promises';
import path from 'path';
import { searchForWorkspaceRoot } from 'vite';
import { parseGuideId } from '$lib/scripts/guideHelpers';
import { json } from '@sveltejs/kit';

export type Guides = { category: string; pages: string[]; }[];

export async function GET() {
    const basename = path.join(searchForWorkspaceRoot(process.cwd()), './src/guides');
    const folders = await readdir(basename);

    return json(await Promise.all(folders.map(async f => ({
        category: f,
        pages: (await readdir(path.join(basename, f))).map(i => parseGuideId(i))
    }))));
}