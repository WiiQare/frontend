const BASE_URL = "";

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