const BASE_URL = "http://34.205.37.182/api/v1";

export async function sendEmail (formData) {
    try {
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/session/email-verification", Options);

        return response
    } catch (error) {
        return error
    }
}

export async function sendOtp (formData) {
    try {
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/session/email-validate-otp", Options);
        const json = await response.json();
        
        return json

    } catch (error) {
        return error
    }
}

export async function register (formData) {
    try {
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/payer", Options);
        const json = await response.json();
        
        return json
        
    } catch (error) {
        return error
    }
}

export async function login (credentials) {
    try {
        console.log("credentials: ", credentials);
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        }

        const response = await fetch(BASE_URL + "/session", Options);
        const json = await response.json();
        
        console.log("request", json);
        return json
        
    } catch (error) {
        return error
    }
}