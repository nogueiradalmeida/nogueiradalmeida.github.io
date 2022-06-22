AFRAME.registerComponent('mouse-cursor', {
    init: function () {
        this.el.sceneEl.addEventListener("enter-vr", () => {
            this.el.removeAttribute("cursor");

            const cursor = document.createElement("a-cursor");
            cursor.setAttribute("animation__click", {
                property: "scale",
                from: "0.1 0.1 0.1", 
                to: "1 1 1", 
                easing: "easeInCubic", 
                dur: 150, 
                startEvents: "click"
            });
            cursor.setAttribute("animation__fusing", {
                property: "fusing",
                from: "0.1 0.1 0.1", 
                to: "0.1 0.1 0.1", 
                dur: 1500, 
                startEvents: "fusing"
            });
            cursor.setAttribute("event-set__mouseenter", {
                _event: "mouseenter",
                color: "springgreen"
            });
            cursor.setAttribute("event-set__mouseleave", {
                _event: "mouseleave",
                color: "black"
            });
            cursor.setAttribute("raycaster", {
                objects: ".clickable"
            });

            this.el.appendChild(cursor);
        });

        this.el.sceneEl.addEventListener("exit-vr", () => {
            this.el.setAttribute("cursor", "rayOrigin", "mouse");

            const cursors = this.el.getChildren().filter(c => c.localName == 'a-cursor');
            if (!cursors) return;
            cursors.forEach(c => this.el.removeChild(c));
        });
    }
})