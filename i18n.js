import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    signIn: {
                        question: 'Don\'t you have an account ?',
                        title: 'Sign in to your account',
                        field: {
                            email: 'E-mail Address or Phone Number',
                            password: 'Tape your password'
                        },
                        forgot: 'Forgot your password ?',
                        buttons: {
                            submit: 'SIGN IN',
                            page: 'Register Now',
                            waiting: 'Wait a moment...',
                            or: 'OR',
                            google: 'Sign In with Google',
                            linkedin: 'Sign In with LinkedIn',
                            apple: 'Sign In with Apple ID'
                        }
                    },
                    welcomeSlider: {
                        1: {
                            title: "Access to healthcare is one of the biggest challenges in <span>Africa.</span>"
                        }
                    }
                }
            },
            fr: {
                translation: {
                    signIn: {
                        question: 'Vous n\'avez pas de compte ?',
                        title: 'Connectez-vous à votre compte',
                        field: {
                            email: 'Entrez votre adresse email ou Numéro de Téléphone',
                            password: 'Entrez votre mot de passe'
                        },
                        forgot: 'Mot de passe oublié ?',
                        buttons: {
                            submit: 'Se connecter',
                            waiting: 'En cours...',
                            page: 'S\'inscrire',
                            or: 'OU',
                            google: 'Se connecter avec Google',
                            linkedin: 'Se connecter avec LinkedIn',
                            apple: 'Se connecter avec Apple ID'
                        }
                    },
                    welcomeSlider: {
                        1: {
                            title: "L'accès aux soins de santé est l'un des plus grands défis en <span>Afrique.</span>"
                        }
                    }
                }
            }
        }
    });

export default i18n;