/* eslint-disable react/no-unknown-property */
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
    <>
      <a
        className="gh-icon"
        href="https://github.com/olivierbeaulieu/clock"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          enableBackground="new 0 0 50 50"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#888"
            d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"
          />
        </svg>
      </a>
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
    </>
  );
}
