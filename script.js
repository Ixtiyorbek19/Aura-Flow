const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // Har bir harakatda yangi "atom" qo'shish
    for(let i=0; i<3; i++) {
        atoms.push(new Atom());
    }
});

class Atom {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        // Ranglarni binafsha va moviy oraliqda tanlaymiz
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.3) this.size -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function handleAtoms() {
    for (let i = 0; i < atoms.length; i++) {
        atoms[i].update();
        atoms[i].draw();

        if (atoms[i].size <= 0.3) {
            atoms.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // Orqa fonni to'liq tozalash o'rniga, xira effekt qoldiramiz
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleAtoms();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});