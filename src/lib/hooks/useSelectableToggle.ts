import { useCallback, useRef } from 'react';

const DRAG_THRESHOLD_PX = 4;

/** Fires onToggle for clicks, but not when the user dragged to select text. */
export function useSelectableToggle(onToggle: () => void) {
    const pointerDown = useRef<{ x: number; y: number } | null>(null);

    const onMouseDown = useCallback((event: React.MouseEvent) => {
        pointerDown.current = { x: event.clientX, y: event.clientY };
    }, []);

    const onMouseUp = useCallback(
        (event: React.MouseEvent) => {
            const start = pointerDown.current;
            pointerDown.current = null;
            if (!start) return;

            const moved =
                Math.hypot(event.clientX - start.x, event.clientY - start.y) > DRAG_THRESHOLD_PX;
            if (moved) return;

            if (window.getSelection()?.toString()) return;

            onToggle();
        },
        [onToggle]
    );

    const stopToggle = useCallback((event: React.MouseEvent) => {
        pointerDown.current = null;
        event.stopPropagation();
    }, []);

    return { onMouseDown, onMouseUp, stopToggle };
}
