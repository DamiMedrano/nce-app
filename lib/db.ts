import { Redis } from '@upstash/redis';

// See documentation at
// https://docs.upstash.com/redis/sdks/javascriptsdk/getstarted#basic-usage
const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export async function getDataFromDB(key: string) {
  try {
    const result = await redis.get(key);
    console.log('data:', result);
    if (result === null) {
      console.error('No data found for key:', key);
      return null;
    } else {
      console.error('Data found for key:', key);
      return result;
    }
  } catch (error) {
    console.error('Error getting data from DB:', error);
  }
}

export async function setDataToDB(key: string, data: any) {
  try {
    await redis.set(key, data);
  } catch (error) {
    console.error('Error setting data to DB:', error);
  }
}

export default redis;
