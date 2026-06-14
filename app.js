let deferredPrompt;
const btnInstall = document.getElementById("btnInstall");

btnInstall.style.display = "none";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js")
            .then(reg => console.log("Service Worker registrado", reg))
            .catch(err => console.error("Error registrando SW:", err));
    });
}

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();

    deferredPrompt = e;
    btnInstall.style.display = "inline-block";
});

btnInstall.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
    btnInstall.style.display = "none";
});
