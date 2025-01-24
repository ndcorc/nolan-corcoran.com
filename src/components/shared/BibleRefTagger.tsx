// src/components/shared/BibleRefTagger.tsx
'use client';

import { RefTagger } from 'react-reftagger';

const BibleRefTagger = () => {
    return <RefTagger bibleVersion="ESV" roundCorners={true} />;
};

export default BibleRefTagger;
