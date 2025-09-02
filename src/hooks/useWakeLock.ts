"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

export function useWakeLock() {
  const lockRef = useRef<any>(null);
  const [supported, setSupported] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setSupported(typeof navigator !== 'undefined' && 'wakeLock' in navigator);
    const onVis = () => {
      if (document.visibilityState === 'visible' && active) {
        request();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const request = useCallback(async () => {
    try {
      // @ts-ignore
      const wl = await (navigator as any).wakeLock?.request('screen');
      if (wl) {
        lockRef.current = wl;
        setActive(true);
        wl.addEventListener('release', () => setActive(false));
      } else {
        setActive(false);
      }
    } catch (e) {
      setActive(false);
    }
  }, []);

  const release = useCallback(async () => {
    try {
      await lockRef.current?.release?.();
    } catch {}
    lockRef.current = null;
    setActive(false);
  }, []);

  return { supported, active, request, release };
}

