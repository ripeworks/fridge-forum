import "tailwindcss/tailwind.css";
import Fridge from "fridge";

import { AuthProvider } from "../components/AuthProvider";

const fridge = new Fridge({
  fridgeId: process.env.NEXT_PUBLIC_FRIDGE_ID,
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider
      authenticate={async ({ token }) => {
        try {
          const user = await fridge.get("/users/me", { token, role: "member" });
          if (!user.id) {
            throw new Error("Not logged in");
          }

          return user;
        } catch (err) {
          return null;
        }
      }}
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}
