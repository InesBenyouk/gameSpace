class Asteroid {
    constructor() {
        this.reset();
        this.r = random(20, 40);
        this.vertices = [];
        let total = floor(random(5, 15));
        for (let i = 0; i < total; i++) {
            let angle = map(i, 0, total, 0, TWO_PI);
            let r = this.r + random(-8, 8);
            let x = r * cos(angle);
            let y = r * sin(angle);
            this.vertices.push(createVector(x, y));
        }
    }

    reset() {
        // Position asteroid at edge of screen
        if (random(1) < 0.5) {
            this.pos = createVector(random(width), random(1) < 0.5 ? -50 : height + 50);
        } else {
            this.pos = createVector(random(1) < 0.5 ? -50 : width + 50, random(height));
        }
        
        // Point velocity towards center of screen
        let center = createVector(width/2, height/2);
        this.vel = p5.Vector.sub(center, this.pos).normalize().mult(random(1, 3));
        this.rotation = random(-0.03, 0.03);
        this.angle = random(TWO_PI);
    }

    update() {
        this.pos.add(this.vel);
        this.angle += this.rotation;

        // Reset if off screen
        if (this.pos.x < -100 || this.pos.x > width + 100 ||
            this.pos.y < -100 || this.pos.y > height + 100) {
            this.reset();
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        
        fill(100);
        stroke(255);
        beginShape();
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
        pop();
    }
}
