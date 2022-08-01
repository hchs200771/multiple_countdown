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
    </div>
  );
}
