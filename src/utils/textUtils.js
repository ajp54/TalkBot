// Fisher–Yates shuffle
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function decodeHtmlEntities(str) {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(`<!doctype html><body>${str}`, 'text/html').body.textContent;
  return decoded;
}

export function getLetterLabel(index) {
  return String.fromCharCode(65 + index); // 65 = 'A'
}

export function buildQueryString(paramsArray) {
  if (!Array.isArray(paramsArray) || paramsArray.length === 0) {
    return '';
  }

  const query = paramsArray
    .map(param => param.trim())
    .filter(Boolean)
    .join('&');

  return query ? `?${query}` : '';
}