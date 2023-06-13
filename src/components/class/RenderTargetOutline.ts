import * as THREE from 'three';
import { BasicScene } from './core/scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import imgUrl from '../public/img/crate.gif?url';
export class RenderTargetOutline extends BasicScene {
    clock = new THREE.Clock();
    postCamera: THREE.OrthographicCamera;
    postScene: THREE.Scene;
    renderTarget: THREE.WebGLRenderTarget;
    cube: THREE.Mesh;
    sphere: THREE.Mesh;
    constructor(dom: HTMLElement) {
        super(dom);
        const { width, height } = this.getDomSize();
        const map = new THREE.TextureLoader().load(imgUrl);
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshBasicMaterial({ map });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sphereMaterial = new THREE.MeshNormalMaterial();
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 3;
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
                uThickness: { value: 0.01 },
                uColor: { value: new THREE.Color(0xff2390) },
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec3 uColor;
                uniform float uThickness;

                varying vec2 vUv;
                varying vec3 vNormal;

                void main() {
                    vec4 texel = texture2D(tDiffuse, vUv);
                    vec4 texelsum = vec4(0.0);
                    for(int i = 0; i < 8; i++) {
                        float x = cos(float(i) * 3.1415926 / 4.0);
                        float y = sin(float(i) * 3.1415926 / 4.0);
                        vec4 texel1 = texture2D(tDiffuse, vUv + vec2(x,y) * uThickness);
                        vec4 texel2 = texture2D(tDiffuse, vUv - vec2(x,y) * uThickness);
                        texelsum += texel1 + texel2;
                    }
                    texelsum = vec4(uColor, texelsum.a);
                    gl_FragColor = texel;
                    if( texel.a == 0.0) {
                        gl_FragColor = texelsum;
                    }
                }
            `,
            transparent: true,
        }));

        this.postScene.add(renderTargetPlane);

        this.render();
    }


    render = () => {
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