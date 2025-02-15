import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [times, setTimes] = useState({});

  const [currentDate, setCurrentDate] = useState("");

  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهره", value: "Cairo" },
    { name: "الجيزه", value: "Giza" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    const fetchPrayerTime = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${fullDate}?city=Eg&country=${city}`
        );
        const data = await response.json();
        setTimes(data.data.timings);
        setCurrentDate(data.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrayerTime();
  }, [city]);

  const formateTime = (time) => {
    if (!time) return "00:00";
    let [hour, minutes] = time.split(":").map(Number);
    const perd = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينه</h3>
            <select
              name=""
              id=""
              onChange={(evt) => {
                setCity(evt.target.value);
              }}
            >
              {cities.map((el, idx) => {
                return (
                  <option key={el.value} value={el.value}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{currentDate}</h4>
          </div>
        </div>
        <div className="times">
          <Card name={"الفجر"} time={formateTime(times.Fajr)} />
          <Card name={"الظهر"} time={formateTime(times.Dhuhr)} />
          <Card name={"العصر"} time={formateTime(times.Asr)} />
          <Card name={"المغرب"} time={formateTime(times.Maghrib)} />
          <Card name={"العشاء"} time={formateTime(times.Isha)} />
        </div>
      </div>
    </section>
  );
}

export default App;
