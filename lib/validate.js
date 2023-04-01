export const loginValidate = async (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Adresse email est requis"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Adresse email invalide';
    }

    if (!values.password) {
        errors.password = "Mot de passe est requis"
    } else if(values.password.includes(" ")) {
        errors.password = 'Mot de passe invalide';
    }

    return errors
}

export const registerValidate = async (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Adresse email est requis"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Adresse email invalide';
    }

    if (!values.password) {
        errors.password = "Mot de passe est requis"
    } else if (values.password.length <= 8) {
        errors.password = 'Mot de passe trop court';
    } else if(values.password.includes(" ")) {
        errors.password = 'Mot de passe invalide';
    }

    if (values.cpassword !== values.password) {
        errors.cpassword = "Mot de passe de confirmation différent"
    }

    if (!values.username) {
        errors.username = 'Nom d\'utilisateur est requis';
    } else if (values.username.length <= 3) {
        errors.username = 'Le nom d\'utilisateur doit avoir au délà de 3 caractères';
    }

    return errors
}

export const emailValidate = async (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Adresse email est requis"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Adresse email invalide';
    }

    return errors
}