"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginForm, loginSchema } from "@/libs/schemas/auth";
import { login } from "@/libs/auth";
import { useAuthRedirect } from "@/hooks/auth/useAuthRedirect";

const LoginPage = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState("");

    useAuthRedirect();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const loginHandler = async (data: LoginForm) => {
        setServerError("");

        try {
            await login(data);
            router.replace("/boards");
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15"></div>

                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        kanban
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Organize your work. Keep moving forward.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#2B2C37] p-6 shadow-2xl shadow-black/20 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to continue to your boards.
                        </p>
                    </div>

                    {/* Backend error */}
                    {serverError && (
                        <div
                            role="alert"
                            className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                        >
                            {serverError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(loginHandler)}
                        className="space-y-5"
                    >
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

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {errors.password && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Sign up */}
                    <div className="mt-6 border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-indigo-400 transition hover:text-indigo-300"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
