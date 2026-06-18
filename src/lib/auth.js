import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin, jwt } from 'better-auth/plugins';

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('fitcore_Data');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: 'user',
        input: true,
      },
    },
  },

  plugins: [jwt()],
});
