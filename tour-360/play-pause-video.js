AFRAME.registerComponent('play-pause-video', {
    init: function () {
        this.el.addEventListener("click", (element) => {
            var videoEl = element.target.components.material.data.src;
            if (!videoEl) { return; }
            element.target.object3D.visible = true;
            (videoEl.paused) ? videoEl.play() : videoEl.pause();
        });
    }
})