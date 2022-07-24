import Slider3D from "./slider3d.js";

const getPhotoSrc = () =>
    `https://picsum.photos/${Math.floor(Math.random() * 200 + 600)}/${Math.floor(
        Math.random() * 200 + 600
    )}?random=${Math.floor(Math.random() * 1000)} `;

const updateSlider = Slider3D({
    elementOrigin: document.querySelector(".imgs"),
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    render: (_elem, index, _array) =>
        `<div class="img" id=img-${index}><img src=${getPhotoSrc()}></div>`,
    onUpdate: ({ element, z }) => {
        element.style.opacity = z > -140 ? 1 : 0;
    },
});

function updateImgs() {
    let zMoved = document.documentElement.scrollTop / 10;
    updateSlider(zMoved);
}

window.addEventListener("scroll", updateImgs);
updateImgs();
