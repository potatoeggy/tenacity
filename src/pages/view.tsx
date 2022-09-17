import React from "react";
import LoadingScreen from "../components/Loading";
import useAssemblyData from "../hooks/useAssemblyData";

const View = () => {
  const [id, setId] = React.useState<string>("");
  const [wordMap, setWordMap] = React.useState<Record<string, number>>({});
  const [confidenceLevel, setConfidenceLevel] = React.useState(0);
  const { loading, data, error } = useAssemblyData(id);
  React.useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const paramId = params.get("id") as string;
    setId(paramId);
  }, []);
  React.useEffect(() => {
    if (!data) {
      return;
    }
    let confidenceLevel = 0;
    const tempWordMap: Record<string, number> = {};
    for (const word of data.words) {
      confidenceLevel += word.confidence;
      tempWordMap[word.text] = tempWordMap[word.text] + 1 || 1;
    }
    setWordMap(tempWordMap);
    setConfidenceLevel(confidenceLevel / data.words.length);
  }, [data]);

  return (
    <div>
      {loading && (
        <div>
          <LoadingScreen />
        </div>
      )}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>error</div>}
      <style scoped></style>
    </div>
  );
};

export default View;
