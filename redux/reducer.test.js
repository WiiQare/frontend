import { ReducerSlice } from "./reducer";

describe("ReducerSlice", () => {
    let state;

    beforeEach(() => {
        state = {
            client: {
                register: {},
                patient: {},
            },
        };
    });

    it("should set register", () => {
        const action = {
            payload: { name: "John", age: 25 },
        };

        ReducerSlice.caseReducers.setRegister(state, action);

        expect(state.client.register).toEqual(action.payload);
    });

    it("should set patient dispatch", () => {
        const action = {
            payload: { id: 1, name: "Jane" },
        };

        ReducerSlice.caseReducers.setPatientDispatch(state, action);

        expect(state.client.patient).toEqual(action.payload);
    });
});