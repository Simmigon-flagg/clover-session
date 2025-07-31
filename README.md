# Clover‑Session 📧
# 🔐 Session Management App (Next.js + NextAuth)

This project demonstrates a session-based authentication system built with **Next.js** and **NextAuth**.

## ✨ Features

- 🔓 View non-protected pages without login
- 🔒 Block access to protected pages without authentication
- 👤 Allow users to log in
- 🕒 Create sessions with expiration time
- ⏱️ Expire sessions automatically after inactivity
- 🚪 Log out users and terminate their session
- 🔄 Sync session state across all open tabs (logout in one tab logs out all)

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)

## 📦 Getting Started

```bash
git clone git@github.com:Simmigon-flagg/clover-session.git
cd clover-session
npm install
npm run dev

---

## 1 Setup & Run

1. Open a terminal and run 
   ```bash
   npm install && npm run dev to start the code

2. Navigate to http://localhost:3000/
```
3. In the AuthOptions folder you can skip the MongoDB login for a local login by uncommenting the lines below 

```bash
   async authorize(credentials) {
         // User this for testing without MongoDB
         const user = {
           id: "100",
           email: "simmigon@gmail.com",
           name: "Simmigon",
           password: "123",
           image: null
        };
```
and commenting out this line for testing.

```bash
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
```

      

