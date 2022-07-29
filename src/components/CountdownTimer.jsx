import React from "react";
import clsx from "clsx";
import { useState } from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../hooks/useCountdown";

const CountdownTimer = ({ startTime, setStartTime, timeItems }) => {
  const [ispauseCountdown, setIspauseCountdown] = useState(false);
  const [isStartCountdown, setIsStartCountdown] = useState(false);
  const [hours, minutes, seconds] = useCountdown(
    startTime.time,
    isStartCountdown,
    ispauseCountdown
  );
  const startCountdown = () => {
    if (isStartCountdown) {
      setIspauseCountdown(true);
      setIsStartCountdown(false);
    } else {
      setIspauseCountdown(false);
      setIsStartCountdown(true);
    }
  };
  const cancelCountdown = () => {
    setIspauseCountdown(false);
    setIsStartCountdown(false);
  };
  const setToMute = () => {};

  return (
    <div>
      <div className="flex justify-center gap-2">
        <div className="mx-auto items-center justify-between border-2 border-gray-900 pt-5 font-sans  text-red-500 lg:w-2/3">
          <div className="mx-auto flex w-9/12 justify-center text-6xl ">
            <DateTimeDisplay value={hours} type={"Hours"} className="w-1/4" />
            <p className="">:</p>
            <DateTimeDisplay value={minutes} type={"Mins"} className="w-1/4" />
            <p className="">:</p>
            <DateTimeDisplay
              value={seconds}
              type={"Seconds"}
              className="w-1/4"
            />
          </div>
          <div className="mx-auto flex h-28 w-9/12 items-center justify-center gap-6 rounded-2xl pt-2 text-xl">
            <button
              onClick={startCountdown}
              className="h-12 w-24 rounded-xl bg-indigo-200 text-center font-bold text-black ring-2 ring-green-400 hover:bg-indigo-400"
            >
              {isStartCountdown ? "暫停" : "開始"}
            </button>
            <button
              onClick={cancelCountdown}
              className="h-12 w-24 rounded-xl bg-red-200 text-center font-bold text-black ring-2 ring-sky-400 hover:bg-red-400"
            >
              取消
            </button>
            <button
              onClick={setToMute}
              className="h-12 w-28 rounded-xl bg-green-200 text-center font-bold text-black ring-2  hover:bg-green-400"
            >
              關掉提示音
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
