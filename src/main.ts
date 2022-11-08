const r = new Renderer();
r.loadTexture('./images/frog.png', 'frog')
r.loadTexture('./images/tile.png', 'tile')

let p = {
    sprite: r.createSprite(0,150, 'frog'),
    dx: 50,
    dy: 50,
    update: function(dt: number){
        this.sprite.x += this.dx * dt;
        this.sprite.y += this.dy * dt
        //TODO: replace hardcoded resolution with global constant
        if (this.sprite.x + this.sprite.tex.width >= 426 * r.viewport.sx || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height >= 240 * r.viewport.sy || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}

let q = {
    sprite: r.createSprite(50,150, 'tile'),
    dx: 50,
    dy: 30,
    update: function(dt: number){
        this.sprite.x -= this.dx * dt;
        this.sprite.y += this.dy * dt
        //TODO: replace hardcoded resolution with global constant
        if (this.sprite.x + this.sprite.tex.width >= 426 * r.viewport.sx || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height >= 240 * r.viewport.sy || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}

PostProcessing.add(new BarShader());
r.addToUpdateQueue(p);
r.addToUpdateQueue(q);
r.start();