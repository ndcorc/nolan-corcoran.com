'use client';

import { useEffect, useState } from 'react';
import { AppShellMain } from '@mantine/core';
import HeroSection from './HeroSection';
import LatestPosts from './LatestPosts';
import ContactForm from './ContactForm';
import { Element } from 'react-scroll';
import BibleRefTagger from '../shared/BibleRefTagger';

export default function HomeContent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <AppShellMain className="p-0 pb-20">
            <Element name="" id="">
                <HeroSection />
            </Element>

            <Element name="about" id="about">
                <LatestPosts />
            </Element>

            <Element name="contact" id="contact">
                <ContactForm />
            </Element>
        </AppShellMain>
    );
}
