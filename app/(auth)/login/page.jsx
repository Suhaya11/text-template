"use client";
import { BiHide, BiShow, BiCodeAlt } from "react-icons/bi";
import { MdEmail, MdLockOutline } from "react-icons/md";
import { useState, useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/lib/actions/auth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-green-600 p-3 rounded-xl mb-4 shadow-lg shadow-green-900/20">
            <BiCodeAlt size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your snippet vault</p>
        </div>

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 ml-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                <MdEmail size={20} />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className={`block w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${state?.errors?.email ? "border-red-500" : "border-gray-600"} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500 hover:bg-gray-700`}
                placeholder="name@company.com"
                required
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-500 text-xs ml-1">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-green-500 hover:text-green-400"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                <MdLockOutline size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`block w-full pl-10 pr-12 py-3 bg-gray-700/50 border ${state?.errors?.password ? "border-red-500" : "border-gray-600"} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500 hover:bg-gray-700`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="text-red-500 text-xs ml-1">
                {state.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-green-900/30 mt-4 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-green-500 font-medium hover:text-green-400"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
