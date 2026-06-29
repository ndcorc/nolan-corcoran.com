/** Church fathers and texts classified under the Apostolic Father era. */
export const APOSTOLIC_FATHER_AUTHORS = new Set([
    'Clement of Rome',
    'Ignatius of Antioch',
    'Polycarp of Smyrna',
    'Papias of Hierapolis',
    'The Didache',
    'The Shepherd of Hermas'
]);

export function resolvePatristicEra(father: string, era: string): string {
    return APOSTOLIC_FATHER_AUTHORS.has(father.trim()) ? 'Apostolic Father' : era.trim();
}
