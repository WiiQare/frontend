import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: {register: {}}
}

export const ReducerSlice = createSlice({
    name: 'jamii',
    initialState,
    reducers: {
        setRegister: (state, action) => {
            state.client.register = {...action.payload}
        }
    }
})

export const { setRegister } = ReducerSlice.actions

export default ReducerSlice.reducer;
