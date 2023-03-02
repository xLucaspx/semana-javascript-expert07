export default class HandGestureView {
  #canvasHands = document.querySelector("#hands");
  #canvasContext = this.#canvasHands.getContext("2d");
  #fingerLookupIndexes;

  constructor({ fingerLookupIndexes }) {
    this.#canvasHands.width = globalThis.screen.availWidth;
    this.#canvasHands.height = globalThis.screen.availHeight;
    this.#fingerLookupIndexes = fingerLookupIndexes;
  }

  clearCanvas() {
    this.#canvasContext.clearRect(
      0,
      0,
      this.#canvasHands.width,
      this.#canvasHands.height
    );
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#canvasContext.fillStyle =
        handedness === "Left" ? "rgb(255, 32, 160)" : "rgb(53, 129, 255)";
      this.#canvasContext.strokeStyle = "white";
      this.#canvasContext.lineWidth = 8;
      this.#canvasContext.lineJoin = "round";

      // juntas
      this.#drawJoints(keypoints);
      // dedos
      this.#drawFingersAndHoverElements(keypoints);
    }
  }

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y,
    });

    element.dispatchEvent(event);
  }

  #drawJoints(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath();
      const newX = x - 2;
      const newY = y - 2;
      const radius = 3;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle);
      this.#canvasContext.fill();
    }
  }

  #drawFingersAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes); // pegando o nome dos dedos
    for (const finger of fingers) {
      const points = this.#fingerLookupIndexes[finger].map(
        // pegando as coordenadas de cada dedo
        (index) => keypoints[index]
      );
      const region = new Path2D();
      // [0] é o wrist
      const [{ x, y }] = points;
      for (const point of points) {
        region.lineTo(point.x, point.y);
      }
      this.#canvasContext.stroke(region);
    }
  }

  loop(fn) {
    requestAnimationFrame(fn); // vai executar a funçao a 60 fps
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: "smooth",
    });
  }
}
