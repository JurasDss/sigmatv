document.querySelectorAll('.button, .submit-button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const glow = button.querySelector('.button-glow');
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,0,255,0.3) 0%, transparent 70%)`;
  });
});

// Secret code functionality
const secretInput = document.getElementById('secretInput');
const submitButton = document.querySelector('.submit-button');

function checkSecret() {
  if (secretInput.value === 'ilikebananas12') {
    window.location.href = 'secret/secretindex.html';
  }
}

secretInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkSecret();
  }
});

submitButton.addEventListener('click', checkSecret);
