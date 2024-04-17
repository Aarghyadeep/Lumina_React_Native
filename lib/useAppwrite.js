import { useEffect, useState } from "react";

export default useAppWrite = (fn)=> {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = async()=> {
      setIsLoading(true);

      try {
        const response = await fn();

        setData(response);
      } catch (error) {
        console.log(error);
      } finally{
       setIsLoading(false);
      } 
    }

    useEffect(()=> {
        fetchData();
     }, [])

     const refetch = ()=> fetchData();

     return { data, isLoading, refetch };
}