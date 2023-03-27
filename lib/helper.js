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