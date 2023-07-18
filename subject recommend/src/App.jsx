// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Input, Button } from "antd";
// import "./App.css";
// import LoginForm from "./components/Login";

// function App() {
//   const [hobbies, setHobbies] = useState("");
//   const [careerInterests, setCareerInterests] = useState("");
//   const [marks, setMarks] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/recommend", {
//         hobbies,
//         careerInterests,
//         marks,
//       });
//       setRecommendations(response.data.recommendations);
//       setError("");
//     } catch (error) {
//       setError(
//         "Error occurred while fetching recommendations. Please try again later."
//       );
//       setRecommendations([]);
//     }
//   };

//   const onFinish = (values) => {
//     console.log("Form values:", values);
//   };
//   return (
//     <div className="container">
//       <div className="nav">
//         <h3>Subject Recommender</h3>
//       </div>

// <div className="page_contents">
//   <div className="form">
//     <Form onFinish={onFinish}>
//       <h4>Subjects</h4>
//       <Form.Item
//         label="subject"
//         name="subject"
//         rules={[{ required: true, message: "Please enter your name" }]}
//       >
//         <Input placeholder="Enter your name" />
//       </Form.Item>

//       <Form.Item
//         label="Email"
//         name="email"
//         rules={[
//           { required: true, message: "Please enter your email" },
//           { type: "email", message: "Please enter a valid email" },
//         ]}
//       >
//         <Input placeholder="Enter your email" />
//       </Form.Item>
//       <h4>Hobbies</h4>
//       <Form.Item
//         label="Option 1"
//         name="phone"
//         rules={[{ required: true, message: "Please enter your option" }]}
//       >
//         <Input placeholder="Enter your phone number" />
//       </Form.Item>
//       <Form.Item
//         label="Option 2"
//         name="phone"
//         rules={[{ required: true, message: "Please enter your option" }]}
//       >
//         <Input placeholder="Enter your phone number" />
//       </Form.Item>
//       <h4>Career interests</h4>
//       <Form.Item
//         label="Option 1"
//         name="phone"
//         rules={[{ required: true, message: "Please enter your option" }]}
//       >
//         <Input placeholder="Enter your phone number" />
//       </Form.Item>
//       <Form.Item
//         label="Option 2"
//         name="phone"
//         rules={[{ required: true, message: "Please enter your option" }]}
//       >
//         <Input placeholder="Enter your phone number" />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   </div>
// <div className="response_container">
//   <h3>Suggested subjects</h3>
//   <div className="subject_card_container">
//     <div className="subject_card">Music</div>
//     <div className="subject_card">Literature</div>
//     <div className="subject_card">Art</div>
//     <div className="subject_card">Commerce</div>
//   </div>
//   <h4>Summary</h4>
//   <p>
//     It has roots in a piece of classical Latin literature from 45 BC,
//     making it over 2000 years old. Richard McClintock, a Latin professor
//     at Hampden-Sydney College in Virginia, looked up one of the more
//     obscure Latin words, consectetur
//   </p>
// </div>
//       </div>
// <div className="history_conatiner">
//   <h3>Records</h3>
//   Student name: <b>Tyler Bennett</b>
//   <br></br>
//   Career interests: <b>Computer science, Civil engineering, Accounting</b>
//   <br></br>
//   Grades:
//   <p>Maths: 60%</p>
//   <p>Physics: 60%</p>
//   <p>Literature: 60%</p>
//   <p>Commerce: 60%</p>
//   <br></br>
//   Recommended subjects:
//   <p>Maths</p>
//   <p>Physics</p>
//   <p>Literature</p>
//   <br></br>
//   Date Submitted: <b>Nov. 24th, 2021</b>
//   <br></br>
// </div>
//       <div>
//         <LoginForm />
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar";
import RoutesWithRedirect from "./RoutesWithRedirect";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div>
          <RoutesWithRedirect />
        </div>
      </div>
    </Router>
  );
}

export default App;



