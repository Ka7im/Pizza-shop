import { useCallback, useRef } from 'react';

export function useDebounce(callback: Function, delay: number) {
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: unknown[]) => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }

            timerId.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedCallback;
}
