document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('like');
    button.addEventListener('click', () => handleClick(button));
});

function handleClick(buttonElement) {
    buttonElement.textContent = 'You Like Him!';
}
