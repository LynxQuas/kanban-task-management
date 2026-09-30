"use client";

import Link from "next/link";
import { LayoutDashboard, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupForm, signupSchema } from "@/libs/schemas/auth";
import { signup } from "@/libs/auth";
import { useAuthRedirect } from "@/hooks/auth/useAuthRedirect";

const SignupPage = () => {
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    useAuthRedirect();

    const signupHandler = async (data: SignupForm) => {
        setServerError("");
        setSuccessMessage("");

        try {
            const response = await signup(data);

            setSuccessMessage(response.message);
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-4 py-8">
            <div className="w-full max-w-md">
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

                <div className="rounded-2xl border border-white/10 bg-[#2B2C37] p-6 shadow-2xl shadow-black/20 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Create your account
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Start organizing your work with Kanban.
                        </p>
                    </div>

                    {successMessage && (
                        <div
                            role="status"
                            className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
                        >
                            <div className="flex items-start gap-3">
                                <CheckCircle2
                                    size={20}
                                    className="mt-0.5 shrink-0 text-emerald-400"
                                />

                                <div>
                                    <p className="text-sm font-medium text-emerald-300">
                                        {successMessage}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/"
                                className="mt-4 block w-full rounded-lg bg-emerald-500/10 px-4 py-2.5 text-center text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                            >
                                Continue to sign in
                            </Link>
                        </div>
                    )}

                    {serverError && (
                        <div
                            role="alert"
                            className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                        >
                            {serverError}
                        </div>
                    )}

                    {!successMessage && (
                        <form
                            onSubmit={handleSubmit(signupHandler)}
                            className="space-y-5"
                        >
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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>
                        </form>
                    )}

                    {!successMessage && (
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
                    )}
                </div>
            </div>
        </main>
    );
};

export default SignupPage;
