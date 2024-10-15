import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Call your NestJS API to register a user if they don't exist
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
          email: user.email,
          name: user.name,
          googleId: profile?.sub, // Google user ID
        });
        return true;
      } catch (error) {
        console.error("Error during user registration:", error);
        return false;
      }
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.id = token.sub; // Attach the user ID to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
