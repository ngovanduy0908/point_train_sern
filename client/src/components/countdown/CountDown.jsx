import axios from "axios";
import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const Countdown = () => {
  // const { maLop } = user;
  const { currentUser } = useContext(AuthContext);
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const getDeadlineByMaLop = async () => {
    try {
      await axios.get(
        `${DOMAIN}/deadlines/deadlineMaLop/${currentUser.maLop}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log("domain: ", currentUser);

  useEffect(() => {
    getDeadlineByMaLop();
    const target_date = new Date().getTime() + 1000 * 3600 * 48; // set the countdown date

    const countdownInterval = setInterval(() => {
      const current_date = new Date().getTime();
      const seconds_left = (target_date - current_date) / 1000;

      setDays(pad(parseInt(seconds_left / 86400)));
      setHours(pad(parseInt((seconds_left % 86400) / 3600)));
      setMinutes(pad(parseInt((seconds_left % 3600) / 60)));
      setSeconds(pad(parseInt(seconds_left % 60)));

      if (seconds_left <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const pad = (n) => {
    return (n < 10 ? "0" : "") + n;
  };

  return (
    <div id="countdown">
      <div id="tiles">
        <span>{days}</span>
        <span>{hours}</span>
        <span>{minutes}</span>
        <span>{seconds}</span>
      </div>
      <div className="labels">
        <li>Days</li>
        <li>Hours</li>
        <li>Mins</li>
        <li>Secs</li>
      </div>
    </div>
  );
};

export default Countdown;
