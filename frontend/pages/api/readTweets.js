// import { createGraphqlClientWithAdminSecret } from '../../components/graphql/client.js';
import Twit from 'twit';

const twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_SECRET,
});

export default async function handler(req, res) {
  // const adminClient = createGraphqlClientWithAdminSecret(
  // process.env.HASURA_GRAPHQL_ADMIN_SECRET
  // );

  const { data } = await twitter.get('statuses/home_timeline', {
    count: 200,
    tweet_mode: 'extended',
    // since_id: lastTweet.id,
  });

  const links = [];

  const tweets = data.map((item) => {
    // if it's not a retweet - return tweet text
    if (!item.retweeted_status) {
      // extract links
      item.entities?.urls?.forEach((urlItem) => {
        const fullUrl = urlItem.expanded_url;
        links.push(fullUrl);
      });

      return {
        id: item.id,
        account: item.user.screen_name,
        text: item.full_text,
        date: item.created_at,
        lang: item.lang,
      };
    }

    // extract links
    item.retweeted_status.entities?.urls?.forEach((urlItem) => {
      const fullUrl = urlItem.expanded_url;
      links.push(fullUrl);
    });

    return {
      id: item.retweeted_status.id,
      account: item.retweeted_status.user.screen_name,
      text: item.retweeted_status.full_text,
      date: item.retweeted_status.created_at,
      lang: item.retweeted_status.lang,
    };
  });

  res.status(200).json({ tweets, links });
}
