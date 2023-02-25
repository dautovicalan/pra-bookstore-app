import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  

  console.log(url)

  useEffect(async () => {
      setLoading('loading...')
      setData(null);
      setError(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (error) {
          setLoading(false);
          setError("Error happened");
      }            
  }, [url])

  return { data, loading, error }
}

export default useFetch;