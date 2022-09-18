import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(2);
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress >= 99) return;
      setProgress((p) => p + (100 - p) / 5);
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div style={{ width: "20rem" }}>
      <div
        style={{
          width: "100%",
          background: `linear-gradient(pink, pink) 0 / ${progress}% 100% no-repeat #ccc`,
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "1s all ease-out",
        }}
      >
        Processing {Math.round(progress) + "%"}
      </div>
      <style scoped></style>
    </div>
  );
}
