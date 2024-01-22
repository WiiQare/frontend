import { registerValidate, emailValidate, loginValidate } from "./validate";


describe("loginValidate", () => {
    it("should return errors for missing email", async () => {
        const values = {
            password: "password123",
        };
        const errors = await loginValidate(values);
        expect(errors.email).toEqual("Adresse email ou numéro de téléphone est requis ");
    });

    it("should return errors for missing password", async () => {
        const values = {
            email: "joe@example.com"
        };
        const errors = await loginValidate(values);
        expect(errors.password).toEqual("Mot de passe est requis");
    });

    it("should return errors for password with spaces", async () => {
        const values = {
            email: "joe@example.com",
            password: "password with spaces",
        };
        const errors = await loginValidate(values);
        expect(errors.password).toEqual("Mot de passe invalide");
    });
});


describe("registerValidate", () => {
    it("should return errors for missing email", async () => {
        const values = {
            password: "password123",
            cpassword: "password123",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.email).toEqual("Adresse email est requis");
    });

    it("should return errors for invalid email", async () => {
        const values = {
            email: "invalidemail",
            password: "password123",
            cpassword: "password123",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.email).toEqual("Adresse email invalide");
    });

    it("should return errors for missing password", async () => {
        const values = {
            email: "john@example.com",
            cpassword: "password123",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.password).toEqual("Mot de passe est requis");
    });

    it("should return errors for short password", async () => {
        const values = {
            email: "john@example.com",
            password: "pass",
            cpassword: "password123",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.password).toEqual("Mot de passe trop court");
    });

    it("should return errors for password with spaces", async () => {
        const values = {
            email: "john@example.com",
            password: "password with spaces",
            cpassword: "password123",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.password).toEqual("Mot de passe invalide");
    });

    it("should return errors for mismatched passwords", async () => {
        const values = {
            email: "john@example.com",
            password: "password123",
            cpassword: "differentpassword",
            username: "john",
        };

        const errors = await registerValidate(values);

        expect(errors.cpassword).toEqual("Mot de passe de confirmation différent");
    });

    it("should return errors for missing username", async () => {
        const values = {
            email: "john@example.com",
            password: "password123",
            cpassword: "password123",
        };

        const errors = await registerValidate(values);

        expect(errors.username).toEqual("Nom d'utilisateur est requis");
    });

    it("should return errors for short username", async () => {
        const values = {
            email: "john@example.com",
            password: "password123",
            cpassword: "password123",
            username: "jo",
        };

        const errors = await registerValidate(values);

        expect(errors.username).toEqual(
            "Le nom d'utilisateur doit avoir au délà de 3 caractères"
        );
    });
});

describe("emailValidate", () => {
    it("should return errors for missing email", async () => {
        const values = {};

        const errors = await emailValidate(values);

        expect(errors.email).toEqual("Adresse email est requis");
    });

    it("should return errors for invalid email", async () => {
        const values = {
            email: "invalidemail",
        };

        const errors = await emailValidate(values);

        expect(errors.email).toEqual("Adresse email invalide");
    });

    it("should not return errors for valid email", async () => {
        const values = {
            email: "john@example.com",
        };

        const errors = await emailValidate(values);

        expect(errors.email).toBeUndefined();
    });
});