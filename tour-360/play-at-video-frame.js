AFRAME.registerComponent('play-at-video-frame', {
    schema: {
        src: {default: ''}
    },
    init: function () {
        this.el.addEventListener("click", (element) => {
            const camera = document.querySelector("[camera]");

            const videoFrame = document.createElement("a-video");
            videoFrame.setAttribute("width", "2");
            videoFrame.setAttribute("height", "1");
            videoFrame.setAttribute("position", "0 0 -1");
            videoFrame.setAttribute("play-pause-video", "");
            videoFrame.setAttribute("src", `#${this.data.src}`);
            videoFrame.classList.add("clickable");
            camera.appendChild(videoFrame);

            const videoEl = document.getElementById(this.data.src);
            videoEl.currentTime = 0;
            videoEl.play();

            const background = document.createElement("a-entity");
            background.setAttribute("id", "video-backgroung");
            background.setAttribute("geometry", {primitive: "plane", height: 2, width: 4});
            background.setAttribute("material", {shader: "flat", color: "black", opacity: 0.7});
            background.setAttribute("position", "0 0 -1.1");
            background.setAttribute("close-video-frame", "");
            background.classList.add("clickable");
            camera.appendChild(background);

            background.addEventListener("click", () => {
                camera.removeChild(background);
                camera.removeChild(videoFrame)
                videoEl.pause();
            });
        });
    }
});

