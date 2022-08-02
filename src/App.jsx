import React from "react";
import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import CountdownSetter from "./components/CountdownSetter";

export default function App() {
  const [startTime, setStartTime] = useState({
    time: 60 * 1000,
    hours: 0,
    mins: 1,
    secs: 0,
  });
  const [timeItems, setTimeItems] = useState([
    { time: 38 * 1000, hours: 0, mins: 0, secs: 38 },
    { time: 55 * 1000, hours: 0, mins: 0, secs: 50 },
  ]);
  const [countDown, setCountDown] = useState(startTime);
  const [isMusicPlaying, toggleIsMusicPlaying] = useState(false);
  // TODO:計時器三種狀態： 'countdowning', 'pause', 'before_start'
  const [isStartCountdown, setIsStartCountdown] = useState(false);
  const [ispauseCountdown, setIspauseCountdown] = useState(false);

  return (
    <div className=" font-serif">
      <h1 className="m-4 flex justify-center gap-3 text-center text-5xl">
        Countdown Timer
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1 h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </h1>
      <section className="flex flex-col justify-center">
        <CountdownTimer
          startTime={startTime}
          timeItems={timeItems}
          setStartTime={setStartTime}
          countDown={countDown}
          setTimeItems={setTimeItems}
          setCountDown={setCountDown}
          isMusicPlaying={isMusicPlaying}
          toggleIsMusicPlaying={toggleIsMusicPlaying}
          isStartCountdown={isStartCountdown}
          setIsStartCountdown={setIsStartCountdown}
          ispauseCountdown={ispauseCountdown}
          setIspauseCountdown={setIspauseCountdown}
        />
        <CountdownSetter
          startTime={startTime}
          setStartTime={setStartTime}
          timeItems={timeItems}
          setTimeItems={setTimeItems}
          setCountDown={setCountDown}
          isStartCountdown={isStartCountdown}
          ispauseCountdown={ispauseCountdown}
        ></CountdownSetter>
      </section>
      <footer className="mt-5 flex flex-col items-center">
        <ul className="m-1/2 mx-auto list-inside list-disc">
          <li>「設定開始時間」可以決定倒數的時間</li>
          <li>按下「開始」倒數後，無法修改開始時間跟提醒排程，除非重置</li>
          <li>按 ↑ 或 ↓ 可調整數字。 </li>
          <li>按下「關聲音」關掉音樂後，下一個排程時間或是歸零又會再次響起</li>
        </ul>
        <p className="mt-5">Copyright © 2022 Max Huang</p>
      </footer>
    </div>
  );
}
