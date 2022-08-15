import  Vec3  from '../libs/vec3.js';

AFRAME.registerComponent('tour', {
    init: function () {
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

    changeSkyRotation(sphere);
    setTimeout(startSkyVideo, 1000);
    addWaypoints(sphere, scene);
    addVideos(sphere, scene);
    addImages(sphere, scene);
    addModels(sphere, scene);
}

const changeSkyRotation = (sphere, el) => {
    if (!sphere.rotation) return;
    const sky = getSky();
    sky.setAttribute("rotation", sphere.rotation);
}

const startSkyVideo = () => {
    const sky = getSky();
    const videoEl = sky.components.material.data.src;
    if (videoEl?.play) {
        videoEl.play();  
      }
}

const getSky = () => {
    return document.getElementById("image-360");
}

const addWaypoints = (sphere, scene) => {
    if (!sphere.waypoints) return;

    for (const waypoint of sphere.waypoints) {
        const entity = document.createElement('a-image');
 
        const src = waypoint.src || "#pin"
        entity.setAttribute("src", src);
        entity.setAttribute("geometry", { primitive: 'plane', height: 1, width: 1 });
        entity.setAttribute("event-set__mouseenter", { scale: "1.2 1.2 1" });
        entity.setAttribute("event-set__mouseleave", { scale: "1 1 1" });
        entity.setAttribute("event-set__click", { _target: "#image-360", _delay: 300, "material.src": waypoint.scene });
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
            const waypointId = waypoint.scene.replace('#', '');
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
        entity.setAttribute("material", { shader: "flat" });

        entity.setAttribute("position", image.position);
        if (image.rotation) {
            entity.setAttribute("rotation", image.rotation);
        }
        if (image.href) {
            entity.setAttribute("redirect-to", { url: image.href })
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
        entity.setAttribute("play-at-video-frame", { src: video.src })

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
            entity.setAttribute("redirect-to", { url: model.href })
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

const fromCylindrical = (r, phi, z) => {
    const vec = Vec3.fromCylindricalCoords(r, phi, z);
    return `${vec.x} ${vex.y} ${vec.z}`;
}

let numeroAleatorio = Math.round(Math.random() * 10000000000000000);
let urlAtendimento = "https://meet.jit.si/atendimentohumano" + numeroAleatorio;//ideia
urlAtendimento = "https://www.bndes.gov.br/wps/portal/site/home/quem-somos/canais-atendimento/fale-conosco--formulario-geral/!ut/p/z0/fY5NT8MwEER_C4ccrd3ShoqjVWgDSflUUfCl2iZOaoh3m9hB_HwC4sCJ40gz7w0YKMEwfbiWohOmbsqv5mK_fNysMr2YFZg-rFHP8S672e0QiyXcgpkKxWV-nS3usdg84Qx1mq_1y1U-x2f8JpwP29W2BXOieFSOG4Gyoc6qSlhCJb-MfyQTw731vdFgpk20nxHKA9c27B2H6OJY_bxN8CjeJtiP1qsgXkKCFTG5oGqrKFqunbccJcG_ftXI4MeOBidwejeHtGvPvgAKeXmE/"

const spheres = {
    "sala-de-reuniao-4-pessoas": {
        waypoints: [
            {
                scene: "#corner-sala-reuniao",
                position: "3 0 2",
                rotation: "0 45 0",
                animation: floatAnimation("3 0 2"),
            }
        ]
    },
    "corner-sala-reuniao": {
        rotation: "0 -45 0",
        waypoints: [
            {
                scene: "#corner-imprensa",
                position: "9 0 0",
                rotation: "0 90 0",
                animation: floatAnimation("9 0 0")
            },
            {
                scene: "#sala-de-reuniao-4-pessoas",
                position: "-4 0 -.7",
                rotation: "0 90 0 ",
                animation: floatAnimation("-4 0 -.7")
            },
            {
                scene: "#corner-2005-reunioes",
                position: "2 0 9",
                rotation: "0 0 0",
                animation: floatAnimation("2 0 9"),
            }
        ]
    },
    "sala-2007-reuniao-4-pessoas":{
        rotation: "0 230 0",
        waypoints: [
            {
                scene: "#corner-2005-reunioes",
                position: "-0.5 0.5 2",
                rotation: "0 0 0",
                animation: floatAnimation("-0.5 0.5 2"),
            }
        ],
        videos: [
            { thumb: "#dicas_mpme_thumb", 
              src: "dicas_mpme", 
              position: "7.9 1.2 -3.9", 
              rotation: "0 -110 0"
            }
        ]
    },
    "sala-2006":{
        rotation: "0 230 0",
        waypoints: [
            {
                scene: "#corner-2005-reunioes",
                position: "-0.5 0.5 2",
                rotation: "0 0 0",
                animation: floatAnimation("-0.5 0.5 2"),
            }
        ],
        videos: [
            { thumb: "#dicas_mpme_thumb", 
              src: "dicas_mpme", 
              position: "7.9 1.2 -3.9", 
              rotation: "0 -110 0"
            }
        ]
    },
    "sala-2005":{
        rotation: "0 230 0",
        waypoints: [
            {
                scene: "#corner-2005-reunioes",
                position: "-0.5 0.5 2",
                rotation: "0 0 0",
                animation: floatAnimation("-0.5 0.5 2"),
            }
        ],
        videos: [
            { thumb: "#dicas_mpme_thumb", 
              src: "dicas_mpme", 
              position: "7.9 1.2 -3.9", 
              rotation: "0 -110 0"
            }
        ]
    },
    "sala-2004":{
        rotation: "0 230 0",
        waypoints: [
            {
                scene: "#corner-2005-reunioes",
                position: "-0.5 0.5 2",
                rotation: "0 0 0",
                animation: floatAnimation("-0.5 0.5 2"),
            }
        ],
        videos: [
            { thumb: "#dicas_mpme_thumb", 
              src: "dicas_mpme", 
              position: "7.9 1.2 -3.9", 
              rotation: "0 -110 0"
            }
        ]
    },
    "corner-imprensa": {
        rotation: "0 -130 0",
        waypoints: [
            {
                scene: "#sala-imprensa",
                position: "3 -1 -5",
                animation: floatAnimation("3 -1 -5")
            },
            {
                scene: "#lounge-imprensa",
                position: "0 0 9",
                animation: floatAnimation("0 0 9")
            },
            {
                scene: "#corner-sala-reuniao",
                position: "-9 0 -1.5",
                rotation: "0 90 0",
                animation: floatAnimation("-9 0 -1.5"),
            },
        ],
        images: [
            {
                src: "#canal",
                position: "-5.95 0.9 -3.1",
                rotation: "1 0 0",
                href: "https://ws.bndes.gov.br/canal-mpme/#/home",
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            },
            {
                src: "#avatar",
                position: "-4 -0.5 1",
                rotation: "0 90 0",
                href: "https://reunioes.bndes.gov.br/falenometaverso",
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; from: 1.2 2.0 1.1; to: 1.1 2.0 1.1; loop: true; autoplay: true"                
            },
            {
                src: "#contato",
                position: "-5 -0.5 5",
                rotation: "0 90 0",
                href: urlAtendimento,
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ],
        models: [
            {
                src: "#robot",
                href: "https://chatbot.bndes.gov.br/atendimento",
                scale: "2 2 2",
                position: "-8 -2.5 5",
                rotation: "0 90 0",
                animation: floatAnimation("-0.6 0.2 -5")
            }
        ]
    },
    "hall-elevadores": {
        rotation: "0 90 0",
        waypoints: [
            {
                scene: "#lounge-imprensa",
                position: "-0.2 -0.5 9",
                animation: floatAnimation("-0.2 -0.5 9")
            }, //entrada sala
        ],

        images: [
            {
                src: "#contato",
                position: "0.4 -1.0 -4",
                href: urlAtendimento,
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ]
    },
    "corner-2005-reunioes" : {
        rotation: "0 0 0",
        waypoints: [
            {
                scene: "#corner-2001-multiuso",
                position: "-0.4 -0.4 8",
                animation: floatAnimation("-0.4 -0.4 8")
            }, //entrada sala            
            {
                scene: "#sala-2007-reuniao-4-pessoas",
                src: "#placa-orientacoes-gerais",
                position: "0.8 0.2 -5",
                rotation: "0 0 0",
                animation: floatAnimation("0.8 0.2 -5")
            },//outro canto da sala       
            {
                scene: "#sala-2006", 
                src: "#placa-capital-de-giro",
                position: "-2.8 0.2 -0.1", 
                rotation: "0 90 0",
                animation: floatAnimation("-2.8 0.2 -0.1")
            },
            {
                scene: "#sala-2005", 
                src: "#placa-maquinas-e-equipamentos",
                position: "-2.8 0.2 1.5", 
                rotation: "0 90 0",
                animation: floatAnimation("-2.8 0.2 1.5")
            },
            {
                scene: "#sala-2004", 
                src: "#placa-sustentabilidade",
                position: "-2.2 0.2 5", 
                rotation: "0 -250 0",
                animation: floatAnimation("-2.2 0.2 5")
            },            
            {
                scene: "#video-boas-vindas",
                src: "#placa-bem-vindo",
                position: "-0.6 0.2 -5",
                rotation: "0 0 0",
                animation: floatAnimation("-0.6 0.2 -5")
            },  
            {
                scene: "#corner-sala-reuniao",
                position: "3.5 -0.2 -3",
                rotation: "0 -90 0",
                animation: floatAnimation("3.5 -0.2 -3")
            }
        ],
        models: [
            {
                src: "#robot",
                href: "https://chatbot.bndes.gov.br/atendimento",
                scale: "2.1 2.1 2.1",
                position: "5.5 -3.2 -1",
                rotation: "0 -90 0",
            }
        ]
    },
    "video-boas-vindas" : {
        rotation: "0 125 0",
        waypoints: [
            {
                scene: "#corner-2005-reunioes",
                position: "-2.7 -.5 3",
                animation: floatAnimation("-2.7 -.5 3"),
                rotation: "0 -45 0",
            }
        ],
    },
    "sala-imprensa": {
        rotation: "0 192 0",
        waypoints: [
            {
                scene: "#corner-imprensa",
                position: "5.7 -0.5 5",
                animation: floatAnimation("5.7 -0.5 5")
            }, //entrada sala
        ],
        videos: [
             { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-2.6 0.5 7", rotation: "0 193 0" }
            
            // { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "3.6 -0.2 1.3", rotation: "0 270 -2" },
            // { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-6 0 5", rotation: "0 180 0" },
            // { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-8.5 0 3.5", rotation: "0 180 0" },
            // { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-4.5 -0.6 -7.3", rotation: "9 3 0" },
            // { thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-8.0 -0.6 -4.2", rotation: "6 3 0" }
        ]
    },
    "sala-multiuso-centro" : {
        rotation: "0 192 0",
        waypoints: [
            {
                scene: "#corner-2001-multiuso",
                position: "5.7 -0.5 5",
                animation: floatAnimation("5.7 -0.5 5")
            }, //entrada sala
        ]
    },
    "lounge-imprensa": {
        rotation: "0 180 0",
        waypoints: [
            {
                scene: "#corner-imprensa",
                position: "2.2 0.2 -9",
                animation: floatAnimation("2.2 0.2 -9")
            }, //entrada sala
            {
                scene: "#hall-elevadores",
                position: "-8 0 -0.2",
                rotation: "0 90 0",
                animation: floatAnimation("-8 0 -0.2")
            }, //hall elevadores
            {
                scene: "#corner-2001-multiuso",
                position: "-1.5 -0.9 5",
                rotation: "0 0 0",
                animation: floatAnimation("-1.5 -0.9 5")
            },//outro canto da sala            
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
    },
    "corner-2001-multiuso": {
        rotation: "0 -110 0",
        waypoints: [
            {
                scene: "#lounge-imprensa",
                position: "-4.2 -0.5 -1",
                rotation: "0 100 0",
                animation: floatAnimation("-4.2 -0.5 -1")
            }, //entrada sala
            {
                scene: "#corner-2005-reunioes",
                position: "-2.2 -0.5 9",
                animation: floatAnimation("-2.2 -0.5 9")
            }, //corredor
            {
                scene: "#sala-multiuso-centro",
                position: "4.2 -0.5 -3",
                rotation: "0 100 0",
                animation: floatAnimation("4.2 -0.5 -3")
            }, //sala-multiuso-centro
            
        ],

        images: [
            {
                src: "#contato",
                position: "0.4 -1.0 -4",
                href: urlAtendimento,
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ]
    }
}