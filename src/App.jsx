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
    { time: 50 * 1000, hours: 0, mins: 0, secs: 50 },
  ]);
  const [countDown, setCountDown] = useState(startTime);
  const [isMusicPlaying, toggleIsMusicPlaying] = useState(false);
  const [isStartCountdown, setIsStartCountdown] = useState(false);
  const [ispauseCountdown, setIspauseCountdown] = useState(false);

  return (
    <div className=" font-serif">
      <h1 className="m-4 text-center text-5xl">Countdown Timer</h1>
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
      <footer className="mt-5">
        <ul className="list-inside list-disc">
          <li>開始倒數後，除非重置，否則無法修改開始時間跟提醒排程</li>
          <li>按 ↑ 或 ↓ 可調整數字。 </li>
          <li>
            按下「關掉提示音」關掉音樂後，下一個排程時間或是歸零才會再次響起
          </li>
        </ul>
        <p className="mt-5">Copyright © 2022 Max Huang</p>
      </footer>
    </div>
  );
}
