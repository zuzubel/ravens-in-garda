// Denní předpověď z Open-Meteo (model ECMWF), převedená na
// { "2026-10-27": { maxTemp, minTemp, rainChance, icon, label } }

// WMO kódy počasí → ikona a popis. Font Awesome místo emoji
// (emoji mlhy se na Applu kreslí jako šedý rámeček).
const WEATHER_CODES = [
  { from: 1, to: 2, icon: "fa-cloud-sun text-amber-200", label: "Polojasno" },
  { from: 3, to: 3, icon: "fa-cloud text-teal-100", label: "Zataženo" },
  { from: 45, to: 48, icon: "fa-smog text-teal-100", label: "Mlha" },
  { from: 51, to: 67, icon: "fa-cloud-rain text-sky-300", label: "Déšť" },
  { from: 71, to: 77, icon: "fa-snowflake text-sky-100", label: "Sněžení" },
  {
    from: 80,
    to: 82,
    icon: "fa-cloud-showers-heavy text-sky-300",
    label: "Přeháňky",
  },
  {
    from: 85,
    to: 86,
    icon: "fa-snowflake text-sky-100",
    label: "Sněhové přeháňky",
  },
  {
    from: 95,
    to: Infinity,
    icon: "fa-cloud-bolt text-amber-300",
    label: "Bouřky",
  },
];
const CLEAR_SKY = { icon: "fa-sun text-amber-300", label: "Slunečno" };

function describeWeather(code) {
  return (
    WEATHER_CODES.find(({ from, to }) => code >= from && code <= to) ??
    CLEAR_SKY
  );
}

// Počasí dne = nejčastější stav přes den. Denní kód Open-Meteo je nejhorší hodina dne,
// takže hodina ranní mlhy nebo slabého mrholení by obarvila celý den.
const DAYTIME = { from: 8, to: 20 };

function dominantWeather(codes) {
  const counts = new Map();
  for (const code of codes) {
    const weather = describeWeather(code);
    counts.set(weather, (counts.get(weather) ?? 0) + 1);
  }
  return [...counts].reduce((best, entry) =>
    entry[1] > best[1] ? entry : best,
  )[0];
}

// Hodinové kódy počasí přes den, seskupené podle data
function daytimeCodesByDate({ time, weather_code }) {
  const byDate = {};
  time.forEach((timestamp, i) => {
    const hour = Number(timestamp.slice(11, 13));
    if (hour < DAYTIME.from || hour > DAYTIME.to) return;
    (byDate[timestamp.slice(0, 10)] ??= []).push(weather_code[i]);
  });
  return byDate;
}

export async function fetchForecast({ lat, lon, timezone }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    // ECMWF je na předpověď několik dní dopředu nejpřesnější; sahá až 15 dní.
    models: "ecmwf_ifs025",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    hourly: "weather_code",
    timezone,
    forecast_days: 15,
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const { daily, hourly } = await res.json();
  const codesByDate = daytimeCodesByDate(hourly);
  const byDate = {};
  daily.time.forEach((date, i) => {
    const codes = codesByDate[date]?.filter((code) => code !== null);
    // za koncem předpovědi model vrací prázdné hodnoty
    if (!codes?.length || daily.temperature_2m_max[i] === null) return;
    const { icon, label } = dominantWeather(codes);
    byDate[date] = {
      maxTemp: Math.round(daily.temperature_2m_max[i]),
      minTemp: Math.round(daily.temperature_2m_min[i]),
      rainChance: daily.precipitation_probability_max[i] ?? 0,
      icon,
      label,
    };
  });
  return byDate;
}
