
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        // User this for testing without MongoDB
        // const user = {
        //   id: "100",
        //   email: "simmigon@gmail.com",
        //   name: "Simmigon",
        //   password: "123",
        //   image: null
        // };

        if (!credentials) throw new Error("Missing email or password");
        const { email, password } = credentials;
        if (!email || !password) throw new Error("Missing email or password");

        // Comment out lines 29 - 39 to remove MongoDB
        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Illegal arguments: string, undefined");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {

      if (user) {
        token.userId = user.id;
        token.createdAt = Date.now();
      } else {
        token.userId = token.userId ?? null;
      }

      token.updatedAt = Date.now();

      return token;
    },

    async session({ session, token }) {

      session.user._id = token.userId;
      session.createdAt = token.createdAt;
      session.updatedAt = token.updatedAt;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 10,
    updateAge: 5,
   
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};
