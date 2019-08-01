const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();

dead.src = "audio/dead.wav";
eat.src = "audio/eat.wav";

// create the snake
let snake = [];
snake [0] = {
    x : 9 * box,
    y : 10 * box
}

// create the food
let food = {
    x:Math.floor(Math.random()*17+1) * box,
    y:Math.floor(Math.random()*15+3) * box
}

// create the score
let score = 0;

// control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}
// check collision 
    function collision(head,array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }


// draw everything on the canvas

    // ground
    function draw(){
        ctx.drawImage(ground,0,0);

    // snake
        for( let i = 0; i < snake.length ; i++ ){
            ctx.fillStyle = (i == 0)? "teal" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "black";
            ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }

    // food
        ctx.drawImage(foodImg, food.x, food.y);

    // snake´s old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

    // snake growth on food
        if(snakeX == food.x && snakeY == food.y){
            score++;
            eat.play();
            food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
            // we don't remove the tail
        }else{
            // remove the tail
            snake.pop();
        }

    // which direction snake goes
        if( d == "LEFT") snakeX -= box;
        if( d == "UP") snakeY -= box;
        if( d == "RIGHT") snakeX += box;
        if( d == "DOWN") snakeY += box;

    // add a new head to the snake
        let newHead = {
            x : snakeX,
            y : snakeY
        }

    

    // GAME OVER
        if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
            clearInterval(game);
            dead.play();
        }


    // score
        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score,2*box,1.6*box);
    }


// call function every 100 ms
let game = setInterval(draw,100);

