const login = () => {
    const loginInput = document.getElementById('login')
    const email = loginInput.value.trim()
    if (email) {
        const user = {
            email,
            static: {
                totalHours: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
            },
            progress: {
                html: 0,
                css: 0,
                js: 0,
                figma: 0,
                ux: 0,
            }
        }
        window.localStorage.setItem('user', JSON.stringify(user))
        window.location.href = "/"
    }
}

document.getElementById('loginBtn').addEventListener('click', login)
