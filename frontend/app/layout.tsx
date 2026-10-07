import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import { ToastProvider } from "@/context/toast-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://kanban.lapyaehmueaung.dev"),

    title: {
        default: "Kanban — Simple Task Management",
        template: "%s | Kanban",
    },

    description:
        "A simple Kanban task management app for organizing boards, tasks, priorities, and deadlines.",

    applicationName: "Kanban",

    keywords: [
        "Kanban",
        "Kanban board",
        "task management",
        "project management",
        "productivity",
    ],

    authors: [
        {
            name: "La Pyae Hmue Aung",
        },
    ],

    creator: "La Pyae Hmue Aung",

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        type: "website",
        url: "https://kanban.lapyaehmueaung.dev",
        siteName: "Kanban",
        title: "Kanban — Simple Task Management",
        description:
            "Organize your work with boards, tasks, priorities, and deadlines.",
    },

    twitter: {
        title: "Kanban — Simple Task Management",
        description:
            "Organize your work with boards, tasks, priorities, and deadlines.",
    },

    icons: {
        icon: "/icon.svg",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body>
                <main>
                    <QueryProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </QueryProvider>
                </main>
            </body>
        </html>
    );
}
