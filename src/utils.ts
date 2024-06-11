import { TokenTransition } from "codehike/utils/token-transitions";
import { interpolate, interpolateColors } from "remotion";

export function tweenStyle({
  element,
  keyframes,
  frame,
  frameDelay,
  frameDuration,
}: {
  element: HTMLElement;
  keyframes: TokenTransition["keyframes"];
  frame: number;
  frameDelay: number;
  frameDuration: number;
}) {
  const { translateX, translateY, color, opacity } = keyframes;
  if (opacity) {
    element.style.opacity = tween({
      frame,
      delayInFrames: frameDelay,
      durationInFrames: frameDuration,
      range: opacity,
    }).toString();
  }
  if (color) {
    element.style.color = tweenColor({
      frame,
      delay: frameDelay,
      duration: frameDuration,
      range: color,
    });
  }
  if (translateX || translateY) {
    const x = tween({
      frame,
      delayInFrames: frameDelay,
      durationInFrames: frameDuration,
      range: translateX!,
    });
    const y = tween({
      frame,
      delayInFrames: frameDelay,
      durationInFrames: frameDuration,
      range: translateY!,
    });
    element.style.translate = `${x}px ${y}px`;
  }
}

export function tween({
  frame,
  delayInFrames,
  durationInFrames,
  range,
}: {
  frame: number;
  delayInFrames: number;
  durationInFrames: number;
  range: [number, number];
}) {
  return interpolate(frame - delayInFrames, [0, durationInFrames], range, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function tweenColor({
  frame,
  delay,
  duration,
  range,
}: {
  frame: number;
  delay: number;
  duration: number;
  range: [string, string];
}) {
  return interpolateColors(frame - delay, [0, duration], range);
}
