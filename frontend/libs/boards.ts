import { Board, CreateBoardInput } from "./types/board";

const API_URL = "http://localhost:8000";

export async function getBoards() {
    const response = await fetch(`${API_URL}/boards/`);

    if (!response.ok) {
        throw new Error("Failed to fetch boards");
    }

    return response.json();
}

export async function createBoard(boardData: CreateBoardInput): Promise<Board> {
    const response = await fetch(`${API_URL}/boards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(boardData),
    });

    if (!response.ok) {
        throw new Error("Failed to create board");
    }

    return response.json();
}

export async function getBoard(boardId: string): Promise<Board>{
    const response = await fetch(`${API_URL}/boards/${boardId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch board");
    }

    return response.json();
}
