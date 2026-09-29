import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";

type BoardLayoutProps = {
    children: React.ReactNode;
};

const BoardLayout = async ({ children }: BoardLayoutProps) => {
    const cookieStore = await cookies();

    const response = await fetch("http://localhost:8000/auth/me", {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    if (!response.ok) {
        redirect("/");
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden md:flex-row">
            <Navbar />

            <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
    );
};

export default BoardLayout;
