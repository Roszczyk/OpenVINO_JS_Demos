document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const randomNumberElement = document.getElementById('randomNumber');
  
generateButton.addEventListener('click', () => {
      const min = parseInt(document.getElementById('min').value, 10);
      const max = parseInt(document.getElementById('max').value, 10);
  
      if (isNaN(min) || isNaN(max) || min >= max) {
        alert('Please enter valid min and max values with min < max');
        return;
      }
  
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumberElement.textContent = randomNumber;
    });
  });