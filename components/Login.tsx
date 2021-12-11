import Fridge from "fridge";
import { useState } from "react";
import { useAuthContext } from "./AuthProvider";

const fridge = new Fridge();

export default function Login() {
  const [email, setEmail] = useState("");
  const { login, pending } = useAuthContext();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { token } = await fridge.post("/auth/login", { email });
      login(token.token);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {pending && (
            <div className="rounded-md bg-blue-50 p-4 mt-4 text-sm text-blue-700">
              Check your email..
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
