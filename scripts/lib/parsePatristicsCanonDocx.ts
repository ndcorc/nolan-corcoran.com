import { execSync } from 'child_process';
import path from 'path';

export type TextSpan = { text: string; bold: boolean; italic: boolean };

export type ParsedCanonQuote = {
    fatherHeader: string;
    father: string;
    died: string;
    era: string;
    sourceWork: string;
    sourceRef: string;
    spans: TextSpan[];
    quoteMarkdown: string;
    quotePlain: string;
    notes: string;
};

const DOCX_PATH = path.join(process.cwd(), 'data/Patristics_on_the_Canon_formatted.docx');

const FATHER_ALIASES: Record<string, string> = {
    'augustinus hibernicus': 'Augustinus Hibernicus',
    'the irish augustine': 'Augustinus Hibernicus',
    'basil the great': 'Basil the Great',
    'basil of caesarea': 'Basil the Great',
    'bryennios list': 'Bryennios List',
    'cyril of jerusalem': 'Cyril of Jerusalem',
    'dialogue between timothy the christian and aquila the jew': 'Dialogue of Timothy and Aquila',
    'gregory of nazianzus': 'Gregory of Nazianzus',
    'gregory the great': 'Gregory the Great',
    'epiphanius of salamis': 'Epiphanius',
    'epiphanius of constantia': 'Epiphanius',
    'hilary of poitiers': 'Hilary of Poitiers',
    'james of edessa': 'James of Edessa',
    'jerome of stridon': 'Jerome',
    'john of damascus': 'John of Damascus',
    'athanaasius of alexandria': 'Athanasius',
    'athanasius of alexandria': 'Athanasius',
    'st. athanasius': 'Athanasius',
    'apostolic canons': 'Apostolic Canons',
    'amphilochius of iconium': 'Amphilochius of Iconium',
    'primasius of hadrumetum': 'Primasius',
    'cardinal cajetan': 'Cardinal Cajetan',
    'cardinal caietan': 'Cardinal Cajetan',
    'cardinal francisco ximénes': 'Cardinal Ximenes',
    'cardinal jiménez': 'Cardinal Ximenes',
    'desiderius erasmus': 'Desiderius Erasmus',
    'erasmus of rotterdam': 'Desiderius Erasmus',
    'jacobus faber stapulensis': 'Jacques Lefèvre d\'Étaples',
    'jacques lefèvre d\'étaples': 'Jacques Lefèvre d\'Étaples',
    'jean driedo': 'Jean Driedo',
    'johannes driedo': 'Jean Driedo',
    'john ferus': 'John Ferus',
    'johann wild': 'John Ferus',
    'sanctes pagnini': 'Sanctes Pagnini',
    'santes pagnino': 'Sanctes Pagnini',
    'johannes petreius': 'Johannes Petreius',
    'thomas waldensis': 'Thomas Waldensis',
    'thomas netter': 'Thomas Waldensis',
    'william of ockham': 'William of Ockham',
    'guillelmus de occam': 'William of Ockham',
    'banylonian talmud': 'Babylonian Talmud',
    'babylonian talmud': 'Babylonian Talmud',
    'flavius josephus': 'Josephus',
    'josephus': 'Josephus',
    'haymo of halberstadt': 'Haymo of Halberstadt',
    'alonso tostado': 'Alonso Tostado',
    'nicolas of lyra': 'Nicolas of Lyra',
    'hugh of st. victor': 'Hugh of St. Victor',
    'stichometry of nicephorus': 'Nicephorus of Constantinople',
    'patriarch nikephoros i of constantinople': 'Nicephorus of Constantinople',
    'the sixty books': 'The Sixty Books',
    'melito of sardis': 'Melito of Sardis',
    'origen': 'Origen',
    'eusebius of caesarea': 'Eusebius of Caesarea',
    'rufinus': 'Rufinus',
    'bede': 'Bede',
    'john chrysostom': 'John Chrysostom',
    'augustine of hippo': 'Augustine',
    'council of laodicea': 'Council of Laodicea',
    'council of carthage': 'Council of Carthage',
    'council of hippo': 'Council of Hippo',
    'council of florence': 'Council of Florence',
    'council of trent': 'Council of Trent',
    'alexander of alexandria': 'Alexander of Alexandria',
    'ambrose of milan': 'Ambrose',
    'ambrosiaster': 'Ambrosiaster',
    'amphilochius of iconium': 'Amphilochius of Iconium',
    'caesarius of arles': 'Caesarius of Arles',
    'cyril of alexandria': 'Cyril of Alexandria',
    'cyril of jerusalem': 'Cyril of Jerusalem',
    'didymus the blind': 'Didymus the Blind',
    'fulgentius of ruspe': 'Fulgentius of Ruspe',
    'gennadius of massilia': 'Gennadius of Massilia',
    'gregory of nyssa': 'Gregory of Nyssa',
    'hilarion the hermit': 'Hilarion the Hermit',
    'hippolytus of rome': 'Hippolytus of Rome',
    'irenaeus of lyons': 'Irenaeus',
    'isidore of pelusium': 'Isidore of Pelusium',
    'john cassian': 'John Cassian',
    'leo the great': 'Leo the Great',
    'methodius of olympus': 'Methodius of Olympus',
    'pacian of barcelona': 'Pacian',
    'proclus of constantinople': 'Proclus of Constantinople',
    'theodore of mopsuestia': 'Theodore of Mopsuestia',
    'theodoret of cyrus': 'Theodoret of Cyrus',
    'pope leo the great': 'Leo the Great'
};

