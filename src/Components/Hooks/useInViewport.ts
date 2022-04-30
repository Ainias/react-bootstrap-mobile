import { MutableRefObject, useEffect, useState } from 'react';

export const useInViewport = (element: MutableRefObject<Element | null>, rootMargin = '0px') => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const savedElement = element.current;
        if (!savedElement) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            { rootMargin }
        );
        observer.observe(savedElement);
        return () => observer.unobserve(savedElement);
    }, [element, rootMargin]);

    return isVisible;
};
