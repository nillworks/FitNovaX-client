import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin, jwt } from 'better-auth/plugins';
import { ac, limitedAdminRole, userAc, trainerRole } from './admin/permissions';

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('fitcore_Data');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      accountType: {
        defaultValue: 'user',
        input: true,
      },
      height: {
        type: 'string',
        required: false,
      },
      weight: {
        type: 'string',
        required: false,
      },
      goal: {
        type: 'string',
        required: false,
      },
      level: {
        type: 'string',
        required: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async user => {
          const role = user.accountType === 'trainer' ? 'trainer' : 'user';
          return {
            data: {
              ...user,
              role,
            },
          };
        },
      },
    },
  },

  plugins: [
    jwt(),
    admin({
      ac,
      roles: {
        admin: limitedAdminRole,
        user: userAc,
        trainer: trainerRole,
      },
      adminUserIds: process.env.TOP_ADMIN_USER_ID
        ? [process.env.TOP_ADMIN_USER_ID]
        : [],
    }),
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
