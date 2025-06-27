// src/utils/estimatePoemPages.js

// How many lines per page (tweak as needed for design)
const MAX_LINES_PER_PAGE = 24;

// Estimate alignment type based on poem length
const shouldCenterAlign = (lines) => {
  return lines.length <= MAX_LINES_PER_PAGE;
};

// Actual function to split poem into pages
export function splitPoemIntoPages(poemText) {
  const lines = poemText.split('\n').map(line => line.trimEnd()); // preserve line breaks

  const pages = [];
  for (let i = 0; i < lines.length; i += MAX_LINES_PER_PAGE) {
    const chunk = lines.slice(i, i + MAX_LINES_PER_PAGE);
    pages.push({
      content: chunk.join('\n'),
      isCentered: shouldCenterAlign(lines),
    });
  }

  return pages;
}




