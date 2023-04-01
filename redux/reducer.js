import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: {register: {}, patient: {}}
}

export const ReducerSlice = createSlice({
    name: 'jamii',
    initialState,
    reducers: {
        setRegister: (state, action) => {
            state.client.register = {...action.payload}
        },
        setPatientDispatch: (state, action) => {
            state.client.patient = {...action.payload}
        }
    }
})

export const { setRegister, setPatientDispatch } = ReducerSlice.actions

export default ReducerSlice.reducer;
