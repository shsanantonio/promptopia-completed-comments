/**
 * Setting up Google Auth: https://next-auth.js.org
 * Everu nextjs route is a serverless route
 */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, //will be provided from project created from google cloud and will be included in .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, ////will be provided from project created from google cloud and will be included in .env
    })
  ],
  callbacks: { //necessary, must be an object containing the async functions
    async session({ session }) { // to get the session, user needs to signin
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email }); //find email by session 
      session.user.id = sessionUser._id.toString();

      return session; // makes sure which user is currently online  
    },
    async signIn({ account, profile, user, credentials }) {
        /* lambda function that only opens up when called, every time its called it spins up the server and make a connection to the database
         * We don't need to keep the server running constantly unless we make a connection
        */
      try { 
        await connectToDB();

        // checks if user already exists
        const userExists = await User.findOne({ email: profile.email }); //find by email

        // if not, create a new user and save in MongoDB
        if (!userExists) {
          await User.create({ //saves to database
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // always replace a space with no space
            image: profile.picture,
          });
        }

        return true; //successfully signed in 
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
