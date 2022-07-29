import { useEffect, useState } from "react";

const useCountdown = (startTime, isStartCountdown, ispauseCountdown) => {
  const [countDown, setCountDown] = useState(startTime);
  let interval;

  useEffect(() => {
    if (!isStartCountdown && startTime > 0 && ispauseCountdown) {
      clearInterval(interval);
    } else if (!isStartCountdown && startTime > 0) {
      clearInterval(interval);
      setCountDown(startTime);
    }
  }, [isStartCountdown, ispauseCountdown]);

  useEffect(() => {
    interval = setInterval(() => {
      if (isStartCountdown && startTime > 0 && !ispauseCountdown) {
        setCountDown((startTime) => {
          return startTime - 1000;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isStartCountdown]);

  return getReturnValues(countDown);
};

// calculate time left
const getReturnValues = (countDown) => {
  let hours, minutes, seconds;
  if (countDown >= 0) {
    hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  } else {
    hours = Math.ceil((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.ceil((countDown % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.ceil((countDown % (1000 * 60)) / 1000);
  }

  return [hours, minutes, seconds];
};

export { useCountdown };