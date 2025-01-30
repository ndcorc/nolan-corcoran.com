// src/components/home/HomeContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { AppShellMain } from '@mantine/core';
import HeroSection from './HeroSection';
import LatestPosts from './LatestPosts';
import ContactForm from './ContactForm';
import { Element } from 'react-scroll';
import Loading from '../shared/Loading';
import AboutSection from './AboutSection';

export default function HomeContent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loading />;
    }

    return (
        <AppShellMain className="p-0">
            <Element name="" id="">
                <HeroSection />
            </Element>

            <Element name="about" id="about">
                <AboutSection />
                <LatestPosts />
            </Element>

            <Element name="contact" id="contact">
                <ContactForm />
            </Element>
        </AppShellMain>
    );
}
