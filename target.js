class Target {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = p5.Vector.random2D().mult(2);
        this.r = 16;
    }

    update() {
        this.pos.add(this.vel);

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    display() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
