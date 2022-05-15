const quizDB = [{
        type: "single",
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<scripting>",
        b: "<script>",
        c: "<js>",
        d: "<javascript>",
        ans: "ans2"
    },
    {
        type: "multiple",
        question: "select two states in india",
        a: "US  ",
        b: "UP",
        c: "Gujarat",
        d: "Japan",
        ans: ["ans2", "ans3"]
    },
    {
        type: "single",
        question: "How to write an IF statement in JavaScript?",
        a: "if i = 5 then",
        b: "if i = 5",
        c: "if i == 5 then",
        d: "if (i == 5)  ",
        ans: "ans3"
    },
    {
        type: "single",
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        a: "if (i != 5)  ",
        b: "if i <> 5",
        c: "if (i <> 5)",
        d: "if i =! 5 then",
        ans: "ans1"
    },
    {
        type: "multiple",
        question: "Select fruits in the list?",
        a: "apple",
        b: "orange",
        c: "onion",
        d: "carrot",
        ans: ["ans1", "ans2"]
    },
    {
        type: "single",
        question: "How does a WHILE loop start?",
        a: "while (i <= 5; i++)",
        b: "while (i <= 5)",
        c: "while i = 1 to 5",
        d: "while (i = 1 to 5)",
        ans: "ans2"
    }
];

const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const option5 = document.querySelector("#option5");
const option6 = document.querySelector("#option6");
const option7 = document.querySelector("#option7");
const option8 = document.querySelector("#option8");
const submit = document.querySelector("#submit");

const answers = document.querySelectorAll(".answer");

let questionCount = 0;

const loadQuestion = () => {
    const questionList = quizDB[questionCount];
    if (questionList.type === "single") {
        document.getElementById('single').style.display = 'block';
        document.getElementById('multiple').style.display = 'none';
    } else {
        document.getElementById('multiple').style.display = 'block';
        document.getElementById('single').style.display = 'none';
    }
    question.innerText = questionList.question;
    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;
    option5.innerText = questionList.a;
    option6.innerText = questionList.b;
    option7.innerText = questionList.c;
    option8.innerText = questionList.d;
}

loadQuestion();

const getCheckAnswer = () => {
    let answer;
    if (quizDB[questionCount].type === "single") {
        answers.forEach((curAnsElem) => {
            if (curAnsElem.checked) {
                answer = curAnsElem.id;
            }
        });
        return answer;
    } else {
        let answer = [];
        answers.forEach((curAnsElem) => {
            if (curAnsElem.checked) {
                answer.push(curAnsElem.id);
            }
        });
        return answer;
    }
};

const deselectAll = () => {
    answers.forEach((curAnsElem) => {
        curAnsElem.checked = false;
    });
}

submit.addEventListener('click', () => {
    const checkedAnswer = getCheckAnswer();

    if (checkedAnswer === quizDB[questionCount].ans) {
        if (localStorage.getItem('questionCount') === null) {
            localStorage.setItem(questionCount, 1);
        } else {
            localStorage.removeItem(questionCount);
            localStorage.setItem(questionCount, 1);
        }
    } else if (JSON.stringify(checkedAnswer) === JSON.stringify(quizDB[questionCount].ans)) {
        if (localStorage.getItem('questionCount') === null) {
            localStorage.setItem(questionCount, 1);
        } else {
            localStorage.removeItem(questionCount);
            localStorage.setItem(questionCount, 1);
        }
    } else {
        if (localStorage.getItem('questionCount') === null) {
            localStorage.setItem(questionCount, 0);
        } else {
            localStorage.removeItem(questionCount);
            localStorage.setItem(questionCount, 0);
        }
    }

    questionCount++;

    if (questionCount < quizDB.length) {
        loadQuestion();
        const quiznumber = document.querySelector(".question-number");
        quiznumber.innerText = `${questionCount+1}.`;
    } else {
        location.href = "congrats.html";
    }

    let scoregained = 0;

    for (let i = 0; i <= quizDB.length; i++) {
        if (localStorage.getItem(i) === "1") {
            scoregained++;
        }
    }
    percent = (scoregained * 100 / quizDB.length);
    percent2 = Math.round(percent);
    console.log(percent);
    localStorage.setItem("score", percent2);
});


function backquiz() {
    if (questionCount === 0) {
        alert("You are at the first question");
    } else {
        questionCount--;
        loadQuestion();
        deselectAll();
        const quiznumber = document.querySelector(".question-number");
        quiznumber.innerText = `${questionCount+1}.`;
    }
}

function nextquiz() {
    if (questionCount === quizDB.length - 1) {
        alert("You are at the last question");
    } else {
        questionCount++;
        loadQuestion();
        deselectAll();
        const quiznumber = document.querySelector(".question-number");
        quiznumber.innerText = `${questionCount+1}.`;
    }
}