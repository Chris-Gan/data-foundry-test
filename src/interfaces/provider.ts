import { store } from 'context/store';

// everything related to theme provider
export type ColorMode = 'light' | 'dark';

// everything related to redux provider
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface ThunkApi {
    state: RootState;
    dispatch: AppDispatch;
}
