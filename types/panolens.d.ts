declare module "panolens" {
  import {
    Object3D,
    Vector3,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
  } from "three";

  export class ImagePanorama {
    constructor(image: string | HTMLImageElement);
    load(src?: string | HTMLImageElement): void;
    dispose(): void;
    // Add other methods and properties as needed
  }

  interface ViewerOptions {
    container?: HTMLElement;
    controlBar?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    cameraFov?: number;
    horizontalView?: boolean;
    output?: "none" | "console" | "overlay";
    viewIndicator?: boolean;
    clickTolerance?: number;
    // Add other options as needed
  }

  export class Viewer {
    constructor(options?: ViewerOptions);
    add(object: any): void;
    remove(object: any): void;
    getScene(): Scene;
    getCamera(): PerspectiveCamera;
    getRenderer(): WebGLRenderer;
    dispose(): void;
    // Add other methods and properties as needed
  }
}
