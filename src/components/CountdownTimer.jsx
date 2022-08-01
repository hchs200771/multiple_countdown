import React from "react";
import clsx from "clsx";
import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../hooks/useCountdown";
import soundfile from "../johnnie-holiday-wild.mp3";

const CountdownTimer = ({
  startTime,
  timeItems,
  setTimeItems,
  countDown,
  setCountDown,
  isMusicPlaying,
  toggleIsMusicPlaying,
  isStartCountdown,
  setIsStartCountdown,
  ispauseCountdown,
  setIspauseCountdown,
}) => {
  const [hours, minutes, seconds] = useCountdown(
    countDown,
    setCountDown,
    startTime.time,
    isStartCountdown,
    ispauseCountdown,
    timeItems,
    setTimeItems,
    toggleIsMusicPlaying
  );
  const musicPlayer = useRef();
  const startCountdown = () => {
    if (isStartCountdown) {
      setIspauseCountdown(true);
      setIsStartCountdown(false);
      toggleIsMusicPlaying(false);
    } else {
      setIspauseCountdown(false);
      setIsStartCountdown(true);
    }
  };
  const cancelCountdown = () => {
    setIspauseCountdown(false);
    setIsStartCountdown(false);
    toggleIsMusicPlaying(false);
  };
  useEffect(() => {
    if (isMusicPlaying && isStartCountdown) {
      musicPlayer.current.audio.current.play();
    } else if (!isMusicPlaying) {
      musicPlayer.current.audio.current.pause();
    }
  }, [isMusicPlaying]);
  const setToMute = () => {
    toggleIsMusicPlaying(false);
  };

  return (
    <div>
      <div className="flex justify-center gap-2">
        <div
          className={clsx(
            "mx-auto w-full items-center justify-between rounded-2xl border-2 border-gray-900  pt-5 font-sans text-red-500 lg:w-2/3",
            isStartCountdown ? "bg-sky-300" : ""
          )}
        >
          <div className="mx-auto flex w-9/12 justify-center text-4xl sm:text-6xl">
            <DateTimeDisplay
              value={hours}
              type={"Hours"}
              className="sm:w-1/4"
            />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={"Mins"} className="w-1/4" />
            <p>:</p>
            <DateTimeDisplay
              value={seconds}
              type={"Seconds"}
              className="w-1/4"
            />
          </div>
          <div className="mx-auto flex h-28 w-9/12 items-center justify-center gap-6 rounded-2xl pt-2 text-xl">
            <button
              onClick={startCountdown}
              className="h-12 w-24 rounded-xl bg-indigo-200 py-1 text-center font-bold text-black ring-2 ring-green-400 hover:bg-indigo-400"
            >
              {isStartCountdown ? "暫停" : "開始"}
            </button>
            <button
              onClick={cancelCountdown}
              className="h-12 w-24 rounded-xl bg-red-200 py-1 text-center font-bold text-black ring-2 ring-sky-400 hover:bg-red-400"
            >
              重置
            </button>
            <button
              onClick={setToMute}
              className="h-12 w-28 rounded-xl bg-green-200 py-1 text-center font-bold text-black ring-2  hover:bg-green-400"
            >
              關掉提示音
            </button>
          </div>
        </div>
        <AudioPlayer
          ref={musicPlayer}
          className="hidden"
          loop
          src={soundfile}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
