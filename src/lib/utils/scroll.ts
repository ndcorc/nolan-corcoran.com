export const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        console.log('element', element);
        element.scrollIntoView({
            behavior: 'smooth'
        });
        window.location.hash = `#${id}`;
    }
};
