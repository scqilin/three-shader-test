/**
 * Pixel8
 * 获取像素点 8px * 8px 
 * https://fusion-pixel-font.takwolf.com/
 * https://xantorohara.github.io/led-matrix-editor/
 * 字符串
 */
export class Pixel8 {
    canvas: HTMLCanvasElement;
    ctx: any;
    width: number = 40;
    height: number = 40;
    loading: boolean = false;
    strObj: any = {}
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext('2d');
        const fontPixel8 = new FontFace('pixel8', 'url(./font/fusion-pixel-8px-proportional.ttf)');
        fontPixel8.load().then((font) => {
            document.fonts.add(font);
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = 'black';
            this.ctx.font = 'bold 46px fusion-pixel-8px-proportional, sans-serif';
            this.loading = true;
        });
    }

    getPixel(text: string) {
        if (!this.loading) {
            setTimeout(() => {
                return this.getPixel(text); 
            }, 100);
        } else {
            return this.drawText(text);
        }
    }

    // //改成promise
    // getPixel(text: string) : Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         if (!this.loading) {
    //             setTimeout(() => {
    //                 resolve(this.getPixel(text));
    //             }, 100);
    //         } else {
    //             resolve(this.drawText(text));
    //         }
    //     }).then((res) => {
    //         return res;
    //     })
    // }

    private drawText(text: string) {
        text = text.slice(0, 1);
        if(text == undefined || text == ' ') return;
        if(this.strObj[text]){
            return this.strObj[text];
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillText(text, this.width / 2 + 3, this.height / 2 + 3);
        const data = this.ctx.getImageData(0, 0, this.width, this.height).data;
        const colorArr: any = [];
        let row = [2, 7, 12, 17, 22, 27, 32, 37];
        let col = [2, 7, 12, 17, 22, 27, 32, 37];
        row.map((item, i) => {
            if (!colorArr[i]) {
                colorArr[i] = [];
            }
            col.map((item2, j) => {
                const k = item * 4 * 40 + item2 * 4;
                const a = data[k + 3];
                if (a === 255) {
                    colorArr[i][j] = 1;
                } else {
                    colorArr[i][j] = 0;
                }
            })
        })

        const hexArr:any = [];
        for (let y = 0; y < 8; y++) {
            let hex = '';
            for (let x = 0; x < 8; x++) {
                hex += colorArr[y][x];
            }
            hex = hex.split('').reverse().join('');
            hexArr.push(parseInt(hex, 2).toString(16).padStart(2, '0'));
        }
        const hexStr = hexArr.reverse().join('');
        this.strObj[text] = hexStr;
        console.log('hexStr :>> ',text, hexStr);
        return hexStr;
    }
}