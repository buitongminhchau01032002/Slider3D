//* CONSTANCE
const A = 450;
const B = 100;
const X0_RIGHT = 16;
const X0_LEFT = -16;
const DISTANCE = 80;
const START_Z = 120;
const SCALE_ORIGIN = 0.25;

function Slider3D({ elementOrigin, array, render, onUpdate }) {
    //* CREATE HTML
    let htmlString = array.map((elem, index, array) => render(elem, index, array)).join("");
    elementOrigin.innerHTML = htmlString;

    //* CREATE LIST DATA
    let elems = elementOrigin.childNodes;
    const dataList = Array.from(elems)
        .reverse()
        .map((elem, index) => {
            //* init style
            //! don't change 'position' and 'transformOrigin' in your code
            elem.style.position = "absolute";
            elem.style.transformOrigin = "100% 0%";
            if (index % 2 !== 0) {
                elem.style.transformOrigin = "0% 0%";
            }

            //* init value
            let y0 = elem.clientHeight / 2;
            let x0 = X0_LEFT;
            if (index % 2 !== 0) {
                x0 = X0_RIGHT;
            }
            let z0 = -index * DISTANCE + START_Z;
            return {
                element: elem,
                y0,
                x0,
                z0,
            };
        });

    let currentZ = 0;

    const update = (zMoved) => {
        let prevZ = currentZ;
        currentZ = zMoved;
        dataList.forEach((dataObj, index) => {
            let z = dataObj.z0 + zMoved;
            if (A - z <= 0) {
                dataObj.element.style.top = "100vh";
                return;
            }

            let k = A / (A - z);
            let x = (A * dataObj.x0) / (A - z);

            let y = (z * (B - dataObj.y0)) / (A - z) - dataObj.y0;

            //! don't change properties are seted below in your code (top, left, right, scale)
            dataObj.element.style.top = y + "px";
            if (index % 2 === 0) {
                dataObj.element.style.right = -x + "px";
            } else {
                dataObj.element.style.left = x + "px";
            }
            dataObj.element.style.transform = `scale(${k * SCALE_ORIGIN})`;

            if (onUpdate) {
                onUpdate({
                    element: dataObj.element,
                    x,
                    y,
                    z,
                    deltaZ: currentZ - prevZ,
                });
            }
        });
    };
    update(0);
    return update;
}

export default Slider3D;
