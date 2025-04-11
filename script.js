const githubOrg = "BlueScreen-AeroSpace";
const githubRepo = "DIY_Water_Propeled_Rocket_Fusee_a_Eau";


async function fetchReleases() {
    try {
        const response = await fetch(`https://api.github.com/repos/${githubOrg}/${githubRepo}/releases`);

        if (!response.ok) {
            throw new Error("Error fetching releases");
        }

        const data = await response.json();

        const select = document.getElementById("builds-select");

        data.map((release) => {
            const option = document.createElement("option");
            option.value = release.tag_name;
            option.textContent = release.tag_name;
            select.appendChild(option);
        })
        select.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error("Error: ", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (isChromiumBased()) {
        fetchReleases();

        document.getElementById("builds-select").addEventListener("change", (e) => {
            const installBtn = document.getElementById("install-btn");

            installBtn.setAttribute("manifest", "manifest/manifest-" + e.target.value + ".json");
        })
    } else {
        const contentDiv = document.getElementById("content-div");

        contentDiv.innerHTML = "";
        contentDiv.innerHTML = `
            <div class="flex justify-center">
                <h3 class="text-zinc-300 text-2xl my-5">Sorry your browser in not supported. Use Chrome, Edge or Opera.</h3>
            </div>
        `
    }
});

window.addEventListener("DOMContentLoaded", () => {

});

function isChromiumBased() {
    const ua = navigator.userAgent;
    return ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR');
}