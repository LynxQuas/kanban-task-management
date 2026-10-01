import { LoginForm, SignupForm } from "./schemas/auth";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

type SignupResponse = {
    message: string;
};

type LoginResponse = {
    access_token: string;
    token_type: string;
};

export async function signup(userData: SignupForm): Promise<SignupResponse> {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            confirmation: userData.confirmPassword,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to create account.");
    }

    return data;
}

export async function login(userData: LoginForm): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to login.");
    }

    return data;
}

export async function logout(): Promise<void> {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to logout.");
    }
}
