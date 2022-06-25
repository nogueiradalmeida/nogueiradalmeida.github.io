AFRAME.registerComponent('tour', {
    init: function() {
        const scene = this.el.sceneEl;
        const id = this.el.components.material.data.src.id;
        
        addElements(id, scene);
    }
});

const clearElements = (scene) => {
    const children = document.querySelectorAll(".gui");
    children.forEach(child => scene.removeChild(child));
}

const addElements = (id, scene) => {
    const sphere = spheres[id];

    if (!sphere) return;

    addWaypoints(sphere, scene);
    addVideos(sphere, scene);
    addImages(sphere, scene);
    addModels(sphere, scene);
}

const addWaypoints = (sphere, scene) => {
    if (!sphere.waypoints) return;

    for (const waypoint of sphere.waypoints) {
        const entity = document.createElement('a-image');

        entity.setAttribute("src", "#pin");
        entity.setAttribute("geometry", { primitive: 'plane', height: 1, width: 1 });
        entity.setAttribute("event-set__mouseenter", { scale: "1.2 1.2 1" });
        entity.setAttribute("event-set__mouseleave", { scale: "1 1 1" });
        entity.setAttribute("event-set__click", { _target: "#image-360", _delay: 300, "material.src": waypoint.src });
        entity.setAttribute("proxy-event", { event: "click", to: "#image-360", as: "fade" });
        entity.setAttribute("position", waypoint.position);
        if (waypoint.rotation) {
            entity.setAttribute("rotation", waypoint.rotation);
        }
        if (waypoint.animation) {
            entity.setAttribute("animation", waypoint.animation)
        }

        entity.classList.add('gui');
        entity.classList.add('clickable');
        entity.addEventListener("click", () => {
            const waypointId = waypoint.src.replace('#', '');
            clearElements(scene);
            addElements(waypointId, scene);
        });

        scene.appendChild(entity);
    }
}

const addImages = (sphere, scene) => {
    if (!sphere.images) return;

    for (const image of sphere.images) {
        const entity = document.createElement('a-image');

        entity.setAttribute("src", image.src);
        entity.setAttribute("geometry", { primitive: 'plane', height: 1, width: 1 });
        entity.setAttribute("material", {shader: "flat"});

        entity.setAttribute("position", image.position);
        if (image.rotation) {
            entity.setAttribute("rotation", image.rotation);
        }
        if (image.href) {
            entity.setAttribute("redirect-to", {url: image.href})
        }
        if (image.animation) {
            entity.setAttribute("animation", image.animation)
        }

        entity.classList.add('gui');
        entity.classList.add('clickable');

        scene.appendChild(entity);
    }
} 

const addVideos = (sphere, scene) => {
    if (!sphere.videos) return;

    for (const video of sphere.videos) {
        const entity = document.createElement('a-image');

        entity.setAttribute("src", video.thumb);
        entity.setAttribute("geometry", { primitive: 'plane', height: 1.3, width: 2.1 });
        entity.setAttribute("background", "#white");
        entity.setAttribute("play-at-video-frame", {src: video.src })

        entity.setAttribute("position", video.position);
        if (video.rotation) {
            entity.setAttribute("rotation", video.rotation);
        }

        entity.classList.add('gui');
        entity.classList.add('clickable');

        scene.appendChild(entity);
    }
} 

const addModels = (sphere, scene) => {
    if (!sphere.models) return;

    for (const model of sphere.models) {
        const entity = document.createElement('a-entity');
  
        entity.setAttribute("gltf-model", model.src);
        entity.setAttribute("position", model.position);
        entity.setAttribute("scale", model.scale);
        if (model.rotation) {
            entity.setAttribute("rotation", model.rotation);
        }
        if (model.href) {
            entity.setAttribute("redirect-to", {url: model.href} )
        }

        entity.classList.add('gui');
        entity.classList.add('clickable');

        scene.appendChild(entity);
    }
} 

const floatAnimation = (position) => {
    const coordinates = position.split(" ");
    coordinates[1] = Number(coordinates[1]) + 0.1;
    return `property: position; dir: alternate; dur:1000; easing: linear; to: ${coordinates.join(" ")}; loop: true; autoplay: true`
}

let numeroAleatorio = Math.round(Math.random()*10000000000000000);
let urlAtendimento = "https://meet.jit.si/atendimentohumano" + numeroAleatorio;//ideia
urlAtendimento = "https://www.bndes.gov.br/wps/portal/site/home/quem-somos/canais-atendimento/fale-conosco--formulario-geral/!ut/p/z0/fY5NT8MwEER_C4ccrd3ShoqjVWgDSflUUfCl2iZOaoh3m9hB_HwC4sCJ40gz7w0YKMEwfbiWohOmbsqv5mK_fNysMr2YFZg-rFHP8S672e0QiyXcgpkKxWV-nS3usdg84Qx1mq_1y1U-x2f8JpwP29W2BXOieFSOG4Gyoc6qSlhCJb-MfyQTw731vdFgpk20nxHKA9c27B2H6OJY_bxN8CjeJtiP1qsgXkKCFTG5oGqrKFqunbccJcG_ftXI4MeOBidwejeHtGvPvgAKeXmE/"

const spheres = {
    "20floor1": {
        waypoints: [
            {
                src: "#20floor3", 
                position: "3 -1 -5", 
                animation: floatAnimation("3 -1 -5")
            }, //sala reunião
            {
                src: "#20floor4", 
                position: "0 0 9",
                animation: floatAnimation("0 0 9")
            } //sofás
        ],
        images: [
            {
                src: "#canal", 
                position: "-2.5 0 -5", 
                href: "https://ws.bndes.gov.br/canal-mpme/#/home",
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ]
    },
    "20floor2": {
        waypoints: [
            {
                src: "#20floor4", 
                position: "-0.2 -0.5 9",
                animation: floatAnimation("-0.2 -0.5 9")
            }, //entrada sala
        ],
        
        images: [
            {
                src: "#contato", 
                position: "0.4 -1.0 -4", 
                href: urlAtendimento ,
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ]
    },
    "20floor3": {
        waypoints: [
            {
                src: "#20floor1", 
                position: "5.7 -0.5 5",
                animation: floatAnimation("5.7 -0.5 5")
            }, //entrada sala
        ],
        videos: [
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-1 -0.05 5", rotation: "0 180 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "3.6 -0.2 1.3", rotation: "0 270 -2"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-6 0 5", rotation: "0 180 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-8.5 0 3.5", rotation: "0 180 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-4.5 -0.6 -7.3", rotation: "9 3 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-8.0 -0.6 -4.2", rotation: "6 3 0"}
        ]
    },
    "20floor4": {
        waypoints: [
            {
                src: "#20floor1", 
                position: "2.2 0.2 -9",
                animation: floatAnimation("2.2 0.2 -9")
            }, //entrada sala
            {
                src: "#20floor2", 
                position: "-8 0 -0.2", 
                rotation: "0 90 0",
                animation: floatAnimation("-8 0 -0.2")
            }, //hall elevadores
        ],
        models: [
            {
                src: "#robot", 
                href: "https://chatbot.bndes.gov.br/atendimento",
                scale: "2.1 2.1 2.1",
                position: "-5.5 -3.2 -3", 
                rotation: "0 90 0",
            }
        ] 
    }
}