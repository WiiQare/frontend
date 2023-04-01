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
        const json = await response.json();

        return json

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
            body: JSON.stringify(formData),
        }

        const response = await fetch(BASE_URL + "/session/email-validate-otp", Options);
        const json = await response.json();
        
        console.log("test", json);
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
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        }

        const response = await fetch(BASE_URL + "/session", Options);
        const json = await response.json();
        
        return json
        
    } catch (error) {
        return error
    }
}

export async function autocomplete(phone, token) {
    try {

        const Options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await fetch(`${BASE_URL}/payer/patient/${phone}`, Options);
        const json = await response.json();
        
        console.log(json);
        return json
        
    } catch (error) {
        return error
    }
}

export async function savePatient (formData) {
    try {
        console.log(formData);
        let token = formData.accessToken;

        delete formData.accessToken;

        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/payer/patient", Options);
        const json = await response.json();
        
        console.log("save", json);
        return json
        
    } catch (error) {
        return error
    }
}