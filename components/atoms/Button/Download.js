import React, { useEffect, useState } from "react";


const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(true);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };
    if (!supportsPWA) {
        return null;
    }
    return (
        <button
            className="link-button bg-gray-800 py-2.5 text-md font-medium uppercase text-center text-white rounded-lg"
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            onClick={onClick}
        >
            Install WiiQare App
        </button>
    );
};

export default InstallPWA;