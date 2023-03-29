import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: {register: {}}
}

export const ReducerSlice = createSlice({
    name: 'jamii',
    initialState,
    reducers: {
        setRegsiter: (state, action) => {
            state.client.register = {...action.payload}
        }
    }
})

export const { setRegsiter } = ReducerSlice.actions

export default ReducerSlice.reducer;
