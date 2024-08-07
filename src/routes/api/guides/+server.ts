import path from 'path';
import { parseGuideId, parseGuideIndex } from '$lib/scripts/guideHelpers';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { slug } from 'github-slugger';

export type Guides = {
    id: string;
    index: number;
    category: string;
    folder: string;
    pages: {
        id: string;
        index: number;
        category: string;
        folder: string;
        file: string;
        pagination: {
            previous: { categoryId: string; pageId: string; }|null;
            next: { categoryId: string; pageId: string; }|null;
        };
        metadata: { title?: string; description?: string; keywords?: string[]; } & Record<string, any>;
    }[];
}[];

let cache: Guides = [];

export async function GET() {
    if (cache.length && !dev) return json(cache);

    let guides: Guides = [];

    const entries = Object.entries(import.meta.glob('/src/guides/*/*.svx'));
    const pages = await Promise.all(entries.map(async ([file, resolver]) => {
        const folder = path.basename(path.dirname(file));

        const page: Guides[0]['pages'][0] = {
            id: parseGuideId(file),
            index: parseGuideIndex(file),
            category: parseGuideId(folder, { parse: false, removeInt: true }),
            folder,
            file: parseGuideId(path.basename(file), { removeInt: false }),
            pagination: { previous: null, next: null },
            metadata: (await resolver().catch(() => ({})) as { metadata: Record<string, any> }).metadata
        };

        let categoryPages = guides.find(g => g.category === page.category);

        if (!categoryPages) {
            categoryPages = {
                id: slug(page.category),
                index: parseGuideIndex(folder),
                category: page.category,
                folder: page.folder,
                pages: []
            };

            guides.push(categoryPages);
        }

        categoryPages.pages.push(page);
        return page;
    }));

    guides = guides.sort((a, b) => a.index - b.index);

    for (const guide of guides) {
        guide.pages = guide.pages.sort((a, b) => a.index - b.index);
    }

    for (const guide of guides) {

        const categoryIndex = guides.findIndex(c => c.id === guide.id);
        const previousCategory = categoryIndex - 1 >= 0 ? guides[categoryIndex - 1] : null;
        const nextCategory = categoryIndex + 1 <= (guides.length - 1) ? guides[categoryIndex + 1] : null;

        for (const page of guide.pages) {
            const pageIndex = guide.pages.findIndex(c => c.id === page.id);

            const previousPage = (
                    pageIndex - 1 >= 0
                        ? guide.pages[pageIndex - 1]
                        : null
                ) ?? previousCategory?.pages[previousCategory.pages.length - 1] ?? null;

            const nextPage = (
                    pageIndex + 1 <= (guide.pages.length - 1)
                        ? guide.pages[pageIndex + 1]
                        : null
                ) ?? nextCategory?.pages[0] ?? null;

            page.pagination.previous = previousPage && { categoryId: slug(previousPage.category), pageId: previousPage.id };
            page.pagination.next = nextPage && { categoryId: slug(nextPage.category), pageId: nextPage.id };
        }
    }

    cache = guides;

    return json(guides);
}