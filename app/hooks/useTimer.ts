import { useCallback, useEffect, useRef, useState } from "react";

type UseTimerOptions = {
    onComplete?: () => void;
    autoStart?: boolean;
};

type UseTimerReturn = {
    secondsLeft: number;
    formatted: string;
    isRunning: boolean;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: (autoStart?: boolean) => void;
};

const formatSeconds = (totalSeconds: number): string => {
    const clamped = Math.max(0, Math.floor(totalSeconds));

    const minutes = Math.floor(clamped / 60);
    const seconds = clamped % 60;

    const m = minutes.toString().padStart(2, "0");
    const s = seconds.toString().padStart(2, "0");

    return `${m}:${s}`;
};

export function useTimer(
    totalSeconds: number,
    options: UseTimerOptions = {},
): UseTimerReturn {
    const { onComplete, autoStart = false } = options;

    const [secondsLeft, setSecondsLeft] = useState<number>(
        Math.max(0, Math.floor(totalSeconds)),
    );
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const endTimeRef = useRef<number | null>(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const clearTimerInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startTimer = useCallback(
        (overrideSeconds?: number) => {
            const duration = overrideSeconds ?? totalSeconds;
            if (duration <= 0) return;

            clearTimerInterval();

            const end = Date.now() + duration * 1000;
            endTimeRef.current = end;

            setSecondsLeft(Math.floor(duration));
            setIsRunning(true);

            intervalRef.current = setInterval(() => {
                const now = Date.now();
                const msLeft = endTimeRef.current! - now;

                if (msLeft <= 0) {
                    setSecondsLeft(0);

                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    endTimeRef.current = null;

                    setIsRunning(false);
                    onCompleteRef.current?.();

                    return;
                }

                const next = Math.ceil(msLeft / 1000);
                setSecondsLeft(next);
            }, 500);
        },
        [totalSeconds, clearTimerInterval],
    );

    const pauseTimer = useCallback(() => {
        clearTimerInterval();
        endTimeRef.current = null;
        setIsRunning(false);
    }, [clearTimerInterval]);

    const resetTimer = useCallback(
        (shouldAutoStart?: boolean) => {
            clearTimerInterval();
            endTimeRef.current = null;
            setIsRunning(false);
            setSecondsLeft(Math.max(0, Math.floor(totalSeconds)));

            if (shouldAutoStart) {
                setTimeout(() => {
                    startTimer(totalSeconds);
                }, 50);
            }
        },
        [totalSeconds, clearTimerInterval, startTimer],
    );

    useEffect(() => {
        if (autoStart) {
            startTimer(totalSeconds);
        }
        return () => clearTimerInterval();
    }, []);

    return {
        secondsLeft,
        formatted: formatSeconds(secondsLeft),
        isRunning,
        startTimer: () => startTimer(totalSeconds),
        pauseTimer,
        resetTimer,
    };
}
