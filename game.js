let ships = [];
let target;
let asteroids = [];
let modes = ["seek", "flee", "wander"];
let currentMode = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    target = new Target();
    
    // Create initial ships
    for (let i = 0; i < 10; i++) {
        ships.push(new Spaceship(random(width), random(height)));
    }

    // Create asteroids
    for (let i = 0; i < 8; i++) {
        asteroids.push(new Asteroid());
    }

    updateStats();
}

function draw() {
    background(20);
    
    // Draw starfield
    drawStars();

    // Update and display target
    target.update();
    target.display();

    // Update and display asteroids
    for (let asteroid of asteroids) {
        asteroid.update();
        asteroid.display();
    }

    // Update and display ships
    for (let ship of ships) {
        ship.update(target.pos);
        ship.display();
    }
}

function keyPressed() {
    if (key === ' ') {
        target = new Target();
    } else if (key === 'm' || key === 'M') {
        currentMode = (currentMode + 1) % modes.length;
        ships.forEach(ship => ship.mode = modes[currentMode]);
        updateStats();
    } else if (key === 'r' || key === 'R') {
        ships = [];
        for (let i = 0; i < 10; i++) {
            ships.push(new Spaceship(random(width), random(height)));
        }
        ships.forEach(ship => ship.mode = modes[currentMode]);
        updateStats();
    } else if (key === 'n' || key === 'N') {
        ships.push(new Spaceship(random(width), random(height)));
        updateStats();
    }
}

function updateStats() {
    document.getElementById('mode').textContent = modes[currentMode].charAt(0).toUpperCase() + modes[currentMode].slice(1);
    document.getElementById('missiles').textContent = ships.length;
}

function drawStars() {
    stroke(255);
    strokeWeight(1);
    for (let i = 0; i < 200; i++) {
        point(random(width), random(height));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
