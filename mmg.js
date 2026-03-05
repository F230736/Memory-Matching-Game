$(document).ready(function(){
    let symbols = ["apple","apple","banana","banana","grape","grape","melon","melon"];

    let symbolImages = {
        apple: "<img src='apple.jpg' width='80'>",
        banana: "<img src='banana.jpg' width='80'>",
        grape: "<img src='grape.jpg' width='80'>",
        melon: "<img src='melon.jpg' width='80'>"
    };
    symbols.sort(function(){
        return 0.5 - Math.random();
    });

    let flippedCards = [];
    let moves = 0;
    let matchedPairs = 0;
    let seconds = 0;
    let timerStarted = false;
    let timer;

    function startTimer(){
        timer = setInterval(function(){
            seconds++;
            $("#timer").text(seconds);
        },1000);
    }
    for(let i=0;i<symbols.length;i++){

        $("#gameBoard").append(
            `<div class="card" data-symbol="${symbols[i]}"></div>`
        );
    }

    $(".card").click(function(){
        if(!timerStarted){
            startTimer();
            timerStarted = true;
        }
        if(flippedCards.length < 2 && !$(this).hasClass("flipped")){
            let symbol = $(this).data("symbol");
            $(this).html(symbolImages[symbol]);
            $(this).addClass("flipped");
            flippedCards.push($(this));
            if(flippedCards.length === 2){
                moves++;
                $("#moves").text(moves);
                let first = flippedCards[0].data("symbol");
                let second = flippedCards[1].data("symbol");
                if(first === second){
                    $("#matchSound")[0].play();
                    matchedPairs++;
                    flippedCards = [];
                    if(matchedPairs === symbols.length/2){
                        clearInterval(timer);
                        $("#winMessage").show();
                    }
                }else{
                    $("#wrongSound")[0].play();
                    setTimeout(function(){
                        flippedCards[0].html("").removeClass("flipped");
                        flippedCards[1].html("").removeClass("flipped");
                        flippedCards = [];
                    },1000);
                }
            }
        }
    });
});