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
}

const addWaypoints = (sphere, scene) => {
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

const addVideos = (sphere, scene) => {
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
            {src: "#20floor3", position: "3 -1 -5"}, //sala reunião
            {src: "#20floor4", position: "0 0 9"} //sofás
        ]
    },
    "20floor2": {
        waypoints: [
            {src: "#20floor4", position: "-0.2 -0.5 9"}, //entrada sala
        ]
    },
    "20floor3": {
        waypoints: [
            {src: "#20floor1", position: "5.7 -0.5 5"}, //entrada sala
        ],
        videos: [
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "-1 -0.05 5", rotation: "0 180 0"},
            {thumb: "#dicas_mpme_thumb", src: "dicas_mpme", position: "3.6 -0.2 1.3", rotation: "0 270 -2"}
        ]
    },
    "20floor4": {
        waypoints: [
            {src: "#20floor1", position: "2.2 0.2 -9"}, //entrada sala
            {src: "#20floor2", position: "-8 0 -0.2", rotation: "0 90 0"}, //hall elevadores
        ]
    }
}