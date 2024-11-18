$(document).ready(function () {
    const words = [
        { word: "always", translation: "завжди" },
        { word: "never", translation: "ніколи" },
        { word: "house", translation: "дім" },
        { word: "cat", translation: "кіт" },
        { word: "dog", translation: "пес" },
        { word: "friend", translation: "друг" },
        { word: "book", translation: "книга" },
        { word: "car", translation: "машина" },
        { word: "school", translation: "школа" },
        { word: "sun", translation: "сонце" },
        { word: "sky", translation: "небо" },
        { word: "sport", translation: "спорт" }
    ];
    const middle = [
        { word: "accident", translation: "аварія" },
        { word: "achievement", translation: "досягнення" },
        { word: "acid", translation: "кислота" },
        { word: "actress", translation: "актриса" },
        { word: "adult", translation: "дорослий" },
        { word: "advice", translation: "порада" },
        { word: "beauty", translation: "краса" },
        { word: "brain", translation: "мозок" },
        { word: "capable", translation: "здібний" },
        { word: "desert", translation: "пустеля" },
        { word: "dessert", translation: "десерт" },
        { word: "employer", translation: "роботодавець" }
    ];
    const hard = [
        { word: "enforcement", translation: "правозастосування" },
        { word: "foundation", translation: "фундамент" },
        { word: "generation", translation: "покоління" },
        { word: "headline", translation: "заголовок" },
        { word: "imagination", translation: "уява" },
        { word: "investigation", translation: "розслідування" },
        { word: "measurement", translation: "вимір" },
        { word: "negotiation", translation: "переговори" },
        { word: "occupation", translation: "професія" },
        { word: "participant", translation: "учасник" },
        { word: "preference", translation: "перевага" },
        { word: "regard", translation: "відношення" }
    ];

    let currentWords = []; 
    let currentIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;

    function shuffleWords(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function updateUI() {
        if (currentIndex < currentWords.length) {
            $("#word").text(currentWords[currentIndex].word);
            $("#step").text(currentIndex + 1);
            $("#total").text(currentWords.length);
        } else {
            showResult();
        }
    }

    function checkTranslation() {
        const userInput = $("#translation").val().trim().toLowerCase();
        const correctTranslation = currentWords[currentIndex].translation.toLowerCase();

        if (userInput === correctTranslation) {
            correctCount++;
            $("#correct").text(correctCount);
        } else {
            wrongCount++;
            $("#wrong").text(wrongCount);
        }

        currentIndex++;
        $("#translation").val("");
        updateUI();
    }

    function showResult() {
        const accuracy = ((correctCount / currentWords.length) * 100).toFixed(2);
        $("#result").text(`Ваша точність: ${accuracy}%`);
        $(".modal-overlay").fadeIn();
        $(".modal").fadeIn();
    }

    $(".close-btn").click(function () {
        $(".modal-overlay").fadeOut();
        $(".modal").fadeOut();
        resetGame();
    });

    function resetGame() {
        currentIndex = 0;
        correctCount = 0;
        wrongCount = 0;
        $("#correct").text(0);
        $("#wrong").text(0);
        $("#step").text(0);
        $("#translation").val("");
    }

    $("input[name='radio']").change(function () {
        const level = $("input[name='radio']:checked").attr("id");
        if (level === "easy") {
            currentWords = shuffleWords(words);
        } else if (level === "middle") {
            currentWords = shuffleWords(middle);
        } else if (level === "hard") {
            currentWords = shuffleWords(hard);
        }
        resetGame();
        updateUI();
    });

    $("#check").click(checkTranslation);

    $("#easy").prop("checked", true).change(); 
});
