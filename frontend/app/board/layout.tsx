import Navbar from "@/components/navbar";

type BoardLayoutProps = {
    children: React.ReactNode;
};

const BoardLayout = ({ children }: BoardLayoutProps) => {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <Navbar />

            <main className="min-w-0 flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default BoardLayout;
