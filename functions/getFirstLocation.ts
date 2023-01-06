import { Handler } from '@netlify/functions'
import * as dotenv from 'dotenv';
dotenv.config();

export const handler: Handler = async (event, context) => {
  try {
    const res = await fetch(`${process.env.GEOAPI_BASE_URL}/country,city?apiKey=${process.env.GEOAPI_KEY}`);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error trying to get the initial location data" })
    };
  }
}
