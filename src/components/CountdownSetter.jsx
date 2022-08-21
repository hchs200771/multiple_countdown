import React from "react";
import clsx from "clsx";
import { useState } from "react";
import FormatTime from "../helpers/FormatTime";

const CountdownSetter = ({
  startTime,
  setStartTime,
  timeItems,
  setTimeItems,
  onCountDownChanged,
  countdownState,
}) => {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
  };

  const addStartTime = () => {
    const newTime = (time.h * 60 * 60 + time.m * 60 + Number(time.s)) * 1000;
    const [hours, minutes, seconds] = FormatTime(newTime);
    if (!(hours + minutes + seconds)) {
      alert("開始時間不能為 0");
      return;
    }
    if (timeItems.some((item) => item.time >= newTime)) {
      alert("開始時間必須早於最大排程時間");
      return;
    }
    const newStartTime = {
      time: newTime,
      hours: hours,
      mins: minutes,
      secs: seconds,
    };
    setStartTime(newStartTime);
    onCountDownChanged(newTime);
  };

  const addTime = () => {
    const newTime = (time.h * 60 * 60 + time.m * 60 + Number(time.s)) * 1000;
    const [hours, minutes, seconds] = FormatTime(newTime);
    if (!(hours + minutes + seconds)) {
      alert("時段不能為 0");
      return;
    }
    if (timeItems.some((item) => item.time === newTime)) {
      alert("已有此時段");
      return;
    }
    if (newTime >= startTime.time) {
      alert(
        `排程時間 [${hours} : ${minutes} : ${seconds}] 需小於開始時間 [${startTime.hours} : ${startTime.mins} : ${startTime.secs}]`
      );
      return;
    }
    const newTimeItem = {
      time: newTime,
      hours: hours,
      mins: minutes,
      secs: seconds,
    };
    const newTimeItems = [...timeItems];
    let toBeAddedTimeItemIndex = newTimeItems.findIndex(
      (item) => newTime < item.time
    );
    if (toBeAddedTimeItemIndex >= 0) {
      newTimeItems.splice(toBeAddedTimeItemIndex, 0, newTimeItem);
    } else {
      newTimeItems.push(newTimeItem);
    }
    setTimeItems(newTimeItems);
  };

  const deleteTimeItem = (time) => {
    const newTimes = timeItems.filter((todo) => todo.time !== time);
    setTimeItems(newTimes);
  };

  return (
    <div className="relative flex flex-col">
      <h2 className="mt-4 h-1/2 text-center text-4xl font-extrabold">
        排程設定
      </h2>
      <div className="continer mx-auto w-full items-center justify-center lg:w-9/12">
        {/* 排程設定及 list */}
        <div className="mt-2 flex flex-col rounded font-sans font-extrabold sm:pl-20 lg:flex-row">
          {/* 排程設定*/}
          <div className="h-30 my-2 flex w-full flex-col items-center justify-evenly rounded-2xl bg-lime-600 shadow-2xl sm:w-4/5 lg:w-3/5">
            <div className="m-10 my-3 flex w-full justify-center rounded font-sans sm:w-4/5 lg:w-2/3">
              <label className="flex flex-col text-center text-2xl">
                Hours
                <input
                  type="number"
                  className="box-border h-14 w-14 rounded border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300 sm:w-20"
                  min="0"
                  max="99"
                  name="h"
                  onChange={changeHandler}
                  value={time.h}
                />
              </label>
              <p className="mt-9 w-10 px-1 text-center text-4xl text-red-400 lg:px-0">
                :
              </p>
              <label className="flex flex-col text-center text-2xl">
                Mins
                <input
                  type="number"
                  className="box-border h-14 w-14 rounded  border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300 sm:w-20"
                  min="0"
                  max="59"
                  name="m"
                  onChange={changeHandler}
                  value={time.m}
                />
              </label>
              <p className="mt-9 w-10 px-1 text-center text-4xl text-red-400 lg:px-0">
                :
              </p>
              <label className="flex flex-col text-center text-2xl">
                Secs
                <input
                  type="number"
                  className="box-border h-14 w-14 rounded border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300 sm:w-20"
                  min="0"
                  max="59"
                  name="s"
                  onChange={changeHandler}
                  value={time.s}
                />
              </label>
            </div>
            <div className="mb-3 flex w-3/5 items-center justify-center gap-4 p-1 lg:text-xl">
              <button
                onClick={addTime}
                className="mt-1 ml-3 h-14 w-40 rounded-xl bg-yellow-200 px-1 text-center font-bold text-black ring-1 ring-slate-400 hover:bg-yellow-400"
              >
                新增排程時間
              </button>
              <button
                onClick={addStartTime}
                className="mt-1 h-14 w-40 rounded-xl bg-sky-400 px-1 text-center font-bold text-black ring-1 ring-slate-400 hover:bg-sky-600"
              >
                設定開始時間
              </button>
              <p></p>
            </div>
          </div>
          {/* 排程 list */}
          <ul className="w-full p-1 lg:w-4/12">
            <li className="mx-auto mt-1 flex w-11/12 justify-evenly rounded-xl bg-sky-400 p-1 text-center text-2xl shadow-xl">
              <span className=" text-gray-500"> 開始時間 </span>
              {startTime.hours} : {startTime.mins} : {startTime.secs}
            </li>
            <li className="mx-auto mt-2 flex w-9/12 justify-evenly rounded-xl p-1 text-center text-2xl">
              提醒排程
            </li>
            {timeItems.map((timeItem) => (
              <li
                key={timeItem.time}
                className="mx-auto mt-2 flex w-8/12 justify-around rounded-xl bg-yellow-200 p-1 text-center shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-6 w-6"
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
                <p className="flex w-28 items-center text-xl">
                  {timeItem.hours} : {timeItem.mins} : {timeItem.secs}
                </p>
                <button
                  onClick={() => deleteTimeItem(timeItem.time)}
                  className="ml-1"
                >
                  <div className="rounded bg-red-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={clsx(
          "absolute top-2 h-full w-full rounded bg-gray-800 opacity-50 transition-all duration-300",
          countdownState !== "waitStart" ? "h-full w-full" : "h-0, w-0"
        )}
      ></div>
    </div>
  );
};

export default CountdownSetter;
