import { useState, useEffect } from "react";
import moment from "moment";
import {
  MapPin,
  Cloud,
  Waves,
  Wind,
  Cloudy,
  Sun,
  Search,
  CloudRain,
  CloudLightning,
  Moon,
  Snowflake ,
  User,
  AirVent,
  Coffee ,
} from "lucide-react";
import axios from "axios";
import "tailwindcss/tailwind.css";

// API details
const API_ID = "24100365f3390c54d34dc5ade965000b";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Collection of cities in India
const citiesInIndia = [
  "Mumbai" /* Gateway of India, Elephanta Caves */,
  "Delhi" /* Red Fort, Taj Mahal (Agra) */,
  "Bangalore" /* Vidhana Soudha, Bangalore Palace */,
  "Hyderabad" /* Charminar, Golconda Fort */,
  "Ahmedabad" /* Sabarmati Ashram, Adalaj Stepwell */,
  "Chennai" /* Marina Beach, Fort St. George */,
  "Kolkata" /* Victoria Memorial, Howrah Bridge */,
  "Surat" /* Surat Diamond Market, Dutch Cemetery */,
  "Pune" /* Aga Khan Palace, Shaniwar Wada */,
  "Jaipur" /* Hawa Mahal, Amber Fort */,

  // Karnataka
  "Shivamogga" /* Jog Falls */,
  "Bhadravati" /* Bhadravati Thermal Power Station (industrial) */,
  "Hubli-Dharwad" /* Hubli Unkal Lake, Dharwad Fort */,
  "Mysore" /* Mysore Palace, Brindavan Gardens */,
  "Mangalore" /* Panambur Beach, Kadri Manjunath Temple */,
  "Belgaum" /* Belgaum Fort, Belgaum Caves */,
  "Gulbarga" /* Sharifa Jumma Masjid, Gulbarga Fort */,
  "Davangere" /* Davanagere Fort, Hussain Sagar Lake */,
  "Hampi" /* Virupaksha Temple, Hampi Bazaar (historical site) */,
  "Coorg" /* Abbey Falls, Iruppu Falls (hill station) */,
  "Badami" /* Badami Caves (historical site) */,
  "Gokarna" /* Mahabaleshwar Temple, Om Beach (beach town) */,

  // Other Tourist Places in India
  "Agra" /* Taj Mahal */,
  "Goa" /* Calangute Beach, Dudhsagar Falls (beach state) */,
  "Kerala" /* Munnar (hill station), Alappuzha (backwaters) */,
  "Rajasthan" /* Thar Desert, Jaisalmer Fort */,
  "Uttar Pradesh" /* Varanasi (holy city), Agra Fort */,
];


