// UpennLPS HW5 Trivia Game
// Author: Kevin Wang
// Date due: 2019/02/23

var game = {
    questionNo: 0,
    time: 30,
    timer,
    userAns: "",
    correct: 0,
    wrong: 0,
    unanswered: 0,
    dispTime: 5000, //display time of answer in ms, adjust for debugging, standard probably 5000
    QAS: [
        // Array to store object with information related to the Questions and Answer
        //syntax:
        // {
        //     index:       the question number-1 just for reference purpose
        //     questionTxt: the question asked
        //     answers:     choice of answer options stored in array
        //     ansIndex:    the index of the answer array that is the correct answer
        //     image:       put image in assets/images
        // },

        {
            index: 0,
            questionTxt: "What type of pokemon is Gyarados",
            answers: ["Dragon", "Dragon Water", "Water Flying", "Dragon Flying"],
            ansIndex: 2,
            image: "assets/images/gyarados.png",
        },
        {
            index: 1,
            questionTxt: "What is Zapdos Pokedex number",
            answers: ["142", "143", "144", "145"],
            ansIndex: 3,
            image: "assets/images/zapdos.png",
        },
        {
            index: 2,
            questionTxt: "Which of the following Pokemon does not have the poison type",
            answers: ["Paras", "Venomoth", "Oddish", "Nidoking"],
            ansIndex: 0,
            image: "assets/images/paras.png",
        },
        {
            index: 3,
            questionTxt: "What type of Pokemon is Gengar",
            answers: ["Ghost", "Ghost Poison", "Ghost Flying", "Ghost Dark"],
            ansIndex: 1,
            image: "assets/images/gengar.png",
        },
        {
            index: 4,
            questionTxt: "Which of the Pokemon cannot perform mega evolution as of Generation VI (Pokemon X and Y)",
            answers: ["Kangaskhan", "Tauros", "Pinsir", "Scizor"],
            ansIndex: 1,
            image: "assets/images/tauros.png",
        },
        {
            index: 5,
            questionTxt: "What Pokemon has the Pokedex number of 282",
            answers: ["Gardevoir", "Surskit", "Swellow", "Pelipper"],
            ansIndex: 0,
            image: "assets/images/gardevoir.png",
        },
        {
            index: 6,
            questionTxt: "What type of the following Pokemon doesnt have the dragon type",
            answers: ["Swablu", "Latias", "Kingdra", "Noibat"],
            ansIndex: 0,
            image: "assets/images/swablu.png",
        },
        {
            index: 7,
            questionTxt: "Which of the following pokemon can learn iron tail through TM",
            answers: ["Chansey", "Shelder", "Mr.Mime", "Magikarp"],
            ansIndex: 0,
            image: "assets/images/chansey.png",
        },
        {
            index: 8,
            questionTxt: "Which of the following pokemon has the psychic type",
            answers: ["Clefairy", "Lugia", "Jigglypuff", "Luvdisc"],
            ansIndex: 1,
            image: "assets/images/lugia.png",
        },
        {
            index: 9,
            questionTxt: "Which of the following is not an Eevee evolution",
            answers: ["Leafeon", "Sylveon", "Glaceon", "Finneon"],
            ansIndex: 3,
            image: "assets/images/finneon.png",
        }

    ],

    timerStart: function () {
        game.timer = setInterval(game.timeDecrement, 1000);
    },

    timerStop: function () {
        clearInterval(game.timer);
    },

    timeDecrement: function () {    //decreases time and what happens when time is up 
        game.time--;
        $("#timeRemaining").text(game.time);
        if (game.time == 0) {
            game.timerStop();
            game.time = 30;
            game.unanswered++;
            $("#gameWindow").empty();
            $("#gameWindow").append("<h2>Time up</h2>");
            game.questionNo++;
            if (game.questionNo < game.QAS.length) {
                setTimeout(game.nextQuestion, game.dispTime);
            } else {
                setTimeout(game.end, game.dispTime);
            }
        }
    },

    nextQuestion: function () {     //displays next question
        game.timerStart();
        $("#timeRemaining").text(game.time);
        $("#gameWindow").empty()
        $("#gameWindow").append("<h2 id ='question'>" + game.QAS[game.questionNo].questionTxt + "</h2><br>");
        for (i = 0; i < 4; i++) {
            var answersTag = $("<h2>");
            answersTag.text(game.QAS[game.questionNo].answers[i]);
            answersTag.addClass("answers");
            answersTag.attr("id", "answer" + i);
            $("#gameWindow").append(answersTag);
        }
        $(".answers").on("click", function () {
            game.answerCheck($(this));
            game.questionNo++;
            if (game.questionNo < game.QAS.length) {
                setTimeout(game.nextQuestion, game.dispTime);
            } else {
                setTimeout(game.end, game.dispTime);
            }
        });
    },

    answerCheck: function (ans) {
        game.userAns = $(ans).attr("id");
        game.timerStop();
        game.time = 30;
        if (game.userAns === "answer" + game.QAS[game.questionNo].ansIndex) {
            game.correct++;
            $("#gameWindow").empty()
            $("#gameWindow").append("<h2>Your are Correct</h2>")
            $("#gameWindow").append("<img id='transitionImage' src='" + game.QAS[game.questionNo].image + "'>")

        } else {
            game.wrong++;
            $("#gameWindow").empty()
            $("#gameWindow").append("<h2>Your are Wrong</h2><br><h2>The Correct answer was " + game.QAS[game.questionNo].answers[game.QAS[game.questionNo].ansIndex] + "</h2>")
            var gameOverimg = $("<img>")
            gameOverimg.addClass("transitionImage")
            gameOverimg.attr("src", "assets/images/surprisedPikachu.png")
            $("#gameWindow").append(gameOverimg);
        }
    },

    end: function () {      //when all questions are answered
        $("#gameWindow").empty()
        $("#gameWindow").append("<h2>The Trivia is Completed</h2>");
        $("#gameWindow").append("<h2>here are your results:</h2>");
        $("#gameWindow").append("<p>Correct: " + game.correct + "</p>");
        $("#gameWindow").append("<p>Wrong: " + game.wrong + "</p>");
        $("#gameWindow").append("<p>Unanswered: " + game.unanswered + "</p>");
        $("#gameWindow").append("<br><h2 id='restartBtn'>Start Over?</h2>");
        $("#restartBtn").on("click", function () {
            game.reset();
        });
    },

    reset: function () {       //reset the game before starting
        game.questionNo = 0;
        game.time = 30;
        game.correct = 0;
        game.wrong = 0;
        game.unanswered = 0;
        game.randomize();
        game.nextQuestion();
    },

    randomize: function () {
        console.log("ran")
        for (var i = 0; i < 20; i++) {
            var RNG1 = 0;
            var RNG2 = 0;
            while (RNG1 === RNG2) {
                RNG1 = Math.floor(Math.random() * game.QAS.length);
                RNG2 = Math.floor(Math.random() * game.QAS.length);
            }
            var holder = "";
            holder = game.QAS[RNG1];
            game.QAS[RNG1] = game.QAS[RNG2]
            game.QAS[RNG2] = holder;
        }
    }
}

$("#startBtn").on("click", function () {
    game.reset();
    $("#timer").show();
});

