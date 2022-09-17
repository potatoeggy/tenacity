import React from "react";
import useAssemblyData from "../hooks/useAssemblyData";

const View = () => {
  const [id, setId] = React.useState<string>("");
  const { loading, data, error } = useAssemblyData(id);
  React.useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const paramId = params.get("id") as string;
    setId(paramId);
  }, []);

  return (
    <div>
      {loading && <div>hi this shit is loading</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>error</div>}
    </div>
  );
};

export default View;
