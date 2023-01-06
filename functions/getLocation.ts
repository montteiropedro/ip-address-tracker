import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

interface EventBodyProps {
  searchType: string;
  AddressDomainValue: string;
}

export const handler: Handler = async (event, context) => {
  const eventBody: EventBodyProps = JSON.parse(event.body || '');

  try {
    const res = await fetch(`${process.env.GEOAPI_BASE_URL}/country,city?apiKey=${process.env.GEOAPI_KEY}&${eventBody.searchType}=${eventBody.AddressDomainValue}`);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error trying to get the location data" })
    };
  }
}
