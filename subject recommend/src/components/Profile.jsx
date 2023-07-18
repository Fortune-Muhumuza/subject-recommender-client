import React from 'react';
import { Card, Input } from 'antd';
import './Profile.css';

const { Search } = Input;
function ProfilePage() {
    return (
      <Card className="profile_container" title={<h3>Students</h3>} bordered={false}>
         <div className="search_bar">
        <Search placeholder="Search students..." enterButton />
      </div>
        <div className="profile_info">
          <div className="profile_picture">
            {/* Insert profile picture here */}
            <img src="/dp.png" alt="profile picture" className='dp'/>
          </div>
          <div className="profile_details">
            <h3>Tyler Bennett</h3>
            <p><b>Student ID:</b> 123456789</p>
            <p><b>Grade Level:</b> 11th Grade</p>
            <p><b>DOB:</b> January 1, 2005</p>
            <p><b>Email:</b> tyler.bennett@example.com</p>
          </div>
          <div className="profile_subjects">
          <h3>Subject Interests</h3>
          <ul>
            <li>Computer Science</li>
            <li>Civil Engineering</li>
            <li>Accounting</li>
          </ul>
        </div>
        </div>
      
      </Card>
    );
  }
  
  export default ProfilePage;
  