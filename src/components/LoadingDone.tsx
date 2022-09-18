import styled from "styled-components";
import { AssemblyData } from "../hooks/useAssemblyData";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// pace
// filler words
// no-no topics
// sentiment

export default function LoadingDone({ data }: { data: AssemblyData }) {
  const pace = Math.round(
    (Object.keys(data.words).length / data.audio_duration) * 60
  );
  const ums = data.words
    .map((w) =>
      w.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") === "um"
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b, 0);
  const uhs = data.words
    .map((w) =>
      w.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") === "uh"
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b, 0);
  const hmms = data.words
    .map((w) =>
      w.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") === "hmm"
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b, 0);
  const mhms = data.words
    .map((w) =>
      w.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") === "mhm"
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b, 0);
  const uhhuhs = data.words
    .map((w) =>
      w.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") ===
      "uh huh"
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b, 0);
  const bads = [];
  for (const [key, val] of Object.entries(data.content_safety_labels.summary)) {
    if (val > 0.5) bads.push(key);
  }

  return (
    <Container>
      <div style={{ textAlign: "left", height: "100%", maxWidth: "80%" }}>
        {data.sentiment_analysis_results.map((w) => (
          <span
            style={{
              background:
                w.sentiment === "POSITIVE"
                  ? "#DEFADE"
                  : w.sentiment === "NEGATIVE"
                  ? "#FFDBE3"
                  : "none",
            }}
          >
            {w.text}
            <span style={{ background: "none" }}> </span>
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <div>
          <span>
            {"wpm: " +
              pace +
              " " +
              (pace > 160
                ? "ur too fast"
                : pace < 140
                ? "ur too slow"
                : "just right")}
          </span>
        </div>
        <br />
        <div>
          <span>
            {`filler words: um (x${ums}), uh (x${uhs}), hmm (x${hmms}), mhm (x${mhms}), uh huh (x${uhhuhs}).`}
          </span>
        </div>
        <div>
          <span>
            watch out!! these topics may not be suitable for your audience:{" "}
          </span>
          {bads.map((w) => (
            <span>{w}</span>
          ))}
        </div>
      </div>
    </Container>
  );
}
