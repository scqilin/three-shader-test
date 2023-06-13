import * as THREE from 'three';
import { BasicScene } from './core/scene';
export class Box extends BasicScene {
  cube: THREE.Mesh;
  clock = new THREE.Clock();
  constructor(dom: HTMLElement) {
    super(dom);
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.render();
  }

  protected renderOthers(): void {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.cube.rotation.y = this.clock.getElapsedTime();
  }
}