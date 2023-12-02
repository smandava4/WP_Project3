
var start = new Date();
var shuffle_flag = 0;
var seconds_elapsed = 0;
var displaySeconds;
var audio = new Audio("audio.mp3");
audio.pause();

var moves = 0;

var ids = [
    "one", "two", "three", "four",
    "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

var shuffled = ids.slice();

var ids_numeric = {
    "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16
};

var selected_background;

var movement = [
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 0, 1]
];

var background = ["bowser", "pikachu", "charizard", "dragonair", "dragonite", "mario", "luigi", "toad"];

function initializeGame() {
    var background_id = Math.floor((Math.random() * 8));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true;

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + background[background_id];
    }

    document.getElementById("reset").disabled = true;
}

function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
}

function resetPuzzle() {
    var background_id = Math.floor((Math.random() * 8));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    clearInterval(displaySeconds);
    document.getElementById("moves").innerHTML = "Total Moves: 0";
    document.getElementById("clock").innerHTML = "<br><br>Clock: Will Start after you hit shuffles";
    document.getElementById("characters").disabled = false;
    document.getElementById("win").innerHTML = "";
    document.getElementById("confetti-wrapper").innerHTML = "";
    document.getElementById("shuffle").disabled = false;
    document.getElementById("reset").disabled = true;

    audio.pause();
}

function shuffleBoard() {
    audio.loop = true;
    audio.play();
    shuffle_flag = 1;
    shuffled = ids.slice();
    var sixteen = 15;
    moves = 0;
    document.getElementById("win").innerHTML = "";
    document.getElementById("moves").innerHTML = "Total Moves: " + moves;
    document.getElementById("confetti-wrapper").innerHTML = "";
    document.getElementById("characters").disabled = true;
    document.getElementById("shuffle").disabled = true;
    document.getElementById("reset").disabled = false;
    start = new Date();

    displaySeconds = setInterval(function () {
        var now = new Date();
        var distance = now - start;
        seconds_elapsed = Math.round(distance / 1000);
        document.getElementById("clock").innerHTML = "<br><br>Clock: " + seconds_elapsed + "s";
    }, 1000);

    for (var i = 0; i < 500; i++) {
        var movement_id = Math.floor((Math.random() * 4));
        while (movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        var move_to;

        switch (movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
            case 1:
                move_to = sixteen + 1;
                break;
            case 2:
                move_to = sixteen + 4;
                break;
            case 3:
                move_to = sixteen - 1;
                break;
        }

        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;
        sixteen = move_to;
    }
    displayBoard();
}

function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") - 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}

function swapPieces(clickable_id, empty_id) {
    animateMovement(clickable_id, empty_id);

    setTimeout(function () {
        var temp = shuffled[empty_id];
        shuffled[empty_id] = shuffled[clickable_id];
        shuffled[clickable_id] = temp;

        moves++;
        document.getElementById("moves").innerHTML = "Total Moves: " + moves;

        displayBoard();
        checkIfWon();
    }, 600);
}

function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " move-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " move-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " move-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " move-left";
    }
}

function checkIfWon() {
    if (ids.toString() == shuffled.toString()) {
        shuffle_flag = 0;

        var end = new Date();
        var elapsed_ms = end - start;
        var seconds = Math.round(elapsed_ms / 1000);

        var winHtml = "<br>";
        winHtml += "<img src='win.gif' alt='You win' />";
        winHtml += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        winHtml += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";

        document.getElementById("win").innerHTML = winHtml;
        clearInterval(displaySeconds);
        document.getElementById("clock").innerHTML = "<br><br>Clock: " + seconds + "s";
        document.getElementById("reset").disabled = false;
        document.getElementById("shuffle").disabled = false;

        audio.pause();
        audio.currentTime = 0;
        var winAudio = new Audio("winAudio.mp3");
        winAudio.play();
        displayCelebration();
    }
}

function displayCelebration() {
    for (i = 0; i < 100; i++) {
        var randomRotation = Math.floor(Math.random() * 360);
        var randomScale = Math.random() * 1;
        var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        var randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));

        var randomAnimationDelay = Math.floor(Math.random() * 15);

        var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
        var randomColor = colors[Math.floor(Math.random() * colors.length)];

        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.top = randomHeight + 'px';
        confetti.style.right = randomWidth + 'px';
        confetti.style.backgroundColor = randomColor;
        confetti.style.obacity = randomScale;
        confetti.style.transform = 'skew(15deg) rotate(' + randomRotation + 'deg)';
        confetti.style.animationDelay = randomAnimationDelay + 's';
        document.getElementById("confetti-wrapper").appendChild(confetti);
    }
}
