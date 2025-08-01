window.addEventListener('load', () => {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    // Елементи керування
    const colorPicker = document.getElementById('colorPicker');
    const brushSizeInput = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const clearButton = document.getElementById('clearButton');

    // Встановлюємо розмір полотна на весь екран
    canvas.height = window.innerHeight * 0.7;
    canvas.width = window.innerWidth * 0.9;

    // Змінні для малювання
    let painting = false;
    let brushColor = '#000000';
    let brushWidth = 5;

    function startPosition(e) {
        painting = true;
        draw(e); // Дозволяє малювати крапку при кліку
    }

    function endPosition() {
        painting = false;
        ctx.beginPath(); // Починаємо новий шлях, щоб лінії не з'єднувалися
    }

    function draw(e) {
        if (!painting) return;

        // Визначаємо координати курсору
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = brushWidth;
        ctx.lineCap = 'round'; // Робить кінці ліній круглими
        ctx.strokeStyle = brushColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath(); // Починаємо новий шлях
        ctx.moveTo(x, y); // Переміщуємо "перо" в поточну точку
    }

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

    // Слухачі подій миші
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', endPosition); // Зупинити малювання, якщо курсор вийшов за межі
});