function decodeXml(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function runFormatFromPr(prXml: string): { bold: boolean; italic: boolean } {
    return {
        bold: /<w:b(?:\s|\/|>)/.test(prXml) && !/<w:b w:val="0"/.test(prXml),
        italic: /<w:i(?:\s|\/|>)/.test(prXml) && !/<w:i w:val="0"/.test(prXml)
    };
}

function paragraphSpans(pXml: string): TextSpan[] {
    const spans: TextSpan[] = [];
    const runs = [...pXml.matchAll(/<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g)];

    for (const [, runInner] of runs) {
        if (/<w:hyperlink/.test(runInner)) continue;

        const prMatch = runInner.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/);
        const fmt = runFormatFromPr(prMatch?.[1] ?? '');
        const texts = [...runInner.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) =>
            decodeXml(m[1])
        );
        const chunk = texts.join('');
        if (!chunk) continue;
        spans.push({ text: chunk, bold: fmt.bold, italic: fmt.italic });
    }

    return spans;
}

function mergeSpans(spans: TextSpan[]): TextSpan[] {
    const merged: TextSpan[] = [];
    for (const span of spans) {
        const prev = merged[merged.length - 1];
        if (
            prev &&
            prev.bold === span.bold &&
            prev.italic === span.italic
        ) {
            prev.text += span.text;
        } else {
            merged.push({ ...span });
        }
    }
    return merged;
}

function spansToMarkdown(spans: TextSpan[]): string {
    const merged = mergeSpans(spans);
    let out = '';
    let openEm = false;
    let openStrong = false;

    const closeStrong = () => {
        if (openStrong) {
            out += '**';
            openStrong = false;
        }
    };
    const closeEm = () => {
        if (openEm) {
            out += '*';
            openEm = false;
        }
    };
    const setMarks = (wantEm: boolean, wantStrong: boolean) => {
        if (openStrong && !wantStrong) closeStrong();
        if (openEm && !wantEm) closeEm();
        if (!openStrong && wantStrong) {
            out += '**';
            openStrong = true;
        }
        if (!openEm && wantEm) {
            out += '*';
            openEm = true;
        }
    };

    for (const span of merged) {
        setMarks(span.italic, span.bold);
        out += span.text;
    }

    closeStrong();
    closeEm();

    return out.replace(/\s+/g, ' ').trim();
}

function spansToPlain(spans: TextSpan[]): string {
    return mergeSpans(spans)
        .map(({ text }) => text)
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
}

function isCitationLine(plain: string): boolean {
    return plain.startsWith('- ');
}

function isFatherHeader(pXml: string, plain: string): boolean {
    if (!plain) return false;
    if (isCitationLine(plain)) return false;
    if (/^bonus:/i.test(plain)) return false;
    if (/^quotes & testimonies/i.test(plain)) return false;

    const pr = pXml.match(/<w:pPr>([\s\S]*?)<\/w:pPr>/);
    const pPr = pr?.[1] ?? '';
    const boldInPPr = /<w:b(?:\s|\/|>)/.test(pPr) && !/<w:b w:val="0"/.test(pPr);
    const runs = [...pXml.matchAll(/<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g)];
    const allBold =
        runs.length > 0 &&
        runs.every(([, inner]) => {
            const prMatch = inner.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/);
            return runFormatFromPr(prMatch?.[1] ?? '').bold;
        });

    if (!boldInPPr && !allBold) return false;
    return /\(\s*(?:c\.\s*)?\d/.test(plain) || /CENTURY/i.test(plain);
}

