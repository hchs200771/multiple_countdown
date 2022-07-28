import React from "react";
import { useState, useEffect } from "react";

const CountdownSetter = ({
  startTime,
  setStartTime,
  timeItems,
  setTimeItems,
}) => {
  // debugger;
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const hoursChangeHandler = (e) => {
    setHours(e.target.value);
  };
  const minsChangeHandler = (e) => {
    setMins(e.target.value);
  };
  const secsChangeHandler = (e) => {
    setSecs(e.target.value);
  };

  const addStartTime = () => {
    const newTime = (hours * 60 * 60 + mins * 60 + Number(secs)) * 1000;

    if (!Number(hours + mins + secs)) {
      alert("開始時段不能為 0");
      return;
    }
    if (timeItems.some((item) => item.time >= newTime)) {
      alert("開始時段必須早於最大排程時間");
      return;
    }
    const newStartTime = {
      time: newTime,
      hours,
      mins,
      secs,
    };
    setStartTime(newStartTime);
  };

  const addTime = () => {
    const newTime = (hours * 60 * 60 + mins * 60 + Number(secs)) * 1000;

    if (!Number(hours + mins + secs)) {
      alert("時段不能為 0");
      return;
    }
    if (timeItems.some((item) => item.time === newTime)) {
      alert("已有此時段");
      return;
    }
    if (newTime >= startTime.time) {
      alert(
        `排程時間 [${hours} : ${mins} : ${secs}] 需早於開始時間 [${startTime.hours} : ${startTime.mins} : ${startTime.secs}]`
      );
      return;
    }
    const newTimeItem = {
      time: newTime,
      hours,
      mins,
      secs,
    };
    const newTimeItems = [...timeItems];
    let toBeAddedTimeItemIndex = -1;
    for (let i = 0; i < newTimeItems.length; i++) {
      if (newTime < newTimeItems[i].time) {
        toBeAddedTimeItemIndex = i;
        break;
      }
    }
    if (toBeAddedTimeItemIndex >= 0) {
      newTimeItems.splice(toBeAddedTimeItemIndex, 0, newTimeItem);
    } else {
      newTimeItems.push(newTimeItem);
    }
    setTimeItems(newTimeItems);
  };

  const deleteTimeItem = (time) => {
    const newTimes = [...timeItems];
    const toBeDeletedTimeItemIndex = newTimes.findIndex(
      (todo) => todo.time === time
    );
    newTimes.splice(toBeDeletedTimeItemIndex, 1);
    setTimeItems(newTimes);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 h-1/2 text-center text-4xl font-extrabold"> 排程 </h2>
      <div className="continer mx-auto w-9/12 items-center justify-center">
        {/* 排程設定及 list */}
        <div className="mt-2 flex rounded p-10 pt-3 font-sans font-extrabold">
          {/* 排程設定*/}
          <div className=" h-30 mt-1 flex w-3/5 flex-col items-center justify-evenly rounded-2xl bg-lime-200 ">
            <div className="m-10 my-3 flex w-8/12 justify-center rounded font-sans lg:w-2/3">
              <label className="flex flex-col text-center text-2xl">
                Hours
                <input
                  type="number"
                  className=" w-30 box-border h-14 rounded border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300"
                  min="0"
                  max="99"
                  onChange={hoursChangeHandler}
                  value={hours}
                />
              </label>
              <p className="mt-9 w-10 text-center text-4xl text-red-400">:</p>
              <label className="flex flex-col text-center text-2xl">
                Mins
                <input
                  type="number"
                  className="box-border h-14 w-20 rounded border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300"
                  min="0"
                  max="59"
                  onChange={minsChangeHandler}
                  value={mins}
                />
              </label>
              <p className="mt-9 w-10 text-center text-4xl text-red-400">:</p>
              <label className="flex flex-col text-center text-2xl">
                Secs
                <input
                  type="number"
                  className=" box-border h-14 w-20 rounded border-0 border-b pl-2 text-center text-4xl font-bold hover:bg-red-100 focus:bg-red-300"
                  min="0"
                  max="59"
                  onChange={secsChangeHandler}
                  value={secs}
                />
              </label>
            </div>
            <div className="mb-3 flex w-3/5 items-center justify-center gap-4 text-xl">
              <button
                onClick={addTime}
                className="mt-1 ml-3 h-12 w-40 rounded-xl bg-yellow-200 text-center font-bold  text-black hover:bg-yellow-400"
              >
                新增排程時間
              </button>
              <button
                onClick={addStartTime}
                className="mt-1 h-12 w-40 rounded-xl bg-gray-200 text-center font-bold text-black  hover:bg-gray-400"
              >
                設定開始時間
              </button>
              <p></p>
            </div>
          </div>
          {/* 排程 list */}
          <ul className="w-4/12 p-1">
            {timeItems.map((timeItem) => (
              <li
                key={timeItem.time}
                className="mx-auto mt-2 flex w-1/2  justify-center rounded-xl bg-sky-100 p-1 text-center"
              >
                <p className="flex w-20 items-center text-xl">
                  {timeItem.hours} : {timeItem.mins} : {timeItem.secs}
                </p>
                <button
                  onClick={() => deleteTimeItem(timeItem.time)}
                  className="ml-2"
                >
                  <div className=" rounded bg-red-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-6 w-6"
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
            <li className="mx-auto mt-2 flex w-9/12 justify-center  rounded-xl bg-sky-400 p-1 text-center text-2xl">
              {startTime.hours} : {startTime.mins} : {startTime.secs} 開始計時
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountdownSetter;
