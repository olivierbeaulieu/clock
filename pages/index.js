import Head from "next/head";
import { useEffect, useState } from "react";

const getMonth = () => new Date().getMonth();
const getDate = () => new Date().getDate() + getHours() / 24;
const getHours = () => new Date().getHours() + getMinutes() / 60;
const getMinutes = () => new Date().getMinutes() + getSeconds() / 60;
const getSeconds = () =>
  new Date().getSeconds() + new Date().getMilliseconds() / 1000;

export default function Clock() {
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setMonth(getMonth());
      setDate(getDate());
      setHours(getHours());
      setMinutes(getMinutes());
      setSeconds(getSeconds());
    }, 1);

    return () => {
      clearInterval(int);
    };
  }, []);

  if (month === null) return null;

  return (
    <div className="container">
      <Head>
        <title>Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="cal-wrapper">
        <div className="sign">m</div>
        <div className="bar-wrapper">
          {new Array(12).fill(0).map((_, idx) => (
            <div
              key={idx}
              className={`month ${idx < month ? "month-active" : ""}`}
            >
              {idx === month && (
                <div
                  className="bar"
                  style={{
                    width: (date / 31) * 100 + "%",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="cal-wrapper">
        <div className="sign">h</div>
        <div className="bar-wrapper day">
          <div
            className="bar"
            style={{
              width: (hours / 24) * 100 + "%",
            }}
          />
        </div>
      </div>

      <div className="cal-wrapper">
        <div className="sign">m</div>
        <div className="bar-wrapper minutes">
          <div
            className="bar"
            style={{
              width: (minutes / 60) * 100 + "%",
            }}
          />
        </div>
      </div>

      <div className="cal-wrapper">
        <div className="sign">s</div>
        <div className="bar-wrapper seconds">
          <div
            className="bar"
            style={{
              width: (seconds / 60) * 100 + "%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
