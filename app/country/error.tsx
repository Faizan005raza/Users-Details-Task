// This file MUST be a Client Component
'use client'; 

import { useEffect } from 'react';

// The error component must accept 'error' and 'reset' props
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Optional: Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <h1>🚨 Something Went Wrong!</h1>
      <p>We could not load the country data. </p>
      <p>Error details: **{error.message}**</p>
      
      {/* The reset function attempts to re-render the segment */}
      <button
        onClick={
          // Attempt to re-render the segment by calling the reset function
          () => reset()
        }
        style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
        }}
      >
        Try Again
      </button>
    </div>
  );
}