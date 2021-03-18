import dotenv from 'dotenv';

dotenv.config();

export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/bxjs';

export const twitterCreds = {
  consumer_key: process.env.TWIT_CONSUMER_KEY,
  consumer_secret: process.env.TWIT_CONSUMER_SECRET,
  access_token: process.env.TWIT_ACCESS_TOKEN,
  access_token_secret: process.env.TWIT_ACCESS_SECRET,
};
