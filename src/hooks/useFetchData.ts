import { useEffect, useState } from "react";
import axios from 'axios';

const useFetchData = <T,>(url: string, token: string | null = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(200)
  const [data, setData] = useState<T | null>(null);

  // fetch data
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        const status =
          error && error.response && error.response.status
            ? error.response.status
            : 500;
        setStatus(status);
        switch (status) {
          case 401:
           setError("Failed to authenticate");
            break;
          case 403:
            setError("You are not authorized to access this resource");
            break;
          case 404:
            setError("Video not found");
            break;
          default:
            setError("Something went wrong");
            break;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();



}, [url, token])
return { loading, error, data, status };
};

export default useFetchData;