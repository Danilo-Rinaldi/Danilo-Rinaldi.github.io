/ Background /
let bg_game_img;
let bg_pause_img;

const G = 1.5; // Gravity

/* hitbox */
let distance;
let other_center_x;
let other_center_y;
let collision;

let score;

let situation;

/ Character /
let character;

/*images*/
let character_alive_img;
let character_dead_img;
let character_act_img;

let character_img_arr = [];

/*super power reload controllers*/
let sec_start;
let sec_act;

/*jump controller to use in the coin spawn*/
let max_high;

/*hitbox controller*/
let characterCenterX;
let characterCenterY;

/ enemy /
/*where I will save my enemies*/
let enemy_arr = [];

/*images*/
let enemy_img_arr = [];
let enemy_img;

//counter of the enemy to use in the for iteration
let enemy_counter;

let sameEnemy;

/ coin /

let coin;

/*images*/
let coin_img_arr = [];
let coin_img;

/ menu /

let menu;

/*images*/
let menu_start_img;
let menu_diff_img;

/*difiiculty for the enemy's speed*/
let difficulty;

/* I control the collision with the enemies*/
function iscollisionEnemy(){


    collision = false;
    /*i cicle on the number of monster until I found a collision or I end the array of monsters*/
    for (enemy_counter = 0; enemy_counter < enemy_arr.length && !collision; enemy_counter++) {
        
        /* I look for the center of the character and than the one of the enemy*/
        characterCenterX = character.x + character.getCurrentImage().width / 2;
        characterCenterY = character.y + character.getCurrentImage().height / 2;

        other_center_x = enemy_arr[enemy_counter].x + enemy_arr[enemy_counter].getCurrentImage().width / 2;
        other_center_y = enemy_arr[enemy_counter].y + enemy_arr[enemy_counter].getCurrentImage().height / 2;

        /*I control the distance */
        distance = dist(characterCenterX, characterCenterY, other_center_x, other_center_y);

        /*I look for the collision*/
        collision = distance < (character.getCurrentImage().width / 2) + (enemy_arr[enemy_counter].getCurrentImage().width / 2);
    
    }
    return collision;
}

/* I do the same things here*/
function isCollisionCoin(){
    characterCenterX = character.x + character.getCurrentImage().width / 2;
    characterCenterY = character.y + character.getCurrentImage().height / 2;

    other_center_x = coin.x + coin.getCurrentImage().width / 2;
    other_center_y = coin.y + coin.getCurrentImage().height / 2;

    distance = dist(characterCenterX, characterCenterY, other_center_x, other_center_y);

    collision = distance < (character.getCurrentImage().width / 2) + (coin.getCurrentImage().width / 2);

    return collision;
}

/*I control if this y and height are on the ground*/
function isOnGround(y, height) {
    return character.y >= windowHeight - height;
}

/* I control if is in the screen*/
function isInScreen(x, y) {
    return x > 0 && x < bg_game_img.width - character.getCurrentImage().width + 1 &&
        y > 0 && y < bg_game_img.height - character.getCurrentImage().height + 1;
}

/* I control if it is not on the ground*/
function isInAir(y, height){
    return !(isOnGround(y, height))
}

/* I look for the keyboard signals*/
function keyPressed(){
    if (key === "d") {
        character.direction = 1;
    }
    
    if (key === "a") {
        character.direction = -1;
    }
    
    if (key === "w") {
        character.jump()
    }

    if (key === "s") {
        if (sec_act > sec_start + 5000){
            character.setCurrentImage(1);
            sec_start = millis();
            character.stop();
        }
    }
    if (key === "p"){
        situation *= -1;

    }
}

// Displays the final score on the screen
function printScore() {
    background(img_go);
    textSize(55);
    textAlign(CENTER, CENTER);
    fill(0);

    text("Score: " + score, width / 2, ((height / 2) + windowHeight / 20));
}

/*I load all the files*/
function preload() {

    bg_game_img = loadImage('./img/Background.png');
    bg_pause_img = loadImage('./img/PauseBackground.png');
    menu_start_img = loadImage('./img/StartBackground.png');
    menu_diff_img = loadImage('./img/DiffBackground.png')


    character_dead_img = loadImage('./img/CharacterDead.png');
    character_alive_img = loadImage('./img/Character.png');

    enemy_img = loadImage("./img/Razzo.png");

    coin_img = loadImage("./img/coin.png");

    img_go = loadImage('./img/EndBackground.png');

}

/* I initialize all the variables*/
function setup() {

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    bg_game_img.resize(windowWidth, windowHeight);
    menu_start_img.resize(windowWidth, windowHeight);

    character_dead_img.resize(windowHeight / 10, windowHeight / 10);
    character_alive_img.resize(windowHeight / 10, windowHeight / 10);
    character_img_arr.push(character_alive_img);
    character_img_arr.push(character_dead_img);
    character = new Character(character_img_arr, G); 

    enemy_img.resize(windowHeight / 15, windowHeight / 15); 
    enemy_img_arr.push(enemy_img);

    sec_start = millis();

    max_high = (character.jump_power * (character.jump_power / 2) ) / (2 * character.G);

    coin_img.resize(windowHeight / 15, windowHeight / 15); 
    coin_img_arr.push(coin_img);

    coin = new Coin(max_high, coin_img_arr);

    score = 0;
    
    difficulty = 1;

    menu = new Menu(menu_start_img, menu_diff_img);

    situation = 1;

    sameEnemy = false

}

/* I start the game from the menu*/

function draw() {
    //console.log(character.alive)
    if (!menu.continue) {
        // Displays the start menu
        menu.startMenu();
//bg_act_img 
    }else{
        if (situation === -1){
            background(bg_pause_img);
        }else{
            if(character.lifes > 0){

                background(bg_game_img);
                sec_act = millis();
                if (random(1, 100) <= 2) {
                    enemy_arr.push(new Enemy(enemy_img_arr));
                }
                if (sec_act > sec_start + 5000){
                    character.setCurrentImage(0);
                }
                character.update();
        
                if(iscollisionEnemy() && !sameEnemy){
                    character.lifes -= 1;
                    sameEnemy = true;
                }
                console.log("character lifes: " + character.lifes);
                if (!iscollisionEnemy()){
                    sameEnemy = false;
                }
                
        
                if(isCollisionCoin()){
                    score++;
                    coin = new Coin(max_high, coin_img_arr);
                }
        
                for(enemy_counter = 0; enemy_counter < enemy_arr.length; enemy_counter++){
                    enemy_arr[enemy_counter].update();
                    
                    if(!enemy_arr[enemy_counter].isInScreen()){
                        enemy_arr.splice(enemy_counter, 1);
                    }
                }
        
                coin.update();

                
        
            }else{
                
                printScore();

            }  
        }
    } 
}
    