interface QuotesIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export default function QuotesIcon({ size = 24, color = 'bg-black', className }: QuotesIconProps) {
    return (
        <div
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size + 8, // 8px padding on each side
                height: size + 8,
                padding: '4px',
                borderRadius: '50%'
            }}>
            <div
                className={color}
                style={{
                    position: 'relative',
                    width: size,
                    height: size,
                    display: 'inline-block',
                    WebkitMaskImage: `url(/img/quotesMark.png)`,
                    maskImage: `url(/img/quotesMark.png)`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center'
                }}
            />
        </div>
    );
}
