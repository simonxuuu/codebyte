"use client"

import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson_id');

  return <main>Lesson ID: {lessonId}</main>;
}