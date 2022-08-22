import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import CountdownSetter from "./components/CountdownSetter";

export default function App() {
  const [startTime, setStartTime] = useState({
    time: 60 * 1000,
    hours: "00",
    mins: "01",
    secs: "00",
  });
  const [timeItems, setTimeItems] = useState([
    { time: 38 * 1000, hours: "00", mins: "00", secs: "38" },
    { time: 57 * 1000, hours: "00", mins: "00", secs: "57" },
  ]);
  const [countDown, setCountDown] = useState(startTime.time);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  // 計時器三種狀態： 倒數中：'countdowning',  暫停：'pause', 等待開始：'waitStart'
  const [countdownState, setCountdownState] = useState("waitStart");

  return (
    <div className="font-serif">
      <h1 className="m-4 flex justify-center gap-3 text-center text-5xl">
        Countdown Timer
      </h1>
      <section className="flex flex-col justify-center">
        <CountdownTimer
          startTime={startTime}
          timeItems={timeItems}
          countDown={countDown}
          setTimeItems={setTimeItems}
          onCountDownChanged={setCountDown}
          isMusicPlaying={isMusicPlaying}
          onIsMusicPlayingChanged={setIsMusicPlaying}
          countdownState={countdownState}
          setCountdownState={setCountdownState}
        />
        <CountdownSetter
          startTime={startTime}
          setStartTime={setStartTime}
          timeItems={timeItems}
          setTimeItems={setTimeItems}
          onCountDownChanged={setCountDown}
          countdownState={countdownState}
        ></CountdownSetter>
      </section>
      <footer className="mt-10 flex flex-col items-center">
        <ul className="m-1/2 mx-auto list-inside list-disc font-bold">
          <li className="mt-2">
            <span className="rounded bg-indigo-200 p-1">開始</span>：
            開始進行倒數，這時無法修改開始時間跟提醒排程，除非「重置」
          </li>
          <li className="mt-2">
            <span className="rounded bg-red-200 p-1">重置</span>：回到開始時間
          </li>
          <li className="mt-2">
            <span className="rounded bg-green-200 p-1">關聲音</span>：
            關掉提醒音樂後，下一個排程時間或是歸零時會再次響起
          </li>
          <li className="mt-2">
            <span className="rounded bg-sky-400 p-1">設定開始時間</span>
            ：決定倒數開始時間
          </li>
          <li className="mt-2">
            <span className="rounded bg-yellow-200 p-1">新增排程時間</span>
            ：增加新的提醒排程
          </li>
          <li className="mt-2">
            想要時間歸零 1 分鐘後提醒，可以設定 minutes 為 「-1」
          </li>
        </ul>
        <p className="mt-5">Copyright © 2022 Max Huang</p>
      </footer>
    </div>
  );
}
