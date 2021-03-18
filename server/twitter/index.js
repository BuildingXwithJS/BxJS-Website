import Twit from 'twit';
import { twitterCreds } from '../config.js';

export const Twitter = new Twit({
  ...twitterCreds,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

export const getTweetById = async (id) => {
  try {
    const { data: tweet } = await Twitter.get(`statuses/show/:id`, {
      id,
      tweet_mode: 'extended',
    });
    return tweet;
  } catch (err) {
    console.log('Error getting tweet:', err);
    return false;
  }
};

export const getTimeline = async (screenName = 'bxjsweekly') => {
  const { data: tweets } = await Twitter.get('statuses/user_timeline', {
    screen_name: screenName,
    tweet_mode: 'extended',
  });
  return tweets;
};
