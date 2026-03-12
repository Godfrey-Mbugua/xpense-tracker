import mongoose from 'mongoose';

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = process.env.MONGODB_URI_FALLBACK || process.env.MONGODB_URI_NON_SRV;

  const tryConnect = async (uri) => {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  };

  try {
    await tryConnect(primaryUri);
  } catch (error) {
    console.error(`MongoDB connect error (primary): ${error.message}`);

    if (fallbackUri) {
      console.log('Attempting to connect using fallback MongoDB URI...');
      try {
        await tryConnect(fallbackUri);
        return;
      } catch (err) {
        console.error(`MongoDB connect error (fallback): ${err.message}`);
      }
    }

    console.error('Failed to connect to MongoDB. If you are using an Atlas `mongodb+srv://` URI and your network blocks SRV DNS lookups, either provide a non-SRV connection string in the environment variable `MONGODB_URI_FALLBACK` (or `MONGODB_URI_NON_SRV`) or adjust your DNS/settings.');
    process.exit(1);
  }
};

export default connectDB;