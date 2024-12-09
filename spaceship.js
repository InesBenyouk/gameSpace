class Spaceship {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 5;
        this.maxForce = 0.5;
        this.r = 8;
        this.history = [];
        this.historyLength = 50;
        this.mode = "seek";
        this.wanderAngle = 0;
        this.wanderRadius = 50;
        this.wanderDistance = 80;
        this.wanderChange = 0.3;
        this.avoidanceRadius = 100;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.normalize();
        desired.mult(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(this.pos, target);
        desired.normalize();
        desired.mult(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    wander() {
        let wanderPoint = this.vel.copy().normalize().mult(this.wanderDistance);
        let displacement = createVector(0, -1).mult(this.wanderRadius);
        let angle = this.wanderAngle + this.vel.heading();
        displacement.rotate(angle);
        this.wanderAngle += random(-this.wanderChange, this.wanderChange);
        wanderPoint.add(displacement);
        return this.seek(p5.Vector.add(this.pos, wanderPoint));
    }

    update(target) {
        // Store history
        this.history.push(this.pos.copy());
        if (this.history.length > this.historyLength) {
            this.history.shift();
        }

        // Calculate steering force based on current mode
        let force;
        if (this.mode === "seek") {
            force = this.seek(target);
        } else if (this.mode === "flee") {
            force = this.flee(target);
        } else if (this.mode === "wander") {
            force = this.wander();
        }

        // Apply force and update position
        this.applyForce(force);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Wrap around screen
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    display() {
        // Draw history trail
        stroke(200, 0, 255, 100);
        noFill();
        beginShape();
        for (let pos of this.history) {
            vertex(pos.x, pos.y);
        }
        endShape();

        // Draw spaceship
        let theta = this.vel.heading();
        fill(255, 0, 0);
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(-this.r, -this.r/2);
        vertex(this.r, 0);
        vertex(-this.r, this.r/2);
        endShape(CLOSE);
        pop();
    }
}
