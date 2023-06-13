import * as THREE from 'three';

interface IAxesOption {
    size?: {
        width?: number;
        height?: number;
        depth?: number;
    };
    color?: string;
}
/**
 * createAxes
 * createAxes will create a axes
 * @param option
 */
export class createAxes {
    size: {
        width: number;
        height: number;
        depth: number;
    };
    color: string;
    constructor(option: IAxesOption = {
        size: {
            width: 10,
            height: 10,
            depth: 10,
        },
        color: 'yellow'
    }) {
        this.size = {
            width: option.size?.width || 10,
            height: option.size?.height || 10,
            depth: option.size?.depth || 10,
        }
        this.color = option.color || 'yellow';
    }

    /**
     * addBox
     * @returns box
     */
    addBox() {
        const vertices = [
            [0, 0, 0],
            [this.size.width, 0, 0],
            [this.size.width, this.size.height, 0],
            [0, this.size.height, 0],
            [0, 0, this.size.depth],
            [this.size.width, 0, this.size.depth],
            [this.size.width, this.size.height, this.size.depth],
            [0, this.size.height, this.size.depth]
        ];
        const edges = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 4],
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7]
        ];
        const points: any = [];
        edges.forEach((edge) => {
            const start = vertices[edge[0]];
            const end = vertices[edge[1]];
            points.push(new THREE.Vector3(...start));
            points.push(new THREE.Vector3(...end));
        });
        const lineMaterial = new THREE.LineBasicMaterial({
            color: this.color,
            linewidth: 1
        });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.LineSegments(lineGeometry, lineMaterial);
        line.position.set(-this.size.width / 2, -this.size.height / 2, -this.size.depth / 2)
        return line;
    }

    /**
     * addAxes
     * @returns axes
     */
    addAxes() {
        const group = new THREE.Group();
        group.name = 'axes';

        const vertices = [ 
            [-this.size.width / 2, 0, 0],
            [this.size.height / 2, 0, 0],
            [0, -this.size.height / 2, 0],
            [0, this.size.height / 2, 0],
            [0, 0, -this.size.depth / 2],
            [0, 0, this.size.depth / 2],
        ];
        const edges = [
            [0, 1],
            [2, 3],
            [4, 5],
        ];
        const points: THREE.Vector3[] = [];
        edges.forEach((edge) => {
            const start = vertices[edge[0]];
            const end = vertices[edge[1]];
            points.push(new THREE.Vector3(...start));
            points.push(new THREE.Vector3(...end));
        }
        );
        const lineMaterial = new THREE.LineBasicMaterial({
            color: this.color
        });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(line);

        const dh = 0.25;
        const coneGeometry = new THREE.ConeGeometry(dh, dh*2, 32);
        const coneMaterial = new THREE.MeshLambertMaterial({ color: this.color });

        const conex = new THREE.Mesh(coneGeometry, coneMaterial);
        conex.position.set(this.size.width / 2 - dh, 0, 0);
        conex.rotation.z = -Math.PI / 2;
        group.add(conex);

        const coney = conex.clone();
        coney.position.set(0, this.size.height / 2 - dh, 0);
        coney.rotation.z = 0;
        group.add(coney);

        const conez = conex.clone();
        conez.position.set(0, 0, this.size.depth / 2 - dh);
        conez.rotation.z = 0;
        conez.rotation.x = Math.PI / 2;
        group.add(conez);
        
        return group;
    }

    /**
     * getSize 
     * @returns size
     */
    getSize() {
        return this.size;
    }
}