const canvas = document.getElementById('canvas') as HTMLCanvasElement;
let p = {
    sprite: createSprite(100, 100, './images/BlackHole.png'),
    dx: 100,
    dy: 100,
    update: function(dt: number){
        this.sprite.x += this.dx * dt;
        this.sprite.y += this.dy * dt
        if (this.sprite.x + this.sprite.tex.width > gl.canvas.clientWidth || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height > gl.canvas.clientHeight || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}

let viewport_updater = {
    update: function(dt: number) {
        viewport.height += 20 * dt;
        viewport.width += 20 * dt;
    }
}
addToUpdateQueue(viewport_updater);
begin_rendering();