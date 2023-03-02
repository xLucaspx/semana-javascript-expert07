export default class HandGestureView {
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
