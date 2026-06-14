let deferredPrompt = null;

const installButton =
        document.getElementById("btnInstall");

// Mostrar temporalmente el botón
installButton.style.display = "inline-block";

// Registrar Service Worker
if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =
                    await navigator.serviceWorker.register('./service-worker.js');

            console.log(
                    "Service Worker registrado",
                    registration
                    );

        } catch (error) {

            console.error(
                    "Error al registrar Service Worker",
                    error
                    );

        }

    });

}

// Evento cuando Chrome considera instalable la PWA
window.addEventListener(
        "beforeinstallprompt",
        (event) => {

    console.log("PWA INSTALABLE");

    event.preventDefault();

    deferredPrompt = event;

    installButton.style.display = "inline-block";

}
);

// Botón Instalar
installButton.addEventListener(
        "click",
        async () => {

    if (!deferredPrompt) {

        alert(
                "Chrome aún no considera instalable esta PWA."
                );

        return;

    }

    deferredPrompt.prompt();

    const result =
            await deferredPrompt.userChoice;

    console.log(
            "Resultado instalación:",
            result.outcome
            );

    deferredPrompt = null;

    installButton.style.display = "none";

}
);

// Evento cuando la instalación finaliza
window.addEventListener(
        "appinstalled",
        () => {

    console.log(
            "PWA instalada correctamente"
            );

    installButton.style.display = "none";

}
);
