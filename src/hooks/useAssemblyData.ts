import React from "react";
import axios from "axios";

export default function useAssemblyData(id: string) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<AssemblyData | undefined>(undefined);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      if (id === "") {
        return;
      }
      const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
          authorization: import.meta.env.VITE_AI_API_KEY,
          "content-type": "application/json",
        },
      });
      const res = await assembly.get(`/transcript/${id}`);
      const data: AssemblyData = await res.data;
      if (data.status === "completed") {
        setLoading(false);
        setData(data);
        clearInterval(timer);
      } else if (data.status === "error") {
        setLoading(false);
        setData(undefined);
        setError(true);
        clearInterval(timer);
      }
      console.log(data.status);
    };
    const timer = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [id]);
  return { loading, data, error };
}

export type ContentSafeties =
  | "accidents"
  | "alcohol"
  | "financials"
  | "crime_violence"
  | "drugs"
  | "gambling"
  | "hate_speech"
  | "health_issues"
  | "manga"
  | "marijuana"
  | "disasters"
  | "negative_news"
  | "nsfw"
  | "pornography"
  | "profanity"
  | "sensitive_social_issues"
  | "terrorism"
  | "tobacco"
  | "weapons";

export interface AssemblyData {
  //acoustic_model: string;
  audio_duration: number;
  audio_url: string;
  confidence: number;
  //dual_channel: any;
  //format_text: boolean;
  id: string;
  //language_model: string;
  //punctuate: boolean;
  status: "completed" | "processing" | "queued" | "error";
  text: string;
  //utterances: any;
  //webhook_status_code: any;
  //webhook_url: string;
  words: AssemblyWord[];
  content_safety_labels: {
    status: "success" | "failure";
    //results: [];
    summary: Record<ContentSafeties, number>;
  };
  severity_score_summary: Record<
    ContentSafeties,
    {
      low: number;
      medium: number;
      high: number;
    }
  >;
  sentiment_analysis_results: SentenceSentiment[];
}

export interface SentenceSentiment {
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  text: string;
  confidence: number;
}
export interface AssemblyWord {
  confidence: number;
  end: number;
  start: number;
  text: string;
}
