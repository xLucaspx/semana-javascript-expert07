const { GestureDescription, Finger, FingerCurl } = window.fp;

const scrollUpGesture = new GestureDescription("scroll-up"); // 🖐
const scrollDownGesture = new GestureDescription("scroll-down"); // ✊️
const clickGesture = new GestureDescription("click"); // 🤏

// Scroll up
// -----------------------------------------------------------------------------

// no finger should be curled
for (const finger of Finger.all) {
  scrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Scroll Down
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
scrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
scrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  scrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  scrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Click
// -----------------------------------------------------------------------------
// thumb should be straight
// accept curl with a bit lower confidence
clickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
clickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);


// index slightly curled
// accept full curl with a bit lower confidence
clickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
clickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);

// other fingers: curled
for (const finger of [Finger.Middle, Finger.ring, Finger.Pinky]) {
  clickGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  clickGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

const knownGestures = [scrollDownGesture, scrollUpGesture, clickGesture];

const gestureStrings = {
  "scroll-up": "🖐",
  "scroll-down": "✊️",
  click: "🤏",
};

export { knownGestures, gestureStrings };
