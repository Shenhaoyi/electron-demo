const nodeVersionEle = document.querySelector('#node-version');
nodeVersionEle.style.color = 'red';

const btn = document.getElementById('btn');
const filePathElement = document.getElementById('filePath');

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});
