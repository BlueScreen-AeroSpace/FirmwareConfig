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

        select.innerHTML = "";

        data.map((release) => {
            const option = document.createElement("option");
            option.value = release.tag_name;
            option.textContent = release.tag_name;
            select.appendChild(option);
        })
        select.dispatchEvent(new Event('change'));
        console.log(data);
    } catch (error) {
        console.error("Error: ", error);
    }
}

window.addEventListener("DOMContentLoaded", fetchReleases);
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("builds-select").addEventListener("change", (e) => {
        const installBtn = document.getElementById("install-btn");

        installBtn.setAttribute("manifest", "manifest/manifest-" + e.target.value);
    })  
});