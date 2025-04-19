import axios from 'axios';
import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";


export default function App() {
  const [search,setSearch]=useState("")
  const [loading,setLoading]=useState(false)
  const [temparature,setemparature]=useState(null)
  const [humidity,setHumdity]=useState(null)
  const [windspeed,setwindspeed]=useState(null)
  const [city,setCity]=useState("")
  const [weather,setWeather]=useState("01d")
  const fetchweather=async()=>{
    if(!search) return
    setLoading(true)
    try{
    const {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`)
    console.log(data)
    if(data.cod==200){
      setemparature(data.main.temp)
      setHumdity(data.main.humidity)
      setwindspeed(data.wind.speed)
      setCity(data.name)
      setLoading(false)
      setWeather(data.weather[0].icon)
    }
    }
   
    catch(error){
      
      setCity("City not found")
      setemparature(null)
      setHumdity(null)
      setwindspeed(null)
      setLoading(false);
      setWeather("01d")

    }
    setLoading(false)
    
  }
 
  
  const API_KEY="b21b9f4662429e896eb607223eb3c4a5"
  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
    <div className='flex justify-row items-center gap-2 w-120 px-5 bg-white rounded-full mb-20'>
     <input className='flex-1 outline-none px-7 py-4 rounded-full' type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
     <IoIosSearch onClick={fetchweather} className='text-gray-500 size-[40px] cursor-pointer' />
    
    </div>
    
      <img className='w-20 mb-10' src={`https://openweathermap.org/img/wn/${weather}@2x.png`} alt="" />
      <h1 className='text-2xl mb-9'>{loading?"loading..":temparature!==null?`${temparature}°C`:"_ _"}</h1>
      <h2 className='text-2xl font-semibold mb-9'>{city!==""?`${city}`:"TYPE TO CHECK THE TEMPERATURE"}</h2>
      <div className='flex item-center justify-between gap-40 mt-10'>
         <div>
         <WiHumidity />
         <span>{humidity !== null ? `${humidity}%` : "_ _"}</span>
         <p className='text-1xl font-serif'>Humidity Level</p>
         </div>
         <div>
         <WiStrongWind />
         <span>{windspeed !== null ? `${windspeed} km/h` : "_ _"}</span>
         <p className='text-1xl font-serif'>Wind Speed</p>
         </div>
      </div>
    </div>
    </>
  )
}
