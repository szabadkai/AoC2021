const [xmin, xmax, ymin, ymax] = [195, 238, -93, -67];
// const [xmin, xmax, ymin, ymax] = [20, 30, -10, -5];

let maxHeight = Number.NEGATIVE_INFINITY;

function shoot(vix, viy) {
    let x = 0;
    let y = 0;
    let vx = vix;
    let vy = viy;
    const seen = [];
    let bingo = false;
    while (x <= xmax && y >= ymin && (vx !== 0 || (x <= xmax && x >= xmin))) {
        if (x <= xmax && x >= xmin && y <= ymax && y >= ymin) {
            bingo = true;
        }
        seen.push([x, y]);
        x = x + vx;
        y = y + vy;
        vx = vx > 0 ? vx - 1 : 0;
        vy = vy - 1;
    }
    return bingo
        ? Math.max(...seen.map((s) => s[1]))
        : Number.NEGATIVE_INFINITY;
}
let goodEnough = 0;
for (let x = 0; x < 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
        const height = shoot(x, y);
        if (height !== Number.NEGATIVE_INFINITY) {
            goodEnough++;
        }
    }
}
console.log(goodEnough);
// console.log(shoot(6, 9));
