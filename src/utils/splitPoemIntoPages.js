export function splitPoemIntoPages(content, maxLinesPerPage = 24) {
  const paragraphs = content.trim().split(/\n\s*\n/); // split by paragraph
  const pages = [];
  let currentLines = [];
  
  for (let para of paragraphs) {
    const paraLines = para.split('\n');

    // if paragraph will overflow current page
    if (currentLines.length + paraLines.length > maxLinesPerPage) {
      pages.push({
        content: currentLines.join('\n'),
        isCentered: currentLines.length <= 12, // for styling
      });
      currentLines = [];
    }

    currentLines.push(...paraLines, ''); // add paragraph with a gap
  }

  // Push remaining lines as last page
  if (currentLines.length > 0) {
    pages.push({
      content: currentLines.join('\n'),
      isCentered: currentLines.length <= 12,
    });
  }

  return pages;
}
