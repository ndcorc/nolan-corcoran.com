// src/lib/utils/scroll.ts
export const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
        window.location.hash = `#${id}`;
    }
};
