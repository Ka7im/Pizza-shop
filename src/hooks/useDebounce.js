import { useCallback, useRef } from 'react';

export function useDebounce(callback, delay) {
    const timerId = useRef(null);

    const debouncedCallback = useCallback(
        (...args) => {
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
