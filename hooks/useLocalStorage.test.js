import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should initialize with fallback value if no stored value exists", () => {
        const { result } = renderHook(() => useLocalStorage("testKey", "fallback"));

        expect(result.current[0]).toBe("fallback");
    });

    it("should initialize with stored value if it exists", () => {
        localStorage.setItem("testKey", JSON.stringify("storedValue"));

        const { result } = renderHook(() => useLocalStorage("testKey", "fallback"));

        expect(result.current[0]).toBe("storedValue");
    });

    it("should update stored value when setValue is called", () => {
        const { result } = renderHook(() => useLocalStorage("testKey", "fallback"));

        act(() => {
            result.current[1]("newValue");
        });

        expect(result.current[0]).toBe("newValue");
        expect(JSON.parse(localStorage.getItem("testKey"))).toBe("newValue");
    });
});