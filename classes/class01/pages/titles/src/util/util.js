import { knownGestures, gestureStrings } from "./gesures.js";

const fingerLookupIndexes = {
  thumb: [0, 1, 2, 3, 4],
  index_finger: [0, 5, 6, 7, 8],
  middle_finger: [0, 9, 10, 11, 12],
  ring_finger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export { knownGestures, gestureStrings, fingerLookupIndexes };
