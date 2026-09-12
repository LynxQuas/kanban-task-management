"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address."),

    password: z
        .string()
        .min(1, "Password is required."),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const loginHandler = (data: LoginForm) => {
        console.log(data);

        // Later:
        // loginMutation(data);
    };

    const loginWithGoogle = () => {
        // Later:
        // window.location.href =
        //     "http://localhost:8000/auth/google";
    };

    const loginWithGithub = () => {
        // Later:
        // window.location.href =
        //     "http://localhost:8000/auth/github";
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15">
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
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to continue to your boards.
                        </p>
                    </div>

                    {/* OAuth */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={loginWithGoogle}
                            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#20212C] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >
                            <span className="text-base font-semibold">
                                G
                            </span>

                            <span>Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={loginWithGithub}
                            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#20212C] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >

                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />

                        <span className="text-xs text-gray-600">
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Email login */}
                    <form
                        onSubmit={handleSubmit(loginHandler)}
                        className="space-y-5"
                    >
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
                            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.99]"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign up */}
                    <div className="mt-6 border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{" "}
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

