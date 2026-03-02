import { useState, useRef } from "react";

export default function Trivia({ clickHandler }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const handleGenerate = () => {
    const categoryParam = difficulty ? `&category=${category}` : "";
    const difficultyParam = difficulty ? `&difficulty=${difficulty}` : "";
    const typeParam = type ? `&type=${type}` : "";

    let query = categoryParam + difficultyParam + typeParam;

    console.log("query: " + query);
    clickHandler(query);
  };

  return (
    <div className="trivia-container api-options-entry">
      <h2>Piece of Trivia</h2>
      <a
        className={expanded ? 'expand-button expanded' : 'expand-button'}
        onClick={toggleExpanded}
        aria-label="Toggle options"
      >
        <img src="./img/caret-down-fill.svg" />
        {/* {expanded ? '▲' : '▼'} */}
      </a>

      <div
        ref={contentRef}
        className={`checkbox-wrapper ${expanded ? 'expanded' : ''}`}
      >
        <div className="checkbox-container">
          <h4>Category</h4>
          <select name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>

          <h4>Difficulty</h4>
          <label><input type="radio" name="difficulty" data-group="difficulty" value="easy" onChange={(e) => setDifficulty(e.target.value)} /> Easy</label><br />
          <label><input type="radio" name="difficulty" data-group="difficulty" value="medium" onChange={(e) => setDifficulty(e.target.value)} /> Medium</label><br />
          <label><input type="radio" name="difficulty" data-group="difficulty" value="hard" onChange={(e) => setDifficulty(e.target.value)} /> Hard</label><br />

          <h4>Type</h4>
          <label><input type="radio" name="type" data-group="type" value="multiple" onChange={(e) => setType(e.target.value)} /> Multiple Choice</label><br />
          <label><input type="radio" name="type" data-group="type" value="boolean" onChange={(e) => setType(e.target.value)} /> True / False</label><br />
        </div>
      </div>
      <button className="button" onClick={handleGenerate}>Tell Me</button>
    </div>
  );
}