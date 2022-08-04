AFRAME.registerComponent('play-pause-video', {
    init: function () {
        this.el.addEventListener("click", (element) => {
            var videoEl = 
                element.target.components.material.data.src
                || element.target.components.material.src;
            if (!videoEl || !videoEl.play) { return; }
            element.target.object3D.visible = true;
            (videoEl.paused) ? videoEl.play() : videoEl.pause();
        });
    }
})