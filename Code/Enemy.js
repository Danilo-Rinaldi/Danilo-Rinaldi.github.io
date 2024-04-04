class Enemy {
    constructor(img_arr) {
        this.img_arr = img_arr;
        this.img_act = 0;
        this.speed =  (difficulty * score) + random(3, 15);
        this.x = random([0, windowWidth]);
        this.y = random(0, height - this.img_arr[this.img_act].height);
        if (this.x == 0) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }
    }

    move() {
        if (this.isInScreen()) {
            this.x += this.speed * this.direction;
        }
        // Posso aggiungere l'animazione qui
    }

    getCurrentImage() {
        return this.img_arr[this.img_act];
    }

    show() {
        image(this.getCurrentImage(), this.x, this.y);
    }

    update() {
        this.move();
        this.show();
    }

    isInScreen(){
        return this.x >= - character.getCurrentImage().width && this.x <= bg_game_img.width &&
            this.y >= - character.getCurrentImage().height + 1 && this.y <= bg_game_img.height;
    }
}
