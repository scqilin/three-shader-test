import * as THREE from 'three';
/**
* BasicScene
* BasicScene is a basic scene class
* It will create a scene, a camera, a renderer
* and append the renderer.domElement to the dom
* @param dom
*/
export class BasicScene {
    dom: HTMLElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    constructor(dom: HTMLElement) {
        this.dom = dom;
        if (!this.dom) {
            throw new Error('dom is not defined');
        }
        const { width, height } = this.getDomSize();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(width, height);
        this.dom.appendChild(this.renderer.domElement);

        this.camera.position.set(15, 10, 20);
        this.camera.lookAt(0, 0, 0);

        // this.render(); //invoke render in child class
    }

    /**
     * render
     */
    protected render = () => {
        this.renderer.render(this.scene, this.camera);
        this.renderOthers();
        requestAnimationFrame(this.render);
    };

    /**
    * render others
    */
    protected renderOthers() {}

    /**
    * get dom size
    */
    getDomSize() {
        return {
            width: this.dom.offsetWidth || 100,
            height: this.dom.offsetHeight || 100
        }
    }

    /**
    * resize renderer
    */
    resize() {
        if (!this.renderer) return;
        const { width, height } = this.getDomSize();
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}