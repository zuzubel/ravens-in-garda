// Denní předpověď z Open-Meteo, převedená na { "2026-10-27": { maxTemp, minTemp, precip, icon, label } }

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

export async function fetchForecast({ lat, lon, timezone }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily:
      "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone,
    // Maximum je 16 dní — výchozích 7 nepokryje pozdější dny výletu.
    forecast_days: 16,
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const { daily } = await res.json();
  const byDate = {};
  daily.time.forEach((date, i) => {
    byDate[date] = {
      maxTemp: Math.round(daily.temperature_2m_max[i]),
      minTemp: Math.round(daily.temperature_2m_min[i]),
      precip: daily.precipitation_sum[i],
      ...describeWeather(daily.weathercode[i]),
    };
  });
  return byDate;
}
