"use client";

import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AudioPlayer } from "./AudioPlayer";

const SAMPLING_RATE = 16000;

function AudioManager() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks
  const [audioData, setAudioData] = useState<{
    buffer: AudioBuffer;
    url: string;
    blob: Blob;
    mimeType: string;
  }>();
  const [transcript, setTranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [systemPrompt, setSystemPrompt] =
    useState<string>(`우리는 쓰레기 수거업자와 배출자를 연결해주는 서비스 Haulla를 운영하고 있습니다.
  당신은 우리의 요약 전문 비서입니다. 고객이 우리의 서비스에 우호적인지 "고객 우호도:"로 시작하는 1문장으로 요약하고, 전화 내용을 "통화 요약:"으로 시작하는 1문장으로 알려주세요.
  영업 담당자가 취할 수 있는 미래 영업 전략이나 CS 전략을 "앞으로의 전략:"으로 시작하는 1문장으로 제안해주세요.
`);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    if (transcript) {
      setUserPrompt(transcript);
    }
  }, [transcript]);

  // handlers
  const getTranscription = async () => {
    if (audioData) {
      setLoading(true);

      const formData = new FormData();
      formData.append("audio", audioData.blob);

      const transcription = await axios.post(
        `${process.env.NEXT_PUBLIC_PUBLIC_URL}/transcribe`,
        formData
      );
      if (transcription) {
        setTranscript(transcription.data);
        setLoading(false);
      }
    }
  };

  const getSummary = async () => {
    if (!systemPrompt || !userPrompt) {
      return;
    }
    const summary = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_URL}/summarize`,
      {
        systemPrompt,
        userPrompt,
        transcript,
      }
    );

    setSummary(summary.data);
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Button onClick={() => {}} variant="contained">
        파일 업로드
      </Button>
      {audioData?.url && (
        <>
          <AudioPlayer
            audioUrl={audioData?.url ?? ""}
            mimeType={audioData?.mimeType ?? ""}
          />
          <Button onClick={getTranscription} variant="contained">
            텍스트로 변환하기
          </Button>
          {loading ? <p>로딩중...</p> : null}
          {!!transcript && (
            <>
              <div className="bg-gray-200 p-4 rounded-lg">
                <p>{transcript}</p>
              </div>
              <div>
                <div className="flex flex-col w-full gap-12 justify-center">
                  <hr />
                  <div>
                    <p className="font-bold text-[20px]">시스템 프롬프트</p>
                    <textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="text-black border border-black w-full h-32 p-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[20px]">유저 프롬프트</p>
                    <textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="유저 프롬프트"
                      className="text-black border border-black w-full h-32 p-4 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={getSummary} variant="contained">
                요약하기
              </Button>
              {summary && (
                <div className="bg-gray-200 p-4 rounded-lg whitespace-preline">
                  <p>{summary}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
export { AudioManager };
