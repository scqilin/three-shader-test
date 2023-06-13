import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BasicScene } from './core/scene';
import { createAxes } from './core/axes';
export class Test extends BasicScene {
  control: any;
  
  constructor(dom: HTMLElement) {
    super(dom);
    const axes = new createAxes();
    this.scene.add(axes.addBox());
    this.scene.add(axes.addAxes());
    // this.scene.add(new THREE.AxesHelper(5));
    this.control =  new OrbitControls(this.camera, this.renderer.domElement);
    this.control.autoRotate = true;
    this.control.autoRotateSpeed = 1;
    this.control.enablePan = false;

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    // 半球光
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
    this.scene.add(hemisphereLight);

    this.render();
  }

  renderOthers(): void {
    this.control && this.control.update();
  }

}