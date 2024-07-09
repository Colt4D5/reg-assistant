function createNotification() {
	const div = document.createElement('div');
	div.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 9999;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;
  div.innerHTML = `
		<h3 style="color:#b50d0d">Alert!</h3>
		<p>A Microsoft VBScript runtime error was found on this page.</p>
		<button id="close-notification">Close</button>
  `;
  document.body.appendChild(div);

  document.getElementById('close-notification').addEventListener('click', () => {
		div.remove();
  });
}