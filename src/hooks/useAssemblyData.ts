import React from "react";
import axios from "axios";

export default function useAssemblyData(id: string) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(undefined);
  React.useEffect(() => {
    const fetchData = async () => {
      const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
          authorization: "YOUR-API-TOKEN",
          "content-type": "application/json",
        },
      });
      const res = await assembly.get(`/transcript/${id}`);
      const data = await res.data();
      if (data.status === "completed") {
        setLoading(false);
        setData(data);
      } else if (data.status === "error") {
        setLoading(false);
        setData(undefined);
      }
    };
    const timer = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return { loading, data };
}
