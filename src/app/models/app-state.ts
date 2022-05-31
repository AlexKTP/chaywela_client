import { DataState } from "../enums/data-state.enum";

export interface AppState<T> {
    dataState: DataState;
    appState?: T;
    error?: string;

}