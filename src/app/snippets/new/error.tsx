"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
export default function ErrorPage() {
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}
