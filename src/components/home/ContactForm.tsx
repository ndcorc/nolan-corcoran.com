// src/components/home/ContactForm.tsx
'use client';

import { useState } from 'react';
import {
    Container,
    Title,
    TextInput,
    Textarea,
    Button,
    Group,
    Paper,
    Text,
    Stack,
    BackgroundImage,
    useMantineColorScheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconMail, IconPhone, IconMapPin, IconClock } from '@tabler/icons-react';

interface FormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const INFO_ITEMS = [
    { icon: IconMail, label: 'Email', value: 'nd.corc@gmail.com' },
    { icon: IconPhone, label: 'Phone', value: '+1 (737) 757-6362' },
    { icon: IconMapPin, label: 'Address', value: `Georgetown, TX 78626` },
    { icon: IconClock, label: 'Working hours', value: '9 AM – 5 PM (CST)' }
];

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 characters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            subject: (value) => (value.length < 2 ? 'Subject must have at least 2 characters' : null),
            message: (value) => (value.length < 10 ? 'Message must have at least 10 characters' : null)
        }
    });

    const handleSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Show success notification
            notifications.show({
                title: 'Message Sent',
                message: 'Thank you for your message. I will get back to you soon.',
                classNames: {
                    root: 'bg-green-filled before:bg-[#FFF] text-[#FFF] font-bold',
                    description: 'text-[#FFF]',
                    title: 'text-[#FFF]',
                    closeButton: 'text-[#FFF] hover:bg-black/10'
                }
            });

            form.reset();
        } catch (error) {
            console.log('error', error);
            // Show error notification
            notifications.show({
                title: 'Error',
                message: 'Failed to send message. Please try again.',
                classNames: {
                    root: 'bg-red before:bg-[#FFF]',
                    description: 'text-[#FFF]',
                    title: 'text-[#FFF]',
                    closeButton: 'text-[#FFF] hover:bg-black/10'
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="md:py-40 py-8">
            <Container size="lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-stone-50 dark:bg-dark-600 z-10 rounded-xl shadow-z dark:shadow-dark-z">
                    {/* Contact Information */}
                    <BackgroundImage
                        src={isDark ? '/img/gradient-dark.png' : '/img/gradient.png'}
                        className="rounded-xl">
                        <Paper withBorder p="xl" className="bg-transparent text-[#FFF] rounded-xl h-full">
                            <Title order={2} size="h3" className="mb-6 text-[#FFF] font-bold">
                                Contact information
                            </Title>

                            <Stack gap="lg" className="text-[#FFF]">
                                {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                                    <Group key={label} wrap="nowrap">
                                        <Icon className="w-[20px] min-w-[20x] flex-shrink-0" />
                                        <Stack gap="0">
                                            <Text className="text-sm text-[#FFF]/80">{label}</Text>
                                            <Text className="text-xl leading-tight">{value}</Text>
                                        </Stack>
                                    </Group>
                                ))}
                            </Stack>
                        </Paper>
                    </BackgroundImage>

                    {/* Contact Form */}
                    <form onSubmit={form.onSubmit(handleSubmit)} className="md:col-span-2">
                        <Paper
                            withBorder
                            radius="md"
                            p="xl"
                            className="bg-transparent border-l-0 border-t-0 rounded-r-xl rounded-l-none border-none">
                            <Title order={2} size="h2" mb="lg" className="font-bold md:text-4xl text-4xl">
                                Get in touch
                            </Title>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <TextInput
                                    label="Your name"
                                    placeholder="Your name"
                                    required
                                    {...form.getInputProps('name')}
                                />

                                <TextInput
                                    label="Your email"
                                    placeholder="hello@example.com"
                                    required
                                    {...form.getInputProps('email')}
                                />
                            </div>

                            <TextInput
                                label="Subject"
                                placeholder="Subject"
                                required
                                className="mb-6"
                                {...form.getInputProps('subject')}
                            />

                            <Textarea
                                label="Your message"
                                placeholder="Please include all relevant information"
                                minRows={4}
                                required
                                className="mb-6"
                                {...form.getInputProps('message')}
                            />

                            <Button type="submit" size="md" loading={isSubmitting}>
                                Send message
                            </Button>
                        </Paper>
                    </form>
                </div>
            </Container>
        </section>
    );
}
