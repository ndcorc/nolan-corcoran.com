// src/lib/utils/index.ts


type TextBlock = string | { props: { text: string } };

export const splitNumberAndText = (str: string) => {
    const regex = /^(\d+)\.\s*(.*)/;
    const match = str.match(regex);
    if (match) {
        return [Number(parseInt(match[1], 10)), match[2]];
    }
    return [null, str];
};

export function splitByLastDash(textArray: TextBlock[]): [TextBlock[], string] {
    let lastDashIndex = -1;
    let lastDashPos = -1;

    // Find the last occurrence of "—" and its exact position
    textArray.forEach((item, index) => {
        const text = typeof item === 'string' ? item : item.props?.text ?? '';
        const dashPos = text.lastIndexOf('—');
        
        if (dashPos !== -1) {
            lastDashIndex = index;
            lastDashPos = dashPos;
        }
    });

    // If no dash is found, return the original array as firstPart and an empty string as secondPart
    if (lastDashIndex === -1) {
        return [textArray, ''];
    }

    const firstPart = textArray.slice(0, lastDashIndex); // Copy elements before the last dash
    let secondPart = '';

    const lastTextBlock = textArray[lastDashIndex];
    const text = typeof lastTextBlock === 'string' ? lastTextBlock : lastTextBlock.props?.text ?? '';

    // Split at the last dash
    const beforeDash = text.slice(0, lastDashPos);
    const afterDash = text.slice(lastDashPos + 1).trim(); // Remove spaces after the dash

    // Only add `beforeDash` back to firstPart if it contains text
    if (beforeDash) {
        firstPart.push(
            typeof lastTextBlock === 'string'
                ? beforeDash
                : { ...lastTextBlock, props: { ...lastTextBlock.props, text: beforeDash } }
        );
    }

    // Build secondPart from everything after and including the last dash
    secondPart = afterDash + textArray.slice(lastDashIndex + 1).map(item =>
        typeof item === 'string' ? item : item.props?.text ?? ''
    ).join('');

    return [firstPart, secondPart];
}