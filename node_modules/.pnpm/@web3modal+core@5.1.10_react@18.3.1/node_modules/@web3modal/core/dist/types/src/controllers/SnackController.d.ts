export interface SnackControllerState {
    message: string;
    variant: 'error' | 'success' | 'loading';
    open: boolean;
}
export declare const SnackController: {
    state: SnackControllerState;
    subscribeKey<K extends keyof SnackControllerState>(key: K, callback: (value: SnackControllerState[K]) => void): () => void;
    showLoading(message: SnackControllerState['message']): void;
    showSuccess(message: SnackControllerState['message']): void;
    showError(message: unknown): void;
    hide(): void;
};
