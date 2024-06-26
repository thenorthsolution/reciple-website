import path from 'path';

export function parseGuideId(file: string, options?: { parse?: boolean; removeInt?: boolean; }): string {
    const parsed = options?.parse !== false ? path.parse(file) : { name: file };
    if (options?.removeInt === false) return parsed.name;

    const name = parsed.name.split('.');
    return (isNaN(parseInt(name[0])) ? name : name.splice(1)).join('.');
}

export function parseGuideIndex(file: string, options?: { parse?: boolean; }): number {
    const parsed = options?.parse !== false ? path.parse(file) : { name: file };

    const name = parsed.name.split('.');
    return !isNaN(parseInt(name[0])) ? parseInt(name[0]) : 0;
}