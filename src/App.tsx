import { useEffect, useState, FormEvent } from "react";
import { AddressInfoBar } from "./components/AddressInfoBar"
import { Map } from "./components/Map"

interface LocationProps {
  ip: string;
  isp: string;
  location: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    lat: number,
    lng: number,
    timezone: string,
  }
}

function App() {
  const [locationData, setLocationData] = useState<LocationProps | null>(null);
  const [AddressDomainValue, setAddressDomainValue] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/getFirstLocation')
          .then(res => res.json());

        if (res.code === 400 || res.error) throw new Error();

        console.log(res);
        setLocationData(res);
      }
      catch (err) {
        alert('Error trying to get the initial location data');
      }
    })();
  }, []);

  async function handleSearchLocation(e: FormEvent) {
    e.preventDefault();

    const ipv4regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    const ipv6regex = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/gm;
    const domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gm;

    let searchType = '';
    
    if (ipv4regex.test(AddressDomainValue) || ipv6regex.test(AddressDomainValue)) {
      searchType = 'ipAddress';
    }
    else if (domainRegex.test(AddressDomainValue)) {
      searchType = 'domain';
    }

    try {
      const res = await fetch('/api/getLocation', {
        method: 'POST',
        body: JSON.stringify({
          searchType,
          AddressDomainValue
        })
      })
        .then(res => res.json());

      if (res.code === 400 || res.error) throw new Error();

      setLocationData(res);
    }
    catch (err) {
      alert('Error trying to get the location data');
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative z-10 h-[187px] bg-top-pattern bg-cover bg-no-repeat">
        <div className="lg:px-0 px-4 absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <h1 className="mb-4 text-xl font-medium text-white">IP Address Tracker</h1>
          
          <form
            onSubmit={handleSearchLocation}
            className="lg:mb-8 mb-4 w-[min(100%,384px)] flex"
          >
            <input
              type="text"
              name="ip-domain"
              id="ip-domain"
              placeholder="Search for any IP address or domain"
              onChange={(e) => setAddressDomainValue(e.target.value)}
              className="flex-1 text-sm px-4 border rounded-l-lg placeholder:text-sm"
            />

            <button
              type="submit"
              aria-label="search"
              className="p-2 w-11 text-white bg-black hover:bg-[#2b2b2b] rounded-r-lg"
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </form>

          {locationData ? (
            <AddressInfoBar
              ip={locationData.ip}
              city={locationData.location.city}
              state={locationData.location.region}
              postalCode={locationData.location.postalCode}
              timezone={locationData.location.timezone}
              isp={locationData.isp}
            />
          ) : (
            <AddressInfoBar
              ip="0.0.0.0"
              city="City"
              state="State"
              postalCode="0000"
              timezone="00:00"
              isp="Internet service provider"
            />
          )}
        </div>
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
