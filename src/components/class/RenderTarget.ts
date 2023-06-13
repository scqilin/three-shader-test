import * as THREE from 'three';
import { BasicScene } from './core/scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class RenderTarget extends BasicScene {
    clock = new THREE.Clock();
    postCamera: THREE.OrthographicCamera;
    postScene: THREE.Scene;
    renderTarget: THREE.WebGLRenderTarget;
    cube: THREE.Mesh;
    sphere: THREE.Mesh;
    constructor(dom: HTMLElement) {
        super(dom);

        const { width, height } = this.getDomSize();
        
        const geometry = new THREE.BoxGeometry(5,5,5);
        const material = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sphereMaterial = new THREE.MeshNormalMaterial();
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 6;
        this.scene.add(this.sphere);
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enablePan = false;

        const sk = 1;
        this.postCamera = new THREE.OrthographicCamera(-sk, sk, sk, -sk, 0.1, 1000);
        this.postScene = new THREE.Scene();
        this.postCamera.position.z = 10;
        this.postScene.add(this.postCamera);

        const planeGeometry = new THREE.PlaneGeometry(sk * 2, sk * 2);

        this.renderTarget = new THREE.WebGLRenderTarget(width, height);
        const renderTargetPlane = new THREE.Mesh(planeGeometry, new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: this.renderTarget.texture },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                varying vec2 vUv;
                void main() {
                    float dx = step(0.7, fract(vUv.y * 20.0));
                    vec4 col = texture2D(tDiffuse, vUv);
                    col.r += dx;
                    gl_FragColor = col;
                }
            `,
            transparent: true
        }));

        this.postScene.add(renderTargetPlane);

        this.render();
    }

    render = ()=> {
        requestAnimationFrame(this.render);
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.postScene, this.postCamera);
        this.cube.rotation.y = this.clock.getElapsedTime();
        this.sphere.position.x = -Math.sin(this.clock.getElapsedTime()) * 6;
        this.sphere.position.z = Math.cos(this.clock.getElapsedTime()) * 6;
    }
}