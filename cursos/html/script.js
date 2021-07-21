const game = {
    answeredQuestions: [],
    currentQuestionId: 1,
    life: 4,
    progress: 0
}

const questions = [
    {
        id: 1,
        text: "¿Qué etiqueta es semánticamente correcta para el contenido principal?",
        options: [
            {
                text: "main",
                isCorrect: true
            },
            {
                text: "section",
                isCorrect: false
            },
            {
                text: "header",
                isCorrect: false
            }
        ]
    },
    {
        id: 2,
        text: "¿Qué etiqueta HTML nos sirve para incluir archivos de JavaScript?",
        options: [
            {
                text: "<br>",
                isCorrect: false,
            },
            {
                text: "<script>",
                isCorrect: true,
            },
            {
                text: "<styles>",
                isCorrect: false,
            }
        ]
    },
    {
        id: 3,
        text: "¿Qué significa DRY?",
        options: [
            {
                text: "Don’t repeat yellow",
                isCorrect: false,
            },
            {
                text: "Don’t repeat yourself",
                isCorrect: true,
            },
            {
                text: "Don’t recicle year",
                isCorrect: false,
            }
        ]
    }
]

const fillQuestions = () => {
    const questionDescription = document.getElementById('question-description')
const answersContainer = document.getElementById('answers-container')

    

    questionDescription.innerText = currentQuestion.text

    currentQuestion.options.forEach(item => {
        answersContainer.innerHTML += `
        <div>
            <label for="${item.text}">${item.text}</label>
            <input class="answer-input form-check-input" type="radio" name="answer" id="${item.text}" value="${item.isCorrect}">
        </div>`
    })
    console.log(currentQuestion)
    

}
fillQuestions()