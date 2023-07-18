import React from 'react'
import './History.css'
// import 'antd/dist/antd.css';
import { Card, Input } from 'antd';

const { Search } = Input;
function Records() {
    return (
      <Card className="history_container" title={<h3>Records</h3>} bordered={false}>
        <Search placeholder="Search students..." enterButton />
        <p>
          <b>Student name:</b> Tyler Bennett
        </p>
        <p>
          <b>Career interests:</b> Computer science, Civil engineering, Accounting
        </p>
        <p>
          <b>Grades:</b>
        </p>
        <ul>
          <li>Maths: 60%</li>
          <li>Physics: 60%</li>
          <li>Literature: 60%</li>
          <li>Commerce: 60%</li>
        </ul>
        <p>
          <b>Recommended subjects:</b>
        </p>
        <ul>
          <li>Maths</li>
          <li>Physics</li>
          <li>Literature</li>
        </ul>
        <p>
          <b>Summary:</b>
        </p>
        <p>
        Basing on the provided information, the suggested subjects for this
        student are commerce , literature and art, this is because this studnent
        has more abilities in the arts and creative areas
      </p>
        <p>
          <b>Date Submitted:</b> Nov. 24th, 2021
        </p>
      </Card>
    );
  }
  

export default Records