import { useState, useRef } from "react";

export default function Joke({ clickHandler }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const handleGenerate = () => {
    const checkboxes = contentRef.current?.querySelectorAll('input[type="checkbox"]');

    const categories = [];
    const types = [];

    checkboxes?.forEach((checkbox) => {
      if (checkbox.checked) {
        const group = checkbox.dataset.group;
        const value = checkbox.value;

        if (group === 'categories') {
          categories.push(value);
        } else if (group === 'type') {
          types.push(value);
        }
      }
    });

    const query = buildQueryString(categories, types);
    console.log("query: " + query);
    clickHandler(query);
  };

  return (
    <div className="joke-container api-options-entry" style={{ position: 'relative' }}>
      <h2>Funny Joke</h2>
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
          <h4>Categories</h4>
          <label><input type="checkbox" data-group="categories" value="programming" /> Programming</label><br />
          <label><input type="checkbox" data-group="categories" value="pun" /> Pun</label><br />
          <label><input type="checkbox" data-group="categories" value="spooky" /> Spooky</label><br />
          <label><input type="checkbox" data-group="categories" value="christmas" /> Christmas</label><br />
          <label><input type="checkbox" data-group="categories" value="misc" /> Misc</label><br />

          <h4>Type</h4>
          <label><input type="checkbox" data-group="type" value="single" /> Single</label><br />
          <label><input type="checkbox" data-group="type" value="twopart" /> Two Part</label><br />
        </div>
      </div>
      <button className="button" onClick={handleGenerate}>Tell Me</button>
    </div>
  );
}

function buildQueryString(categories, type) {
  let jokeCategories = "Programming,Miscellaneous,Pun,Spooky,Christmas";
  let jokeType = "";
  let blacklistString = "blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  let defaultParams = `${jokeType}?${blacklistString}`;

  if (Array.isArray(categories) && categories.length > 0) {
    jokeCategories = categories
      .map(param => param.trim())
      .filter(Boolean)
      .join(',');
    console.log("Categories: " + jokeCategories);
  }
  else {

  }

  if (Array.isArray(type) && type.length == 1) {
    jokeType = type
      .map(param => param.trim())
      .filter(Boolean)
      .join(',');
    console.log("Types: " + jokeType);
  }

  const jokeTypeString = jokeType ? `type=${jokeType}` : "";
  const query = categories
    .map(param => param.trim())
    .filter(Boolean)
    .join('&');

  let output = `${jokeCategories}?${blacklistString}&${jokeTypeString}`;
  return output;
}