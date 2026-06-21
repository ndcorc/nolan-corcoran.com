import diagramsIndex from '@/data/apologetics/diagrams/index.json';
import argumentsIndex from '@/data/apologetics/arguments/index.json';
import type { DiagramMeta, ArgumentMeta } from '@/types/apologetics';

export interface ApologeticsNavLink {
    href: string;
    label: string;
    submenu?: ApologeticsNavLink[];
}

export function buildApologeticsSubmenu(): ApologeticsNavLink[] {
    const diagrams = diagramsIndex as DiagramMeta[];
    const args = argumentsIndex as ArgumentMeta[];

    return [
        { href: '/apologetics', label: 'Overview' },
        {
            href: '#',
            label: 'Diagrams',
            submenu: diagrams.map((diagram) => ({
                href: `/apologetics/diagrams/${diagram.id}`,
                label: diagram.title
            }))
        },
        {
            href: '#',
            label: 'Arguments',
            submenu: args.map((arg) => ({
                href: `/apologetics/arguments/${arg.id}`,
                label: arg.title
            }))
        },
        { href: '/apologetics/quotes', label: 'Quotes' },
        { href: '/apologetics/glossary', label: 'Glossary' }
    ];
}
