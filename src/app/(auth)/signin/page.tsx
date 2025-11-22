"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { signin } from "@/actions/signin";
import { redirect } from "next/navigation";

type SigninFormData = {
  email: string,
  password: string,
}

export default function SigninPage() {
  const [state, formAction, isPending] = useActionState(signin, {
    success: false,
    error: undefined,
  });

  const {
    register,
    formState: { errors },
  } = useForm<SigninFormData>();

  if(state.success) {
    redirect("/")
  }

  const redirectLogin =()=> {
    redirect("/signup");

  }


  return (

    <div className="min-h-screen bg-white flex justify-center items-center py-10">
      <div className="bg-[#f8f8f8] rounded-xl shadow-md w-full max-w-5xl grid md:grid-cols-2">

        <div className="p-10 border-r">
          <h2 className="text-2xl">Sign into MyLG</h2>

          <form action={formAction} className="space-y-5">
            <div>
              <label className="block text-sm">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address"
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-600 outline-none"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}

            </div>


            <div>
              <label >Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })

                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-600 outline-none"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#a50034] text-white px-5 py-2 rounded-md hover:bg-red-800 transition w-full mb-8 font-semibold">
              {isPending ? "Signing in.." : "SIGN IN"}
            </button>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            {state.success && (
              <p className="text-green-600 text-sm">Signed in successfully!</p>
            )}

          </form>

        </div>

        <div className="p-10 bg-[#f8f8f8]">
          <h2 className="text-xl font-semibold mb-5">Dont have an Account?</h2>
          <button onClick={() => redirectLogin()}
            className="bg-[#a50034] text-white px-5 py-2 rounded-md hover:bg-red-800 transition w-full mb-8 font-semibold"
          >
            SIGN UP</button>
        </div>

      </div>


    </div>
  )
}