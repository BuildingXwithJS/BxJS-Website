import mongoose from 'mongoose';

// destructure used things from CJS module
const { createConnection, Schema } = mongoose;

// connect to given URL
export const db = createConnection(
  process.env.MONGO_URL || 'mongodb://localhost/bxjs',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// handle DB errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  // exit immediately on error
  process.exit(1);
});

// connection ready
export const isConnected = new Promise((resolve) => db.once('open', resolve));

// twitter
const tweetSchema = new Schema({
  id: Number,
  text: String,
});
export const Tweet = db.model('Tweet', tweetSchema);
