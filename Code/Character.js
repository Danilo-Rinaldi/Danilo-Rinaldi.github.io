class Character {
    constructor(img_arr, G) {
        this.x = windowWidth / 10 + character_dead_img.width;
        this.y = windowHeight - character_dead_img.height;
        this.vy = 0;
        this.speed = 10;
        this.direction = 1;
        this.jump_power = 40;
        this.is_alive = true;
        this.img_arr = img_arr;
        this.img_act = 1;
        this.G = G;
        this.stopped = 0;
        this.alive = true;
        this.lifes = 2;
    }

    move() {
        if (isInScreen(this.x, this.y)) {
            //this.direction *= 1;
        } else {
            this.direction *= -1;
        }
        if(this.stopped > 0){
            this.stopped--;
        }else{
            this.x += this.speed * this.direction;
            this.fall();
        }
        
    }

    jump(){

        if (isOnGround(character.y, character.getCurrentImage().height)){
            this.vy -= this.jump_power
        }

    }

    stop(){
        this.stopped = 50;
    }

    fall() {
        
        this.y += this.vy;
        if (isInAir(this.y, character.getCurrentImage().height)) {
            this.vy += G;
        } else {
            this.vy = 0;
            this.y = windowHeight - character.getCurrentImage().height;
        }
    }

    getCurrentImage() {
        return this.img_arr[this.img_act];
    }

    setCurrentImage(index){
        if (index >= 0 && index <= this.img_arr.length){
            this.img_act = index;
            
        }else{
            console.log("ERRORE: index per immagini Character ERRATO");
        }
    }

    show() {
        // Display the character image
        image(this.getCurrentImage(), this.x, this.y);
    }

    update() {
        this.move();
        this.show();
    }
}