import { Task } from "./task";

export type Column = {
    id: number;
    name: string;
    position: number;

    tasks: Task[];
}
export type Board = {
    id: number;
    name: string;
    columns: Column[];

}

export type CreateBoardInput = {
    name: string;
    columns: {
        name: string;
        position: number;
    }[];

};
