export default function StudioLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="h-[100dvh] overflow-hidden">{children}</div>;
}
