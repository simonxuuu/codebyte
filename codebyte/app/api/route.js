import React from 'react'

export async function GET(request) {
  const data = { message: 'Hello, Next.js!' };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}