import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: {email: ''}
}

export const ReducerSlice = createSlice({
    name: 'jamii',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.client.email = action.payload.email
        }
    }
})

export const { setEmail } = ReducerSlice.actions

export default ReducerSlice.reducer;
