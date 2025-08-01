window.addEventListener('load', () => {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    // Елементи керування
    const colorPicker = document.getElementById('colorPicker');
    const brushSizeInput = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const clearButton = document.getElementById('clearButton');

    // Налаштування розміру полотна
    // Робимо його трохи меншим, щоб уникнути проблем з прокруткою на мобільних
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.7;

    // Змінні для малювання
    let painting = false;
    let brushColor = '#000000';
    let brushWidth = 5;

    // Функція для отримання координат (працює і для миші, і для дотику)
    function getEventCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        if (event.touches) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function startPosition(e) {
        e.preventDefault(); // Запобігаємо небажаній поведінці (наприклад, прокрутці сторінки)
        painting = true;
        draw(e); // Дозволяє малювати крапку при кліку/дотику
    }

    function endPosition() {
        painting = false;
        ctx.beginPath(); // Починаємо новий шлях, щоб лінії не з'єднувалися
    }

    function draw(e) {
        if (!painting) return;

        e.preventDefault();
        
        const { x, y } = getEventCoordinates(e);

        ctx.lineWidth = brushWidth;
        ctx.lineCap = 'round'; // Робить кінці ліній круглими
        ctx.strokeStyle = brushColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath(); // Починаємо новий шлях
        ctx.moveTo(x, y); // Переміщуємо "перо" в поточну точку
    }

    // --- Слухачі подій ---

    // Оновлення налаштувань
    colorPicker.addEventListener('input', (e) => {
        brushColor = e.target.value;
    });

    brushSizeInput.addEventListener('input', (e) => {
        brushWidth = e.target.value;
        brushSizeValue.textContent = brushWidth;
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Події миші (для комп'ютерів)
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', endPosition); // Зупинити, якщо курсор вийшов за межі

    // Події дотику (для планшетів та телефонів)
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchcancel', endPosition); // На випадок, якщо дотик скасовано системою
});