import { useState, useEffect } from "react";
import { decodeHtmlEntities, getLetterLabel } from '../utils/textUtils';

export default function Typewriter({ startingText, answers }) {
  const [typedText, setTypedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    if (!startingText && (!answers || answers.length === 0)) return;

    const lines = [
      startingText,
      ...((answers || []).map((a, i) => `${getLetterLabel(i)}. ${decodeHtmlEntities(a)}`))
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let output = '';

    function typeNextLine() {
      if (lineIndex >= lines.length) return;

      const line = lines[lineIndex];

      const interval = setInterval(() => {
        output += line[charIndex];
        setTypedText(output);

        charIndex++;
        if (charIndex >= line.length) {
          clearInterval(interval);
          output += '\n';
          setTypedText(output);
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNextLine, 300);
        }
      }, 30);
    }

    setTypedText('');
    typeNextLine();
  }, [startingText, answers]);

  return (
    <div className="typewriter-output">
      <pre style={{ whiteSpace: 'pre-wrap' }}>{typedText}</pre>
    </div>
  );
}