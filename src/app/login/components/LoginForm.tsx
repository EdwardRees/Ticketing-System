"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { Database } from "@/lib/database.types";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        const { session } = res.data;
        if (session) {
          const { access_token, refresh_token } = session;
          supabase.auth.setSession({ access_token, refresh_token });
          router.refresh();
          router.push("/");
        } else {
          setLoginError(true);
          setErrorMessage("Invalid email or password");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-1">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="mt-3 text-2xl">Login to your account</p>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div
              className="p-6 mt-6 text-left border w-96 rounded-xl  focus:text-blue-600"
              onSubmit={handleSignIn}
            >
              <label className="block">
                <span className="text-gray-500">Email</span>
                <input
                  type="email"
                  className="form-input mt-1 block w-full rounded-md py-2 dark:text-gray-100 text-gray-700 pl-2"
                  placeholder="
                Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-500">Password</span>
                <input
                  type="password"
                  className="form-input mt-1 block w-full rounded-md py-2 pl-2 text-gray-700 dark:text-gray-100"
                  placeholder="
                Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              <label className="block mt-4">
                {loginError ? (
                  <span className="text-red-500">{errorMessage}</span>
                ) : (
                  <span className="text-gray-500"> </span>
                )}
              </label>
              <br />
              <div className="flex items-center justify-between mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={handleSignIn}
                  id="login"
                  name="Login"
                >
                  Login
                </button>
                <Link
                  href="/register"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  id="register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
