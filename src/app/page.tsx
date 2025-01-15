import HomeContent from '@/components/home/HomeContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home',
    description: 'Theology, Culture, and Cloud Engineering',
    openGraph: {
        title: 'Every Thought Captive',
        description: 'Theology, Culture, and Cloud Engineering',
        url: 'https://nolan-corcoran.com',
        siteName: 'Every Thought Captive',
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Every Thought Captive',
        description: 'Theology, Culture, and Cloud Engineering'
    }
};

export default function Home() {
    return <HomeContent />;
}
