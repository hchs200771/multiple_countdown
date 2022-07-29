import React from "react";
import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import CountdownSetter from "./components/CountdownSetter";

export default function App() {
  const [startTime, setStartTime] = useState({
    time: 20 * 1000,
    hours: 0,
    mins: 0,
    secs: 20,
  });
  const [timeItems, setTimeItems] = useState([
    { time: 3 * 60 * 1000, hours: 0, mins: 3, secs: 0 },
  ]);

  return (
    <div className=" font-serif">
      <h1 className="m-4 text-center text-5xl">Countdown Timer</h1>
      <section className="flex flex-col justify-center">
        <CountdownTimer
          startTime={startTime}
          timeItems={timeItems}
          setStartTime={setStartTime}
        />
        <CountdownSetter
          startTime={startTime}
          setStartTime={setStartTime}
          timeItems={timeItems}
          setTimeItems={setTimeItems}
        ></CountdownSetter>
      </section>
    </div>
  );
}
