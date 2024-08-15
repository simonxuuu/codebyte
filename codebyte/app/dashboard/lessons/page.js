"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../dashboard/dashboard.css'; 

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([{id:0,name:'yo'}]);

  useEffect(() => {
    // Fetch the list of lessons
    fetch('/api/lessons')
      .then(response => response.json())
      .then(data => setLessons(data))
      .catch(error => console.error('Error fetching lessons:', error));
  }, []);

  return (
    <main className="main">
      <h1>Lessons</h1>
      <ul className="lessonList">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="lessonItem">
            <Link href={`/dashboard/lessons/${lesson.name}`}>
              {lesson.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default LessonsPage;