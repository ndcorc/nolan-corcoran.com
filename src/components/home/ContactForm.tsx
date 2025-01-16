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
import { IconMail, IconPhone, IconMapPin, IconClock } from '@tabler/icons-react';

interface FormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

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
            name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 characters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            subject: (value) => (value.trim().length < 2 ? 'Subject must have at least 2 characters' : null),
            message: (value) => (value.trim().length < 10 ? 'Message must have at least 10 characters' : null)
        }
    });

    const handleSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="xl:py-40 py-8">
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
                                <Group>
                                    <IconMail size={24} />
                                    <Stack gap="0">
                                        <Text className="text-sm">Email</Text>
                                        <Text className="text-xl">nd.corc@gmail.com</Text>
                                    </Stack>
                                </Group>

                                <Group>
                                    <IconPhone size={24} />
                                    <Stack gap="0">
                                        <Text className="text-sm">Phone</Text>
                                        <Text className="text-xl">+1 (737) 757-6362</Text>
                                    </Stack>
                                </Group>

                                <Group wrap="nowrap">
                                    <IconMapPin size={24} />
                                    <Stack gap="0">
                                        <Text className="text-sm">Address</Text>
                                        <Text className="text-xl">Georgetown, TX 78626</Text>
                                    </Stack>
                                </Group>

                                <Group>
                                    <IconClock size={24} />
                                    <Stack gap="0">
                                        <Text className="text-sm">Working Hours</Text>
                                        <Text className="text-xl">9 A.M. – 5 P.M. (CST)</Text>
                                    </Stack>
                                </Group>
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
                            <Title order={2} size="h2" mb="lg" className="font-bold xl:text-4xl text-4xl">
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
