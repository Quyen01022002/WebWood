const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const toggleButtons = $$("#toggleBtn");
const toggleIcons = $$(".toggle-icon");

toggleButtons.forEach( (button, index) => {
    const toggleIcon = toggleIcons[index];

    button.addEventListener("click", function () {
        var video = button.closest(".video-wrapper").querySelector("video");

        if (video.paused) {
            video.play();
            toggleIcon.classList.remove('fa-play')
            toggleIcon.classList.add('fa-pause')
        }
        else {
            video.pause();
            toggleIcon.classList.remove('fa-pause')
            toggleIcon.classList.add('fa-play')
        }
    });
});
