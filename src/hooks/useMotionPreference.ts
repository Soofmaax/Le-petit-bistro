import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion as framerUseReducedMotion } from 'framer-motion';

export function useMotionPreference(): boolean {
  const systemPrefersReduced = framerUseReducedMotion();
  const [userPref, setUserPref] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('motion'); // 'reduce' | 'auto'
    setUserPref(saved);
  }, []);

  const reduce = useMemo(() => {
    if (userPref === 'reduce') return true;
    return systemPrefersReduced;
  }, [userPref, systemPrefersReduced]);

  return reduce;
}