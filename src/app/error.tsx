"use client";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const error = ({error, reset}: ErrorProps) => {
    return (
        <div>
            <p>{error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    )
}

export default error;