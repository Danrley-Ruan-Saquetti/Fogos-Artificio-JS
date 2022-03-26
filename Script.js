class Fogo {
    constructor(pos, targetY, radius, color, speed) {
        this.radius = radius;
        this.pos = pos;
        this.targetY = targetY;
        this.color = color;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        if (this.pos.y > this.targetY) {
            this.pos.y -= this.speed;
        }
    }
}

class Particula {
    constructor(pos, radius, color, speed) {
        this.pos = pos;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.speed.x *= 0.99;
        this.speed.y *= 0.99;
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
        this.alpha -= 0.02;
        this.draw();
    }
}

const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");

let fogos = [],
    particulas = [];

setInterval(() => {
    let radius = Math.floor(Math.random() * (10 - 5) + 5),
        pos = {
            x: Math.random() * canvas.width,
            y: canvas.height + radius
        },
        targetY = Math.random() * ((canvas.height - 20) - 20) + 20;
    color = `hsl(${Math.random() * 360}, 50%, 50%)`,
        speed = Math.floor(Math.random() * (25 - 20));

    fogos.push(new Fogo(pos, targetY, radius, color, speed));
}, 250);

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fogos.forEach((fogo, index) => {
        if (fogo.yI <= fogo.yF) {
            setTimeout(() => {
                fogos.splice(index, 1);
            }, 0);
            for (let i = 0; i < fogo.radius * 8; i++) {
                let pos = fogo.pos,
                    radius = Math.random() * 2,
                    color = fogo.color,
                    speed = { x: (Math.random() - 0.5) * (Math.random() * 8), y: (Math.random() - 0.5) * (Math.random() * 8) };
                particulas.push(new Particula(pos, radius, color, speed));
            }
        } else {
            fogo.update();
        }
    });

    particulas.forEach((p, index) => {
        if (p.alpha <= 0) {
            particulas.splice(index, 1);
        } else {
            p.update();
        }
    });

}

animate();