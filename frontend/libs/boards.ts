import { Board, CreateBoardInput } from "./types/board";

const API_URL = "http://localhost:8000";

export async function getBoards() {
    const response = await fetch(`${API_URL}/boards/`, {
        credentials: "include",
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.detail || "Failed to fetch boards");
    }

    return response.json();
}

export async function createBoard(boardData: CreateBoardInput): Promise<Board> {
    const response = await fetch(`${API_URL}/boards`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(boardData),
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.detail || "Failed to create board.");
    }

    return response.json();
}

export async function getBoard(boardId: string): Promise<Board> {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.detail || "Failed to get board.");
    }

    return response.json();
}

export async function updateBoard({
    boardId,
    data,
}: {
    boardId: number;
    data: CreateBoardInput;
}): Promise<Board> {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.detail || "Failed to update board.");
    }

    return response.json();
}

export async function deleteBoard(board_id: number): Promise<void> {
    const response = await fetch(`${API_URL}/boards/${board_id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.detail || "Failed to delete board.");
    }
}
