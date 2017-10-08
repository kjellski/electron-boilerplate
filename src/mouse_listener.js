// ------------------------------------------------
// add and remove the listener once the button is
// pressed / let go of or out of the window

export default (element, pressedMoveListener) => {
  element.addEventListener("mousedown", (event) => {
    element.addEventListener("mousemove", pressedMoveListener);
  });

  element.addEventListener("mouseup", (event) => {
    if (pressedMoveListener) {
      element.removeEventListener("mousemove", pressedMoveListener);
    }
  });

  element.addEventListener("mouseout", (event) => {
    if (pressedMoveListener) {
      element.removeEventListener("mousemove", pressedMoveListener);
    }
  })
};
