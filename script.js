document.addEventListener('DOMContentLoaded', function() {
    // --- Оставляем только элементы, необходимые для базовой функциональности ---
    const lastNameSpan = document.getElementById('lastName');
    const firstNameSpan = document.getElementById('firstName'); // Для футера
    const newLastNameInput = document.getElementById('newLastNameInput');
    const changeLastNameBtn = document.getElementById('changeLastNameBtn');
    const randomBgBtn = document.getElementById('randomBgBtn'); // Кнопка смены фона body
    const profileImage = document.getElementById('profileImage');
    const currentYearSpan = document.getElementById('currentYear');
    const footerNameSpan = document.querySelector('footer .footer-name');

    const newImageUrlInput = document.getElementById('newImageUrlInput');
    const applyNewImageBtn = document.getElementById('applyNewImageBtn');

    const bodyElement = document.body;

    // --- Функции, не связанные со сменой фона, остаются ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    function updateFooterName() {
        if (footerNameSpan && firstNameSpan && lastNameSpan) {
            footerNameSpan.textContent = `${firstNameSpan.textContent} ${lastNameSpan.textContent}`;
        }
    }
    updateFooterName(); // Вызываем при загрузке

    if (changeLastNameBtn && newLastNameInput && lastNameSpan) {
        changeLastNameBtn.addEventListener('click', function() {
            const newName = newLastNameInput.value.trim();
            if (newName) {
                lastNameSpan.textContent = newName;
                newLastNameInput.value = '';
                updateFooterName(); // Обновляем имя в футере
            } else {
                alert('Пожалуйста, введите новую фамилию.');
            }
        });
        newLastNameInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                changeLastNameBtn.click();
            }
        });
    }

    // --- ЛОГИКА СМЕНЫ ФОНА BODY (максимально упрощенная) ---
    if (randomBgBtn && bodyElement) {
        randomBgBtn.addEventListener('click', function() {
            const newBodyBackgroundColor = getRandomHexColor();
            bodyElement.style.backgroundColor = newBodyBackgroundColor;
            // БОЛЬШЕ НИКАКОЙ АДАПТАЦИИ ЦВЕТОВ ДРУГИХ ЭЛЕМЕНТОВ
        });
    }

    function getRandomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    // --- Функции getBrightness и adaptMainContentColors больше не нужны, их можно удалить ---
    /*
    function getBrightness(hexColor) { ... }
    function adaptMainContentColors(parentElement, isBodyDark, bodyActualBgColor) { ... }
    */

    // --- Логика смены фото по URL остается без изменений ---
    if (applyNewImageBtn && newImageUrlInput && profileImage) {
        applyNewImageBtn.addEventListener('click', function() {
            const newUrl = newImageUrlInput.value.trim();
            if (newUrl) {
                if (newUrl.startsWith('http://') || newUrl.startsWith('https://') || newUrl.startsWith('data:image')) {
                    profileImage.src = newUrl;
                    profileImage.alt = "Фото профиля пользователя";
                    newImageUrlInput.value = '';
                } else {
                    alert('Пожалуйста, введите корректный URL изображения (начинающийся с http://, https:// или data:image).');
                }
            } else {
                alert('Пожалуйста, вставьте URL изображения в поле ввода.');
            }
        });

        newImageUrlInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyNewImageBtn.click();
            }
        });
    }
});