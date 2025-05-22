
$(document).ready(() => {
    const rawGithubTokenURL = "https://raw.githubusercontent.com/X-Faxz/X-RW.AlwaysFaxz/main/token.json";

    const elements = {
        token: $("#token"),
        goBtn: $("#go-btn"),
        teamTable: $("#team-table"),
        enemyTable: $("#enemy-table"),
        tokenExpiration: $("#token-expiration"),
        autoReady: $("#autoReady")
    };

    function validateTokenFromGithub(token) {
        return fetch(rawGithubTokenURL)
            .then(res => {
                if (!res.ok) throw new Error("Gagal mengakses token list dari GitHub.");
                return res.json();
            })
            .then(data => {
                if (data.tokens.includes(token)) {
                    elements.tokenExpiration.text("Token valid.");
                    return true;
                } else {
                    alert("Token tidak valid.");
                    return false;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error saat validasi token.");
                return false;
            });
    }

    elements.goBtn.on("click", async () => {
        const token = elements.token.val().trim();
        if (!token) {
            alert("Token tidak boleh kosong.");
            return;
        }

        const valid = await validateTokenFromGithub(token);
        if (!valid) return;

        // Jika valid, kirim ke websocket atau lanjut proses
        alert("Token valid, lanjut proses...");
    });
});
