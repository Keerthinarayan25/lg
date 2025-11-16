"use client";

import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { signup } from "@/actions/signup";
import { redirect } from "next/navigation";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, {
    success: false,
    error: undefined,
  });

  const {
    register,
    formState: { errors },
  } = useForm<SignupFormData>();

  if (state.success ) {
    redirect("/");
  }


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="bg-white rounded-xl shadow-md w-full max-w-4xl p-10">
        <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
        <p className="text-gray-600 text-sm mb-8">
          Simply enter your email and basic information to create an account. If
          you already have one, please sign in instead.
        </p>

        <form action={formAction}  className="space-y-6">


          <div>
            <label className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              {...register("name", { required: "First name is required" })}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="First Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-600 outline-none"
                placeholder="Password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Passwords must have at least 6 characters
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

          </div>

          {state.error && (
            <p className="text-red-600 text-sm font-medium">
              {state.error}
            </p>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`${isPending ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
                } text-white font-semibold px-6 py-2 rounded-md transition`}
              disabled={isPending}

            >
              {isPending ? "Signing up..." : "SIGN UP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
