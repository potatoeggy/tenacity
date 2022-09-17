import { useEffect, useState } from "react";
import "./Loading.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const paramId = parseInt(params.get("size") ?? "0");

    const timer = setInterval(() => {
      setProgress((p) => p + 2);

      if (progress < 200 && Math.random() < 0.5) {
        setProgress((p) => p - 2);
      }
    }, 5);
    return () => clearInterval(timer);
  });

  const style = ".";
  return (
    <div>
      <progress max="400" value={progress}></progress>
      <style scoped></style>
    </div>
  );
}
