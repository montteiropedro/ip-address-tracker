import { useEffect, useState, FormEvent } from "react";
import { AddressInfoBar } from "./components/AddressInfoBar"
import { Map } from "./components/Map"

import axios from 'axios';

interface LocationProps {
  ip: string;
  isp: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number,
    lng: number,
    timezone: string,
  }
}

function App() {
  const [locationData, setLocationData] = useState<LocationProps | null>(null);
  const [inputAddressDomain, setInputAddressDomain] = useState<string>('');

  useEffect(() => {
    try {
      axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEOAPI_KEY}`)
        .then(({ data }) => setLocationData(data));
    }
    catch (err) {
      console.error('Error trying to get the initial location data: ', err);
    }
  }, []);

  async function handleSearchLocation(e: FormEvent) {
    e.preventDefault();

    const ipv4regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    const ipv6regex = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/gm;
    const domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gm;

    let paramType;
    
    if (ipv4regex.test(inputAddressDomain) || ipv6regex.test(inputAddressDomain)) {
      paramType = 'ipAddress';
    }
    else if (domainRegex.test(inputAddressDomain)) {
      paramType = 'domain';
    }

    try {
      await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEOAPI_KEY}&${paramType}=${inputAddressDomain}`)
        .then(({ data }) => setLocationData(data));
    }
    catch (err) {
      console.error('Error trying to get the location data: ', err);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="py-4 flex flex-col items-center bg-top-pattern bg-cover bg-no-repeat">
        <h1 className="mb-4 text-xl font-medium text-white">IP Address Tracker</h1>

        <form
          onSubmit={handleSearchLocation}
          className="mb-6 w-[384px] flex"
        >
          <input
            type="text"
            name="ip-domain"
            id="ip-domain"
            placeholder="Search for any IP address or domain"
            onChange={(e) => setInputAddressDomain(e.target.value)}
            className="flex-1 text-sm px-4 border rounded-l-lg placeholder:text-sm"
          />

          <button type="submit" className="p-2 w-11 text-white bg-black rounded-r-lg">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </form>

        {locationData && (
          <AddressInfoBar
            key={locationData.ip}
            ip={locationData.ip}
            city={locationData.location.city}
            state={locationData.location.region}
            country={locationData.location.country}
            timezone={locationData.location.timezone}
            isp={locationData.isp}
          />
        )}
      </div>
      
      {locationData && (
        <Map
          lat={locationData.location.lat}
          lng={locationData.location.lng}
          isp={locationData.isp}
        />
      )}
    </div>
  )
}

export default App
