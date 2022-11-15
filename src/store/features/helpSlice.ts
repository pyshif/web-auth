import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

export type StateHelp = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const initialState = {
    status: 'loading'
}

export const apiTellMe = createAsyncThunk<void, { accessToken: string, feedback: string }>('help/tellme', async ({ accessToken, feedback }) => {
    const response = await api.v1.help.tellMe(accessToken, feedback);
});

const helpSlice = createSlice({
    name: 'help',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(apiTellMe.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiTellMe.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';
            })
            .addCase(apiTellMe.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
            })
    }
});



export default helpSlice.reducer;