import { useEffect } from "react";
import FormatCountdown from "../helpers/FormatCountdown";

const useCountdown = (
  countDown,
  onCountDownChanged,
  startTime,
  countdownState,
  timeItems,
  onIsMusicPlayingChanged
) => {
  const shouldPlayMusic = timeItems.some((item) => item.time === countDown);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownState === "countdowning") {
        onCountDownChanged((countDown) => countDown - 1000);
      }
    }, 1000);
    if (countdownState === "pause" || countdownState === "waitStart") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countdownState]);

  useEffect(() => {
    if (countdownState === "waitStart") {
      onCountDownChanged(startTime);
    }
  }, [countdownState, startTime]);

  useEffect(() => {
    if (countdownState === "countdowning" && shouldPlayMusic) {
      onIsMusicPlayingChanged(true);
    }
  }, [shouldPlayMusic, countdownState]);

  useEffect(() => {
    if (countdownState === "countdowning" && countDown === 0)
      onIsMusicPlayingChanged(true);
  }, [countDown, countdownState]);

  return FormatCountdown(countDown);
};

export default useCountdown;
