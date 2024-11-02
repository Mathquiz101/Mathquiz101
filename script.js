const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris"
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "7", "10"],
        answer: "8"
    },
    {
        question: "What is the largest planet in our Solar System?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Jupiter"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = "";

    questions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
});

loadQuestion();
