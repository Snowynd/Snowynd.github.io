document.addEventListener('DOMContentLoaded', function() {
    const lastNameElement = document.getElementById('last-name');
    const newSurnameInput = document.getElementById('new-surname-input');
    const changeSurnameBtn = document.getElementById('change-surname-btn');
    const randomBgBtn = document.getElementById('random-bg-btn');
    const currentYearElement = document.getElementById('current-year');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const dynamicGreetingElement = document.getElementById('dynamic-greeting');
    const clearSurnameBtn = document.getElementById('clear-surname-btn');

    const SURNAME_STORAGE_KEY = 'userResumeSurname';
    const THEME_STORAGE_KEY = 'userResumeTheme';

    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
        applyTheme(savedTheme);
    }

    function setDynamicGreeting() {
        if (!dynamicGreetingElement) return;
        const hour = new Date().getHours();
        let greeting = "Добро пожаловать!";
        if (hour < 6) {
            greeting = "Доброй ночи!";
        } else if (hour < 12) {
            greeting = "Доброе утро!";
        } else if (hour < 18) {
            greeting = "Добрый день!";
        } else {
            greeting = "Добрый вечер!";
        }
        dynamicGreetingElement.textContent = greeting;
    }

    function loadSurname() {
        if (!lastNameElement) return;
        const savedSurname = localStorage.getItem(SURNAME_STORAGE_KEY);
        if (savedSurname) {
            lastNameElement.textContent = savedSurname;
        }
    }

    loadTheme();
    setDynamicGreeting();
    loadSurname();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.body.dataset.theme || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    if (changeSurnameBtn && newSurnameInput && lastNameElement) {
        changeSurnameBtn.addEventListener('click', function() {
            const newSurname = newSurnameInput.value.trim();
            if (newSurname) {
                lastNameElement.textContent = newSurname;
                localStorage.setItem(SURNAME_STORAGE_KEY, newSurname);
                newSurnameInput.value = '';
                newSurnameInput.placeholder = 'Введите новую фамилию'; // Reset placeholder
                // Simple feedback
                changeSurnameBtn.textContent = 'Сохранено!';
                setTimeout(() => {
                    changeSurnameBtn.textContent = 'Применить фамилию';
                }, 1500);

            } else {
                newSurnameInput.classList.add('input-error');
                newSurnameInput.placeholder = 'Пожалуйста, введите фамилию!';
                setTimeout(() => {
                    if (newSurnameInput.classList.contains('input-error')) {
                        newSurnameInput.classList.remove('input-error');
                        newSurnameInput.placeholder = 'Введите новую фамилию';
                    }
                }, 2500);
            }
        });
    }

    if (newSurnameInput) {
        newSurnameInput.addEventListener('focus', function() {
            this.classList.remove('input-error');
            if (this.placeholder === 'Пожалуйста, введите фамилию!') {
                this.placeholder = 'Введите новую фамилию';
            }
        });
        newSurnameInput.addEventListener('input', function() {
            if (this.classList.contains('input-error') && this.value.trim() !== '') {
                this.classList.remove('input-error');
                this.placeholder = 'Введите новую фамилию';
            }
        });
    }

    if (clearSurnameBtn && newSurnameInput) {
        clearSurnameBtn.addEventListener('click', function() {
            newSurnameInput.value = '';
            newSurnameInput.placeholder = 'Введите новую фамилию';
            newSurnameInput.classList.remove('input-error');
            newSurnameInput.focus();
        });
    }

    if (randomBgBtn) {
        randomBgBtn.addEventListener('click', function() {
            const randomH = Math.floor(Math.random() * 360);
            const randomS = Math.floor(Math.random() * 30) + 70; // Saturation 70-100%
            const randomL = Math.floor(Math.random() * 20) + (document.body.dataset.theme === 'dark' ? 15 : 70); // Lightness
            document.body.style.backgroundColor = `hsl(${randomH}, ${randomS}%, ${randomL}%)`;
        });
    }

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    console.log("Привет! Страница резюме загружена.");
    console.log("Попробуй изменить фамилию, фон или тему :)");
});