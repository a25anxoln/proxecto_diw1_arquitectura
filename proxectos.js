const projects = [
    {
        selector: ".project--galineiro",
        title: "Antigo galiñeiro restaurado",
        price: "67000€",
        place: "Ordes",
        year: "2018",
        before: "img/gallineroAntiguo.png",
        after: "img/gallineroRestaurado.png",
        intro:
            "Unha nova vida para un espazo ligado á arquitectura rural galega.",
        start:
            "Un antigo galiñeiro de pedra, marcado polo paso do tempo e polo seu uso orixinal.",
        proposal:
            "Recuperar o carácter do espazo e poñer en valor a pedra, a madeira e a relación coa paisaxe."
    },
    {
        selector: ".project--terra",
        title: "Casa rural de pedra en Terra Chá",
        price: "54000€",
        place: "Terra Chá",
        year: "2021",
        before: "img/terraChaAntes.png",
        after: "img/terraChaDespues.png",
        intro:
            "Tradición e confort nunha casa de pedra da Terra Chá.",
        start:
            "Unha vivenda rural de pedra cunha identidade estreitamente vinculada á súa contorna.",
        proposal:
            "Respectar a arquitectura existente e conciliar a súa esencia tradicional coas necesidades da vida actual."
    },
    {
        selector: ".project--corte",
        title: "Antiga corte restaurada",
        price: "46000€",
        place: "Ourense",
        year: "2026",
        before: "img/antigaCorte.png",
        after: "img/corteRestaurada.png",
        intro:
            "Unha mirada contemporánea sobre un espazo de orixe agrícola.",
        start:
            "Unha antiga corte na que os materiais e a estrutura conservan a memoria do seu uso.",
        proposal:
            "Dar continuidade á historia do lugar mediante unha rehabilitación respectuosa coa súa identidade rural."
    },
    {
        selector: ".project--pontevedra",
        title: "Casa rural en Pontevedra",
        price: "122000€",
        place: "Pontevedra",
        year: "2020",
        before: "img/casaRuralPontevedra.png",
        after: "img/casaRuralPontevedraDespues.png",
        intro:
            "Recuperar o patrimonio construído sen perder a súa esencia.",
        start:
            "Unha casa rural de pedra cuxa presenza forma parte da paisaxe e da memoria do lugar.",
        proposal:
            "Equilibrar a conservación do carácter tradicional cunha nova etapa de uso e habitabilidade."
    }
];

const dialog = document.querySelector("#project-dialog");
const closeButton = dialog.querySelector(".project-detail__close");

const fields = {
    title: dialog.querySelector("#detail-title"),
    location: dialog.querySelector("#detail-location"),
    intro: dialog.querySelector("#detail-intro"),
    before: dialog.querySelector("#detail-before"),
    after: dialog.querySelector("#detail-after"),
    start: dialog.querySelector("#detail-start"),
    proposal: dialog.querySelector("#detail-proposal"),
    place: dialog.querySelector("#detail-place"),
    year: dialog.querySelector("#detail-year"),
    price: dialog.querySelector("#detail-price"),

};

let lastTrigger = null;

function openProject(project, trigger) {
    if (dialog.open) return;

    fields.price.textContent = project.price ?? "Consultar";
    fields.title.textContent = project.title;
    fields.location.textContent = `${project.place} · ${project.year}`;
    fields.intro.textContent = project.intro;
    fields.start.textContent = project.start;
    fields.proposal.textContent = project.proposal;
    fields.place.textContent = project.place;
    fields.year.textContent = project.year;

    fields.before.src = project.before;
    fields.before.alt = `${project.title}: antes da rehabilitación`;

    fields.after.src = project.after;
    fields.after.alt = `${project.title}: despois da rehabilitación`;

    lastTrigger = trigger;

    dialog.showModal();
    document.body.classList.add("project-dialog-open");
}

projects.forEach((project) => {
    const card = document.querySelector(project.selector);
    const trigger = card?.querySelector(".project__photo--swap");

    if (!card || !trigger) return;

    // Aproveita o elemento enfocable que xa existe no teu HTML.
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "project-dialog");
    trigger.setAttribute("aria-label", `Ver ficha: ${project.title}`);

    // Permite abrir a ficha desde a imaxe ou o título da tarxeta.
    card.addEventListener("click", () => {
        openProject(project, trigger);
    });

    trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(project, trigger);
        }
    });
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

// Pechar ao pulsar no fondo exterior.
dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (outside) dialog.close();
});

// Escape péchao de forma nativa; tamén restaura o foco.
dialog.addEventListener("close", () => {
    document.body.classList.remove("project-dialog-open");
    lastTrigger?.focus({ preventScroll: true });
});
