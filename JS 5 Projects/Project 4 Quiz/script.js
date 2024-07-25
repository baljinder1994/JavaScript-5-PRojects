let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    questions = data.results.map((questionData, index) => ({
        question: decodeHTML(questionData.question),
        answers: shuffleArray([...questionData.incorrect_answers.map(answer => decodeHTML(answer)), 
            decodeHTML(questionData.correct_answer)]),
        correctAnswer: decodeHTML(questionData.correct_answer),
        index: index
    }));
    startQuiz();
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('next-button').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.correctAnswer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    const answerButtonsElement = document.getElementById('answer-buttons');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    document.getElementById('next-button').style.display = 'none';
}

function selectAnswer(selectedButton, correctAnswer) {
    const isCorrect = selectedButton.innerText === correctAnswer;
    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }
    Array.from(document.getElementById('answer-buttons').children).forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        }
    });
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'flex';
    document.getElementById('result').innerText = `Your score: ${score}/${questions.length}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

fetchQuestions();
