/**
 * Canonical Father merges and title normalizations for patristic vocabulary cleanup.
 *
 * Keys are duplicate/malformed titles; values are the canonical Father title to keep.
 */
export const PATRISTIC_FATHER_MERGE_MAP: Record<string, string> = {
    // Citation strings accidentally stored as Father titles
    '- Desiderius Erasmus, Translated By Louis A. Perraud, Collected Works of Erasmus: Spiritualia And Pastoralia, Explanatio Symboli Apostolorum (1533), University of Toronto Press, Lbv 1173a / Asd V-1 278, Pg. 333, Link: Https://books.google.com/books?id=aa-9iteqn-mc&lpg=pa231&pg=pa333#v=onepage&q&f=true':
        'Desiderius Erasmus',
    '- Andrew Horne, the Mirror of Justices, London: B. Quaritch (1895), the Publications of the Selden Society: Volume Vii, Pg. 2-3, Link: Https://archive.org/details/mirrorofjustices00hornrich/page/2/mode/1up':
        'Andrew Horne',
    '- Bryennios List, Translated By Edmon Gallagher And John Meade, the Biblical Canon Lists From Early Christianity: Texts And Analysis, Oxford University Press (2017), Pg. 71-72.':
        'Bryennios List',

    // Known alias / duplicate Fathers
    'Origen of Alexandria': 'Origen',
    'Basil of Caesarea': 'Basil the Great',
    'Bede the Venerable': 'Bede',
    'Anselm of Canterbury': 'Anselm',
    'Robert Bellarmine': 'Bellarmine',
    Chrysostom: 'John Chrysostom',
    'Clemens Alexandrinus': 'Clement of Alexandria',
    'Fulgentius of Ruspe': 'Fulgentius',
    'Nazianzene (Gregory of Nazianzus)': 'Gregory of Nazianzus',
    'Nyssenus (Gregory of Nyssa)': 'Gregory of Nyssa',
    'Lombard (Peter Lombard)': 'Peter Lombard',
    Theodoret: 'Theodoret of Cyrus',
    'Theophylact of Ochrid': 'Theophylact',
    'Radulphus Flaviacensis': 'Radulphus',
    'Prosper of Aquitane': 'Prosper of Aquitaine',
    'Rabanus of Mainz': 'Rabanus Maurus',
    Theophilact: 'Theophylact',
    'Epistle of Barnabas': 'Barnabas'
};

/** Rename malformed titles without merging into another existing Father document. */
export const PATRISTIC_FATHER_TITLE_FIXES: Record<string, string> = {
    'Joseppus –': 'Joseph the Christian',
    '"on Canonical And Non-canonical Books"': 'On Canonical and Non-Canonical Books',
    '“on Canonical And Non-canonical Books”': 'On Canonical and Non-Canonical Books',
    "'the Sixty Books'": 'The Sixty Books',
    '‘the Sixty Books’': 'The Sixty Books'
};

export function isMalformedFatherTitle(title: string): boolean {
    const trimmed = title.trim();
    if (!trimmed) return true;

    return (
        trimmed.startsWith('- ') ||
        trimmed.includes('Link:') ||
        /\bTranslated By\b/i.test(trimmed) ||
        /^["'“‘].*["'”’]$/.test(trimmed) ||
        / –$/.test(trimmed)
    );
}

export function inferCanonicalFatherTitle(title: string): string | null {
    const trimmed = title.trim();
    if (!trimmed) return null;

    if (PATRISTIC_FATHER_MERGE_MAP[trimmed]) {
        return PATRISTIC_FATHER_MERGE_MAP[trimmed];
    }

    if (PATRISTIC_FATHER_TITLE_FIXES[trimmed]) {
        return PATRISTIC_FATHER_TITLE_FIXES[trimmed];
    }

    if (trimmed.startsWith('- ')) {
        const authorPart = trimmed.slice(2).split(',')[0]?.trim();
        if (authorPart) return authorPart;
    }

    return null;
}
