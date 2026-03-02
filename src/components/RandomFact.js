export default function RandomFact({ clickHandler }) {

  return (
    <div className="fact-container api-options-entry">
      <h2>Random Fact</h2>
      <button className="button" onClick={clickHandler}>Tell Me</button>
    </div>
  );
}