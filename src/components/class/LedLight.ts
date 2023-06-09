export class LedLight {
    ledSize = 8; // 基于 8*8的点阵 
    bitWidth = 2; // 位数
    size = 5; // 点阵大小
    color = '#00bcd4'; // 点阵颜色
    shadowBlur = 0.5; // 点阵阴影
    // https://xantorohara.github.io/led-matrix-editor
    // 8*8 led 点阵
    ledStrs = {
        "0": "3c66666e76663c00",
        "1": "7e1818181c181800",
        "2": "7e060c3060663c00",
        "3": "3c66603860663c00",
        "4": "30307e3234383000",
        "5": "3c6660603e067e00",
        "6": "3c66663e06663c00",
        "7": "1818183030667e00",
        "8": "3c66663c66663c00",
        "9": "3c66607c66663c00",

        "A": "6666667e66663c00",
        "B": "3e66663e66663e00",
        "C": "3c66060606663c00",
        "D": "3e66666666663e00",
        "E": "7e06063e06067e00",
        "F": "0606063e06067e00",
        "G": "3c66760606663c00",
        "H": "6666667e66666600",
        "I": "3c18181818183c00",
        "J": "1c36363030307800",
        "K": "66361e0e1e366600",
        "L": "7e06060606060600",
        "M": "c6c6c6d6feeec600",
        "N": "c6c6e6f6decec600",
        "O": "3c66666666663c00",
        "P": "06063e6666663e00",
        "Q": "603c766666663c00",
        "R": "66361e3e66663e00",
        "S": "3c66603c06663c00",
        "T": "18181818185a7e00",
        "U": "7c66666666666600",
        "V": "183c666666666600",
        "W": "c6eefed6c6c6c600",
        "X": "c6c66c386cc6c600",
        "Y": "1818183c66666600",
        "Z": "7e060c1830607e00",
        "a": "7c667c603c000000",
        "b": "3e66663e06060600",
        "c": "3c6606663c000000",
        "d": "7c66667c60606000",
        "e": "3c067e663c000000",
        "f": "0c0c3e0c0c6c3800",
        "g": "3c607c66667c0000",
        "h": "6666663e06060600",
        "i": "3c18181800180000",
        "j": "1c36363030003000",
        "k": "66361e3666060600",
        "l": "1818181818181800",
        "m": "d6d6feeec6000000",
        "n": "6666667e3e000000",
        "o": "3c6666663c000000",
        "p": "06063e66663e0000",
        "q": "f0b03c36363c0000",
        "r": "060666663e000000",
        "s": "3e403c027c000000",
        "t": "1818187e18180000",
        "u": "7c66666666000000",
        "v": "183c666600000000",
        "w": "7cd6d6d6c6000000",
        "x": "663c183c66000000",
        "y": "3c607c6666000000",
        "z": "3c0c18303c000000"
    };
    ctx: CanvasRenderingContext2D;
    dx = 0;
    width: number = 1
    height: number = 1
    imgData: ImageData;
    rolInt: number;

    constructor(div, option = {
        bitWidth: 2,
        size: 5,
        color: '#00bcd4',
        shadowBlur: 0.5,
        // 自定义字符集
        charset: {}
    }) {
        this.bitWidth = option.bitWidth ?? this.bitWidth;
        this.size = option.size ?? this.size;
        this.color = option.color ?? this.color;
        this.shadowBlur = option.shadowBlur ?? this.shadowBlur;
        if (option.charset) {
            this.ledStrs = Object.assign(this.ledStrs, option.charset);
        }
        const width = this.bitWidth * this.ledSize * this.size, height = this.ledSize * this.size + this.size;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        div.value.appendChild(canvas);
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.size * this.shadowBlur;

        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    run(str) {
        const arr = str.padStart(this.bitWidth, '').split('');
        this.ctx.clearRect(0, 0, this.width, this.height);
        arr.reverse().forEach((e, i) => {
            this.drawNum((this.bitWidth - i - 1) * 8, e);
        });
        this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.putImageData(this.imgData, -this.dx, 0);
    }

    /**
     * 滚动画布
     * @param int 滚动间隔时间
     * 默认 1000/60 每秒60帧
     * 传0 不会滚动
     * */  
    scroll(int = 1000/60 ) {
        if(int > 0){
            this.rolInt && clearInterval(this.rolInt);
            this.dx = 0;
            this.rolInt = setInterval(() => {
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.ctx.putImageData(this.imgData, -this.dx, 0);
                this.ctx.putImageData(this.imgData, this.width - this.dx, 0);
                this.dx++;
                if (this.dx >= this.width) {
                    this.dx = 0;
                }
            }, int);
        }
        
    }

    // 停止滚动
    stop() {
        this.rolInt && clearInterval(this.rolInt);
    }

    drawNum(dx, str: string) {
        const pos0 = this.getPos(dx, 0, this.getString(str));
        pos0.forEach(arr => {
            this.ctx.beginPath();
            this.ctx.arc(arr[0] * this.size + this.size / 2 , arr[1] * this.size + this.size / 2, this.size * 0.4, 0, 2 * Math.PI);
            this.ctx.fill();
        })
    }

    getString(str) {
        return this.ledStrs[str] ? this.hexToBinary(this.ledStrs[str]) : [];
    }

    getPos(x, y, strs) {
        let pos: number[][] = [];
        strs.forEach((str, i) => {
            const arr = str.split("");
            arr.forEach((e, j) => {
                if (e == 1) {
                    pos.push([x + j, y + i])
                }
            });
        });
        return pos;
    }

    hexToBinary(hexStr) {
        hexStr = hexStr.toString();
        const arr = hexStr.match(/.{2}/g).reverse() || [];
        const resoult:any = [];
        arr.forEach(e => {
            const num = parseInt(e, 16);
            const str = num.toString(2).padStart(8, '0').split('').reverse().join('');
            resoult.push(str);
        });
        return resoult;
    }

}