import { useState, useEffect, useRef, useCallback } from 'react';
import { playBeep } from '../utils/audio';

export function useTimer() {
  const [mode, setMode] = useState('countdown'); // 'countdown' | 'stopwatch'
  const [seconds, setSeconds] = useState(25 * 60);
  const [target, setTarget] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalStudy, setTotalStudy] = useState(0);
  const [justFinished, setJustFinished] = useState(false);

  const intervalRef = useRef(null);
  const studyRef = useRef(null);

  // Timer tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (mode === 'countdown') {
          if (prev <= 1) {
            setRunning(false);
            setSessions(s => s + 1);
            setJustFinished(true);
            playBeep();
            setTimeout(() => setJustFinished(false), 1500);
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  // Study time tracking
  useEffect(() => {
    if (!running) {
      if (studyRef.current) clearInterval(studyRef.current);
      return;
    }
    studyRef.current = setInterval(() => {
      setTotalStudy(prev => prev + 1);
    }, 1000);
    return () => clearInterval(studyRef.current);
  }, [running]);

  const start = useCallback(() => {
    if (running) return;
    if (mode === 'countdown' && seconds === 0) {
      setSeconds(target);
    }
    setRunning(true);
  }, [running, mode, seconds, target]);

  const pause = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    if (mode === 'stopwatch' && seconds > 60) {
      setSessions(s => s + 1);
    }
    setSeconds(mode === 'countdown' ? target : 0);
  }, [mode, target, seconds]);

  const setCountdown = useCallback((hours, minutes) => {
    let t = hours * 3600 + minutes * 60;
    if (t < 1) t = 60;
    setTarget(t);
    setSeconds(t);
  }, []);

  const switchMode = useCallback((newMode) => {
    setRunning(false);
    setMode(newMode);
    if (newMode === 'countdown') {
      setSeconds(target);
    } else {
      setSeconds(0);
    }
  }, [target]);

  return {
    mode, seconds, target, running, sessions, totalStudy, justFinished,
    start, pause, reset, setCountdown, switchMode
  };
}