function isSectionDivider(plain: string): boolean {
    return (
        /^bonus:/i.test(plain) ||
        /^quotes & testimonies/i.test(plain) ||
        /^- desiderius erasmus/i.test(plain) ||
        /^- bryennios list/i.test(plain)
    );
}

function stripQuoteWrappers(text: string): string {
    return text.replace(/^[\s“"']+|[\s”"']+$/g, '').trim();
}

function parseFatherHeader(header: string): { father: string; died: string; era: string } {
    const cleaned = header
        .replace(/\s*-\s*A\.K\.A:.*$/i, '')
        .replace(/\s*-\s*A\.K\.A\.\s*.*$/i, '')
        .trim();

    const dateMatch = cleaned.match(/\(([^)]+)\)\s*$/);
    const died = dateMatch?.[1]?.replace(/^c\.\s*/i, 'c.').trim() ?? '';
    const namePart = cleaned.replace(/\([^)]+\)\s*$/, '').trim();

    const normalized = namePart.toLowerCase();
    const father =
        FATHER_ALIASES[normalized] ??
        namePart
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ')
            .replace(/\bOf\b/g, 'of')
            .replace(/\bThe\b/g, 'the')
            .replace(/^The /, 'The ')
            .replace(/\bA\.k\.a\b.*$/i, '')
            .trim();

    const era = inferEra(died, father);
    return { father, died, era };
}

function inferEra(died: string, father: string): string {
    const nums = died.match(/\d+/g)?.map(Number) ?? [];
    const year = nums.length ? Math.max(...nums) : 0;

    if (/talmud|josephus|bryennios|melito/i.test(father) || (year > 0 && year < 200)) {
        if (/talmud|josephus|bryennios/i.test(father)) return 'Apostolic Father';
        return year < 200 ? 'Apostolic Father' : 'Greek Patristic';
    }
    if (year >= 1500) return 'Post-Tridentine';
    if (year >= 1100) return 'Medieval';
    if (/latin|augustine|ambrose|jerome|hilary|gregory the great|primasius|rufinus|bede|haymo|tostado|ockham|caesarius|leo the great|pacian|fulgentius|prosper|isidore of seville/i.test(
        father
    )) {
        return 'Latin Patristic';
    }
    return 'Greek Patristic';
}

function parseCitation(citation: string): { sourceWork: string; sourceRef: string; notes: string } {
    let text = citation.trim();
    text = text.replace(/\s*,?\s*link:\s*.*$/i, '').trim();
    text = text.replace(/\s*,?\s*https?:\/\/\S+.*$/i, '').trim();

    if (text.startsWith('- ')) text = text.slice(2).trim();

    // Drop leading saint author when followed by a work title (e.g. "St. Ambrose, De Fide, 3").
    const saintAuthor = text.match(/^(?:St\.|Saint)\s+[^,]+,\s*(.+)$/i);
    const body = saintAuthor?.[1]?.trim() ?? text;

    const parts = body.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
        return {
            sourceWork: parts.slice(0, -1).join(', '),
            sourceRef: parts[parts.length - 1],
            notes: ''
        };
    }

    return { sourceWork: body || text, sourceRef: '', notes: '' };
}

