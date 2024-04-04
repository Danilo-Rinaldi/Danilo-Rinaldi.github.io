class Coin {
    
    constructor(max_high, img_array){
        this.img_arr = img_array;
        this.img_act = 0;
        this.y = random(max_high, (windowHeight - (2* character.getCurrentImage().height )));
        this.x = random(1, windowWidth - character.getCurrentImage().width);
    }

    getCurrentImage() {
        return this.img_arr[this.img_act];
    }

    show() {
        image(this.getCurrentImage(), this.x, this.y);
    }

    update() {
        this.show();
    }

}