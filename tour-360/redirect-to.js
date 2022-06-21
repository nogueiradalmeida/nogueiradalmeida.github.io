AFRAME.registerComponent('redirect-to', {
    schema: {
        url: {default: ''},
        target: {default: '_blank'}
    },
    init: function () {
        this.el.addEventListener("click", () => {
            window.open(this.data.url, this.data.target)
        });
    }
});