// Collection of healthcare and healthy eating tips
const content = {
  Clear: {
    tip: "Remember to stay hydrated and wear sunscreen!",
    healthTip: "Perfect time for a walk or run in the park!",
    travelTip:
      "It's a great day for outdoor activities like hiking or picnics!",
  },
  Rain: {
    tip: "Don't forget your umbrella and waterproof shoes.",
    healthTip: "A warm soup can make your rainy day better!",
    travelTip:
      "Consider exploring indoor attractions like museums or art galleries.",
  },
  Thunderstorm: {
    tip: "Stay indoors and avoid using electrical appliances.",
    healthTip: "A cup of hot tea can help you stay warm and cozy.",
    travelTip: "Stay indoors and enjoy a cozy day at home or in a local cafe.",
  },
  Clouds: {
    tip: "A light jacket might be necessary.",
    healthTip: "Great weather for reading a book or doing yoga indoors.",
    travelTip:
      "Explore outdoor attractions with fewer crowds, like parks or gardens.",
  },
  Snow: {
    tip: "Wear warm clothes and be careful on slippery surfaces.",
    healthTip: "A hearty stew can keep you warm.",
    travelTip:
      "Embrace the winter wonderland by trying out winter sports or building a snowman!",
  },
  Default: {
    tip: "Always be prepared for changing weather!",
    healthTip: "Maintain a balanced diet regardless of the weather.",
    travelTip:
      "Be prepared for changing weather conditions during your travels.",
  },
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("light");
  const [toggle, setToggle] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
    setFilteredCities(
      citiesInIndia.filter((city) =>
        city.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setFilteredCities([]);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setToggle(!toggle);
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setCity('')
    const api = `${API_URL}?q=${city}&appid=${API_ID}&units=metric`;

    try {
      const res = await axios.get(api);
      setWeather(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const renderIcon = () => {
    if (!weather) return null;

    switch (weather.weather[0].main) {
      case "Clear":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "Rain":
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      case "Thunderstorm":
        return <CloudLightning className="h-10 w-10 text-gray-500" />;
      case "Clouds":
        return (
          <Cloudy className="h-10 w-10 text-gray-500 shadow-md rounded-full p-1 " />
        );
        case "Smoke":
            return (
              <Snowflake className="h-10 w-10 text-blue-500 shadow-md rounded-full p-1 " />
            );
        case 'Haze' :
            return (
              <AirVent className="h-10 w-10 text-gray-500 shadow-md rounded-full p-1 " />
            );
     
      
      default:
        return <MapPin className="h-10 w-10 text-red-500" />;
    }
  };

  const renderContent = () => {
    if (!weather) return null;

    const condition = weather.weather[0].main;
    const weatherContent = content[condition] || content["Default"];
    return (
      <>
        <div className="flex gap-4 my-4 mx-7 items-center">
          <p
            className={`text-xl font-semibold italic ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <strong>Tip:</strong> {weatherContent.tip}
          </p>
        </div>
        <div className="flex gap-4  my-4 mx-7 items-center">
          <p
            className={`text-xl font-semibold italic ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <strong>Health Tip:</strong> {weatherContent.healthTip}
          </p>
        </div>
        <div className="flex gap-4 my-4 mx-7 items-center">
          <p
            className={`text-xl font-semibold italic ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <strong>Travel Tip:</strong> {weatherContent.travelTip}
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen ${
        theme === "light" ? "bg-custom-light" : "bg-custom-dark"
      } transition-colors duration-500`}
    >
      <button
        onClick={toggleTheme}
        className="mt-5 ml-56 px-4 p-2 border border-gray-400 rounded-full shadow-lg"
      >
        {toggle ? <Sun className=" text-yellow-300" /> : <Moon />}
      </button>
      <h1
        className={`text-5xl py-6 font-bold font-[poppins] ${
          theme === "light" ? "text-[#013237]" : "text-[#EAF9E7]"
        }`}
      >
        WeatherWise
      </h1>
      <p
        className={`text-xl mb-4 ${
          theme === "light" ? "text-custom-light" : "text-custom-dark"
        }`}
      >
        {moment().format("DD-MM-YYYY")}
      </p>
      <form onSubmit={fetchData} className="flex  items-center gap-2 relative">
        <input
          type="text"
          name="search"
          value={city}
          onChange={handleChange}
          placeholder="Enter the city"
          required
          className="px-4 py-2 border border-gray-400 bg-[#EAF9E7] rounded-md shadow-lg"
        />
        {filteredCities.length > 0 && (
          <div className="absolute mt-12 w-full bg-white border border-gray-400 rounded-md shadow-lg z-10">
            {filteredCities.map((filteredCity, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectCity(filteredCity)}
              >
                {filteredCity}
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className={`px-4 py-2 border border-gray-400 rounded-md shadow-lg ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <Search />
        </button>
      </form>
      {weather && (
        <div className="flex flex-col mt-5 lg:grid lg:grid-cols-2">
          <div className="flex gap-4 my-5 items-center">
            <MapPin className="h-10 w-10 bg-[#4CA771] text-white rounded-full p-2" />
            <p
              className={`text-2xl font-semibold font-mono ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {weather.name}
            </p>
          </div>
          <div className="flex gap-4 my-5 items-center">
            {renderIcon()}
            <p
              className={`text-2xl font-semibold font-mono ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {weather.weather[0].main}
              <p className="font-thin text-sm">
                ( {weather.weather[0].description} )
              </p>
            </p>
          </div>
          <div className="flex gap-4 my-5 items-center">
            <Cloud className="h-10 w-10 bg-[#4CA771] text-white rounded-full p-2" />
            <p
              className={`text-2xl font-semibold font-mono ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {Math.round(weather.main.temp)} °C
            </p>
          </div>
          <div className="flex gap-4 my-5 items-center">
            <Waves className="h-10 w-10 bg-[#4CA771] text-white rounded-full p-2" />
            <p
              className={`text-2xl font-semibold font-mono ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Humidity: {weather.main.humidity} %
            </p>
          </div>
          <div className="flex gap-4 my-5 items-center">
            <Wind className="h-10 w-10 backdrop-blur-sm bg-[#4CA771] text-white rounded-full p-2" />
            <p
              className={`text-2xl font-semibold font-mono ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Wind Speed: {Math.round(weather.wind.speed)} km/h
            </p>
          </div>
        </div>
      )}
      {renderContent()}

      <footer className=" mt-20 border-t-2 border-[#013237]  ">
        <p
          className={`text-lg flex gap-2 align-middle justify-center mt-4 ${
            theme === "light" ? "text-[#013237]" : "text-[#EAF9E7]"
          } `}
        >
          Fueled by {<Coffee />} by {""}
          <a
            href="https://www.instagram.com/nanda._o7/"
            className="text-blue-600"
          >
            <User className="  h-8 w-8   " />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Weather;
