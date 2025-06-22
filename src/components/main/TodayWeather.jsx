import { useEffect, useState } from "react";
import styles from "./todayWeather.module.css";
import { fetchCurrentWeather } from "../../api/MainApi";
import convertXY from "./convertXY";

export default function TodayWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const { nx, ny } = convertXY(latitude, longitude);

      const items = await fetchCurrentWeather({ nx, ny });
      if (items) {
        const temp = items.find((item) => item.category === "T1H")?.obsrValue;
        const rain = items.find((item) => item.category === "RN1")?.obsrValue;
        const pty = items.find((item) => item.category === "PTY")?.obsrValue;

        const description = getWeatherDescription(pty, rain);
        const icon = getWeatherIcon(pty);

        setWeather({
          temp,
          rain,
          description,
          icon,
        });
      }
    });
  }, []);

  const getWeatherDescription = (pty, rn1) => {
    switch (pty) {
      case "1":
        return `비 (${rn1}mm)`;
      case "2":
        return `비/눈 (${rn1}mm)`;
      case "3":
        return `눈 (${rn1}mm)`;
      case "4":
        return `소나기 (${rn1}mm)`;
      default:
        return rn1 > 0 ? `강수 있음 (${rn1}mm)` : "맑음";
    }
  };

  const getWeatherIcon = (pty) => {
    switch (pty) {
      case "1":
      case "4":
        return "🌧️";
      case "2":
        return "🌨️";
      case "3":
        return "❄️";
      default:
        return "☀️";
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>오늘의 날씨</h2>
      <p className={styles.sub}>AERO와 함께 날씨를 확인하며 여행을 시작해봐요!</p>
      <div className={styles.card}>
        <div className={styles.icon}>{weather ? weather.icon : "🌡️"}</div>
        <div className={styles.info}>
          <div className={styles.city}>현재 위치</div>
          <div className={styles.temp}>
            {weather ? `${weather.description} ${weather.temp}°C` : "로딩 중..."}
          </div>
        </div>
      </div>
    </section>
  );
}
