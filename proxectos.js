const projects = [
    {
        selector: ".project--galineiro",
        title: "Antigo galiñeiro restaurado",
        price: "67000€",
        place: "Ordes",
        year: "2018",
        before: "img/gallineroAntiguo.png",
        after: [
            {
                src: "img/gallineroRestaurado.png",
                alt: "Vista xeral do interior do galiñeiro restaurado con luz natural."
            },
            {
                src: "img/galinheiro2.png",
                alt: "Detalle da textura da pedra orixinal recuperada no muro oeste."
            },
            {
                src: "img/galinheiro3.jpeg",
                alt: "Relación do espazo interior coa paisaxe exterior a través da gran ventá."
            }
        ],
        // ----------------------------------------
        intro:
            "Unha nova vida para un espazo ligado á arquitectura rural galega.",
        start:
            "Un antigo galiñeiro de pedra, marcado pelo paso do tempo e polo seu uso orixinal.",
        proposal:
            "Recuperar o carácter do espazo e poñer en valor a pedra, a madeira e a relación coa paisaxe."
    },
    // Mantemos os outros proxectos coa estrutura antiga (cadeas simples)
    // para demostrar que o código actualizado segue sendo compatible.
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

    const afterContainer = dialog.querySelector("#detail-after-container");

    if (Array.isArray(project.after) && project.after.length > 1) {
        afterContainer.innerHTML = `
            <div class="dialog-carousel">
                <div class="dialog-carousel__track">
                    ${project.after.map((imageData) => {
            const src = typeof imageData === 'object' ? imageData.src : imageData;
            const alt = typeof imageData === 'object' ? imageData.alt : `${project.title}: despois da rehabilitación`;

            if (!src) return '';

            return `
                            <div class="dialog-carousel__slide">
                                <img src="${src}" alt="${alt}">
                            </div>
                        `;
        }).join('')}
                </div>
                <button class="dialog-carousel__btn dialog-carousel__btn--prev" type="button" aria-label="Imaxe anterior">‹</button>
                <button class="dialog-carousel__btn dialog-carousel__btn--next" type="button" aria-label="Imaxe seguinte">›</button>
                <div class="dialog-carousel__dots">
                    ${project.after.map((imageData, idx) => {
            const src = typeof imageData === 'object' ? imageData.src : imageData;
            if (!src) return '';

            return `<button class="dialog-carousel__dot ${idx === 0 ? 'active' : ''}" type="button" aria-label="Imaxe ${idx + 1}"></button>`;
        }).join('')}
                </div>
            </div>
        `;

        const track = afterContainer.querySelector(".dialog-carousel__track");
        const prevBtn = afterContainer.querySelector(".dialog-carousel__btn--prev");
        const nextBtn = afterContainer.querySelector(".dialog-carousel__btn--next");
        const dots = Array.from(afterContainer.querySelectorAll(".dialog-carousel__dot"));
        let currentIdx = 0;

        function goToSlide(index) {
            currentIdx = (index + track.children.length) % track.children.length; // Usamos track.children.length por seguridade
            track.style.transform = `translateX(-${currentIdx * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIdx));
        }

        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(currentIdx - 1);
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(currentIdx + 1);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", (e) => {
                e.stopPropagation();
                goToSlide(i);
            });
        });
    } else {
        const imageData = Array.isArray(project.after) ? project.after[0] : project.after;

        const afterSrc = typeof imageData === 'object' ? imageData.src : imageData;
        const afterAlt = typeof imageData === 'object' ? imageData.alt : `${project.title}: despois da rehabilitación`;

        afterContainer.innerHTML = `<img id="detail-after" src="${afterSrc}" alt="${afterAlt}">`;
    }

    lastTrigger = trigger;

    dialog.showModal();
    document.body.classList.add("project-dialog-open");
}

projects.forEach((project) => {
    const card = document.querySelector(project.selector);
    const trigger = card?.querySelector(".project__photo--swap");

    if (!card || !trigger) return;

    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "project-dialog");
    trigger.setAttribute("aria-label", `Ver ficha: ${project.title}`);

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

dialog.addEventListener("close", () => {
    document.body.classList.remove("project-dialog-open");
    lastTrigger?.focus({ preventScroll: true });
});