function extractPrefatoryNote(spans: TextSpan[]): { bodySpans: TextSpan[]; note: string } {
    const merged = mergeSpans(spans);
    if (merged.length === 0) return { bodySpans: spans, note: '' };

    const first = merged[0];
    const firstPlain = first.text.trim();
    const isLabel =
        first.italic &&
        !first.bold &&
        (firstPlain.length < 120 ||
            /^Canon \d+/i.test(firstPlain) ||
            /^\[/.test(firstPlain) ||
            /^Names of the books/i.test(firstPlain));

    if (!isLabel) return { bodySpans: spans, note: '' };

    const rest = spans.slice(1);
    return {
        bodySpans: rest.length ? rest : spans,
        note: stripQuoteWrappers(firstPlain)
    };
}

export function parsePatristicsCanonDocx(docxPath = DOCX_PATH): ParsedCanonQuote[] {
    const xml = execSync(`unzip -p "${docxPath}" word/document.xml`, { encoding: 'utf8' });
    const paragraphs = [...xml.matchAll(/<w:p[\s>][\s\S]*?<\/w:p>/g)].map((m) => m[0]);

    const results: ParsedCanonQuote[] = [];
    let currentHeader = '';
    let quoteParagraphs: TextSpan[][] = [];
    let pendingNotes: string[] = [];

    function flushQuote(citationRaw: string) {
        if (!quoteParagraphs.length || !currentHeader) {
            quoteParagraphs = [];
            pendingNotes = [];
            return;
        }

        const allSpans = quoteParagraphs.flat();
        const { bodySpans, note: prefatoryNote } = extractPrefatoryNote(allSpans);
        const { father, died, era } = parseFatherHeader(currentHeader);
        const { sourceWork, sourceRef, notes: citationNotes } = parseCitation(citationRaw);

        const notes = [prefatoryNote, ...pendingNotes, citationNotes].filter(Boolean).join(' ');

        const quoteMarkdown = stripQuoteWrappers(spansToMarkdown(bodySpans));
        const quotePlain = stripQuoteWrappers(spansToPlain(bodySpans));

        if (quotePlain.length < 20) {
            quoteParagraphs = [];
            pendingNotes = [];
            return;
        }

        results.push({
            fatherHeader: currentHeader,
            father,
            died,
            era,
            sourceWork,
            sourceRef,
            spans: mergeSpans(bodySpans),
            quoteMarkdown,
            quotePlain,
            notes
        });

        quoteParagraphs = [];
        pendingNotes = [];
    }

    for (const p of paragraphs) {
        const spans = paragraphSpans(p);
        const plain = spansToPlain(spans);
        if (!plain) continue;

        if (isSectionDivider(plain)) continue;

        if (isCitationLine(plain)) {
            flushQuote(plain);
            continue;
        }

        if (isFatherHeader(p, plain)) {
            flushQuote('');
            currentHeader = plain;
            continue;
        }

        // Continuation paragraphs (e.g. Talmud Gemara) attach to open quote block.
        if (quoteParagraphs.length > 0) {
            quoteParagraphs.push(spans);
            continue;
        }

        const opensQuote =
            /^[\s“"«''„]/.test(plain) || /^Canon \d+/i.test(plain) || /^['"]/.test(plain);
        if (opensQuote && currentHeader) {
            quoteParagraphs = [spans];
        }
    }

    flushQuote('');
    return results;
}

export function normalizeQuoteText(value: string): string {
    return value
        .toLowerCase()
        .replace(/\*\*/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function inferAtonementSubtopics(plain: string): string[] {
    const subtopics = ['Atonement'];
    const lower = plain.toLowerCase();

    const penalSignals =
        /\bmade (?:to be )?sin\b|\bsin for us\b|\bcurse\b|\bbore (?:our )?sin|\bbearing sin|\bsubstitut|\bpenal|\bpunish|\bchastis|\bscourg|\bwrath\b|\bcondemn|\bguilt\b|\boffering for sin|\bsacrifice for sin|\bpropiti|\blamb without blemish|\bwithout spot\b/.test(
            lower
        );
    const redemptionSignals =
        /\bredeem|\bredemption|\bransom|\bbought with|\bprice\b|\bdeliver(?:ed|ance)?\b|\bset (?:them )?free\b|\bpurchased\b/.test(
            lower
        );
    const worksSignals =
        /\bmediator|\bpriest(?:hood|ly)?\b|\bhigh priest|\bincarnat|\bobedien|\binterced|\bmediatorial|\bpassion of (?:the )?lord|\bworks? of christ|\bsuffered for\b|\bdied for\b|\bcross\b|\bcrucif|\bblood of christ|\bshed (?:his )?blood\b/.test(
            lower
        );

    if (penalSignals) subtopics.push('Penal Substitutionary Atonement');
    if (redemptionSignals) subtopics.push('Redemption');
    if (worksSignals) subtopics.push('Works of Christ');

    return [...new Set(subtopics)];
}

export function inferCanonSubtopics(plain: string): string[] {
    const subtopics = ['Biblical Canon'];
    const lower = plain.toLowerCase();

    const otSignals =
        /\bold testament\b|\bhebrew\b|\bpentateuch\b|\bgenesis\b|\bprophets\b|\bhagiographa\b|\bdeuterocanon|\bapocryph|\bjudith\b|\btobit\b|\bmaccabee|\besdras\b|\bparalipomena\b|\bchronicles\b/.test(
            lower
        );
    const ntSignals =
        /\bnew testament\b|\bgospel|\bevangelist|\bacts of the apostles\b|\bepistle|\bapocalypse\b|\brevelation of john\b|\bpaul\b|\bjames\b|\bjude\b|\bhebrews\b/.test(
            lower
        );

    if (otSignals) subtopics.push('Old Testament Canon');
    if (ntSignals) subtopics.push('New Testament Canon');

    return [...new Set(subtopics)];
}
