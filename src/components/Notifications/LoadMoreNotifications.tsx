"use client"

import { useState } from "react";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const LoadMoreNotifications = ({fetchNotifications}: {fetchNotifications: () => Promise<void>}) => {
  const [loading, setLoading] = useState(false);

  const handleFetchNextPageNotifications = () => {
    setLoading(true);
    fetchNotifications().then(() => {
      setLoading(false);
    })
  }

  return (<div className="flex justify-center">
    <Button onClick={handleFetchNextPageNotifications} disabled={loading} btnClass="px-2 py-1 text-xs">
      {loading ? <Spinner /> : "Load more"}
    </Button>
  </div>)
}

export default LoadMoreNotifications;
  
