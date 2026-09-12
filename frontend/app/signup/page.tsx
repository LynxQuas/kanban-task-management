"use client";

import Link from "next/link";
import {  LayoutDashboard } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required."),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const signupHandler = (data: SignupForm) => {
        console.log(data);

        // Later:
        // signupMutation(data);
    };

    const signupWithGoogle = () => {
        // Later:
        // window.location.href =
        //     "http://localhost:8000/auth/google";
    };

    const signupWithGithub = () => {
        // Later:
        // window.location.href =
        //     "http://localhost:8000/auth/github";
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15">
                        <LayoutDashboard
                            size={24}
                            className="text-indigo-400"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        kanban
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Organize your work. Keep moving forward.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/10 bg-[#2B2C37] p-6 shadow-2xl shadow-black/20 sm:p-8">
                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Create your account
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Start organizing your work with Kanban.
                        </p>
                    </div>

                    {/* OAuth */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Google */}
                        <button
                            type="button"
                            onClick={signupWithGoogle}
                            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#20212C] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >
                            <span className="text-base font-semibold">
                                G
                            </span>

                            <span>Google</span>
                        </button>

                        {/* GitHub */}
                        <button
                            type="button"
                            onClick={signupWithGithub}
                            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#20212C] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >

                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />

                        <span className="text-[10px] font-medium tracking-wider text-gray-600">
                            OR SIGN UP WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(signupHandler)}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Name
                            </label>

                            <input
                                {...register("name")}
                                id="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Your name"
                                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {errors.name && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Email
                            </label>

                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {errors.email && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Password
                            </label>

                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {errors.password && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Confirm password
                            </label>

                            <input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Repeat your password"
                                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {errors.confirmPassword && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.99]"
                        >
                            Create account
                        </button>
                    </form>

                    {/* Login */}
                    <div className="mt-6 border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/"
                                className="font-medium text-indigo-400 transition hover:text-indigo-300"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignupPage;

