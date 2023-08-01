import React from "react";
import { useData } from "./DataContext";

function Suggestions() {
  const { apiResponse,fetchingAnswer } = useData()
  return (
    <div className="response_container">
      {/* <h3>Suggested subjects</h3>
      <div className="subject_card_container">
        <div className="subject_card">Music</div>
        <div className="subject_card">Literature</div>
        <div className="subject_card">Art</div>
        <div className="subject_card">Commerce</div>
      </div> */}
      <h4>Summary</h4>

     {!fetchingAnswer? <p>
       {apiResponse?apiResponse:''}
      </p>:<p>Fetching answer...</p>}
    </div>
  );
}

export default Suggestions;
