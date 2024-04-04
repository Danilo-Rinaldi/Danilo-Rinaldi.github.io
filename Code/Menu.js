class Menu {
    constructor(img_menu, img_diff) {
        // Images
        this.img_menu = img_menu;
        this.img_diff = img_diff;
  
        // Current situation (menu or instructions)
        this.situation = "menu";
  
        // Current background image
        this.current_image = this.img_menu;
  
        // Flag to indicate whether to start the game and exit the menu
        this.continue = false;
    }
  
    // Displays the menu or instructions screen
    startMenu() {
        image(this.current_image, 0, 0, windowWidth, windowHeight);
        this.handleMainMenu();
    }
  
    // Checks if the mouse click is in the top half of the screen
    isHighClick() {
        return mouseY >= 0 && mouseY <= ((windowHeight / 2) + windowHeight / 10);
    }
  
    // Checks if the mouse click is within the central region of the screen
    isCentralClick() {
        return mouseX >= windowWidth / 4 && mouseX <= windowWidth / 1.5;
    }
  
    // Checks if the mouse click is in the left half of the screen
    isLeftClick() {
        return mouseX <= windowWidth / 2;
    }
  
    // Handles actions in the main menu or instructions screen
    handleMainMenu() {
        //console.log(this.situation)
        if (this.situation == "menu") {
            //console.log("sono in menu")
            //console.log("controllo se premo tasti")
            // Checks for a click in the play button area
            if (mouseIsPressed && this.isHighClick() && this.isCentralClick()) {
                this.situation = "play";
                this.continue = true;
            }
            // Checks for a click in the instructions button area
            else if (mouseIsPressed && !this.isHighClick() && this.isCentralClick()) {
                this.action = "difficutly";
                this.current_image = this.img_diff;
                this.situation = "difficulty";
                
            }
        }else if(this.situation == "difficulty"){
            if (mouseIsPressed && this.isLeftClick() && !this.isCentralClick()) {
                this.situation = "menu";
                this.current_image = menu_start_img;
                difficulty = 1;
            }else if(mouseIsPressed && !this.isLeftClick() && !this.isCentralClick()) {
                this.situation = "menu";
                this.current_image = menu_start_img;
                difficulty = 2;
            }
        }
    }
}
  