import { error } from '@sveltejs/kit';
import type { Guides } from '../../api/guides/+server.js';

export async function load(data) {
    let [category, id] = data.params.id.split('/') as (string|undefined)[];

    const guides = await (await data.fetch('/api/guides')).json() as Guides;

    if (!category || !id) {
        category ??= guides[0].id;
        id ??= guides.find(c => c.id === category)?.pages[0].id;
    }

    const page = category && id ? guides.find(c => c.id === category)?.pages.find(p => p.id === id) : undefined;
    if (!page) return error(404);

    const markdown = await import(`../../../guides/${page.folder}/${page.file}.svx`);

    return {
        category,
        categoryName: page.category,
        id: page.id,
        file: category + '/' + id + '.svx',
        metadata: markdown.metadata ?? { title: id },
        content: markdown.default,
        pagination: page.pagination
    };
}