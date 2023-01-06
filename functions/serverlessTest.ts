import { Handler } from '@netlify/functions'

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

const handler: Handler = async (event, context) => {
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
