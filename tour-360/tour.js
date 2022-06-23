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
        entity.setAttribute("geometry", { primitive: 'plane', height: 1, width: 2 });
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

const spheres = {
    "20floor1": {
        waypoints: [
            {
                src: "#20floor3", 
                position: "3 -1 -5", 
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: 3 -0.9 -5; loop: true; autoplay: true"
            }, //sala reunião
            {
                src: "#20floor4", 
                position: "0 0 9",
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: 0 0.1 9; loop: true; autoplay: true"
            } //sofás
        ],
        images: [
            {
                src: "#chat", 
                position: "-2.5 0 -5", 
                href: "https://chatbot.bndes.gov.br/atendimento",
                animation: "property: scale; dir: alternate; dur:1000; easing: linear; to: 1.1 1.1 1.1; loop: true; autoplay: true"
            }
        ]
    },
    "20floor2": {
        waypoints: [
            {
                src: "#20floor4", 
                position: "-0.2 -0.5 9",
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: -0.2 -0.4 9; loop: true; autoplay: true"
            }, //entrada sala
        ]
    },
    "20floor3": {
        waypoints: [
            {
                src: "#20floor1", 
                position: "5.7 -0.5 5",
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: 5.7 -0.4 5; loop: true; autoplay: true"
            }, //entrada sala
        ],
        videos: [
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-1 -0.05 5", rotation: "0 180 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "3.6 -0.2 1.3", rotation: "0 270 -2"}
        ]
    },
    "20floor4": {
        waypoints: [
            {
                src: "#20floor1", 
                position: "2.2 0.2 -9",
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: 2.2 0.3 -9; loop: true; autoplay: true"
            }, //entrada sala
            {
                src: "#20floor2", 
                position: "-8 0 -0.2", 
                rotation: "0 90 0",
                animation: "property: position; dir: alternate; dur:1000; easing: linear; to: -8 0.1 -0.2; loop: true; autoplay: true"
            }, //hall elevadores
        ]
    }
}