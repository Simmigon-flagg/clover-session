
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const user = {
          id: "100",
          email: "simmigon@gmail.com",
          name: "Simmigon",
          password: "123",
          image: null
        };

        if (!credentials) throw new Error("Missing email or password");
        const { email, password } = credentials;
        if (email === user.email && password === user.password) {
          return user;
        }
        throw new Error("Invalid credentials");

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {

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
