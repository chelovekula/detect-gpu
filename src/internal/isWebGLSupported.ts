// Vendor
import { IResult } from 'detect-ua';

// Types
import { TVoidable } from '../types';

export const isWebGLSupported = ({
  browser,
}: {
  browser: boolean | IResult;
}): TVoidable<WebGLRenderingContext> => {
  const attributes = {
    alpha: false,
    antialias: false,
    depth: false,
    failIfMajorPerformanceCaveat: true,
    powerPreference: 'high-performance',
    stencil: false,
  };

  // Workaround for Safari 12
  // SEE: https://github.com/TimvanScherpenzeel/detect-gpu/issues/5
  if (typeof browser !== 'boolean' && browser.name === 'Safari' && browser.version.includes('12')) {
    delete attributes.powerPreference;
  }

  // Keep reference to the canvas and context in order to clean up
  // after the necessary information has been extracted
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);

  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    return;
  }

  return gl;
};
