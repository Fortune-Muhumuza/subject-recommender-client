import React from "react";

function Suggestions() {
  return (
    <div className="response_container">
      <h3>Suggested subjects</h3>
      <div className="subject_card_container">
        <div className="subject_card">Music</div>
        <div className="subject_card">Literature</div>
        <div className="subject_card">Art</div>
        <div className="subject_card">Commerce</div>
      </div>
      <h4>Summary</h4>
      <p>
        Basing on the provided information, the suggested subjects for this
        student are commerce , literature and art, this is because this studnent
        has more abilities in the arts and creative areas
      </p>
    </div>
  );
}

export default Suggestions;
