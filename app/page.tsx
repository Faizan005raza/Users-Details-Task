"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <main className="w-full">
        <div className="text-center">
          <h1 className="text-5xl">Counter App</h1>
          <div className="my-50">
            <p className="text-4xl mb-5">Count is: {count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="text-3xl bg-blue-500 px-2"
            >
              +
            </button>
            <button
              onClick={() => setCount(count - 1)}
              className="text-3xl bg-red-500 px-2"
            >
              -
            </button>
            <button
              onClick={() => setCount(0)}
              className="text-3xl bg-gray-500 px-2"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
