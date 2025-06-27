export function measurePageCount(content, containerHeight = 800) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.width = '100vw';
  div.style.fontFamily = '"Lora", serif';
  div.style.fontSize = '1rem'; // Adjust to match your app
  div.style.lineHeight = '1.6';
  div.style.padding = '2rem';
  div.style.boxSizing = 'border-box';
  div.style.whiteSpace = 'pre-wrap';
  div.innerText = content;

  document.body.appendChild(div);
  const height = div.scrollHeight;
  document.body.removeChild(div);

  return Math.ceil(height / containerHeight);
}
