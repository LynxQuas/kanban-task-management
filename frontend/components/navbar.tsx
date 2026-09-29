"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getBoards } from "@/libs/boards";
import { Board } from "@/libs/types/board";
import CreateBoardModal from "./board/board-modal";
import DesktopNavbar from "./navbar/desktop-navbar";
import MobileNavbar from "./navbar/mobile-navbar";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useLogout } from "@/hooks/auth/useLogout";

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);

    const {
        data: boards = [],
        isLoading: isBoardsLoading,
        isError: isBoardsError,
    } = useQuery<Board[]>({
        queryKey: ["boards"],
        queryFn: getBoards,
    });

    const { data: user, isLoading: isUserLoading } = useCurrentUser();
    const { mutate: logout } = useLogout();

    return (
        <>
            <MobileNavbar
                boards={boards}
                isLoading={isBoardsLoading}
                isError={isBoardsError}
                user={user}
                isUserLoading={isUserLoading}
                onCreateBoard={() => setOpenModal(true)}
                onLogout={logout}
            />

            <DesktopNavbar
                boards={boards}
                isLoading={isBoardsLoading}
                isError={isBoardsError}
                user={user}
                isUserLoading={isUserLoading}
                onCreateBoard={() => setOpenModal(true)}
                onLogout={logout}
            />

            <CreateBoardModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default Navbar;
