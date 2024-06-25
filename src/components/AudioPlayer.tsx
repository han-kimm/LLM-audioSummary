"use client";

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

function AudioPlayer(props: { audioUrl: string; mimeType: string }) {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const audioSource = useRef<HTMLSourceElement>(null);

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    if (audioPlayer.current && audioSource.current) {
      audioSource.current.src = props.audioUrl;
      audioPlayer.current.load();
    }
  }, [props.audioUrl]);

  // handlers

  return (
    <Box>
      <audio ref={audioPlayer} controls className="w-full">
        <source ref={audioSource} type={props.mimeType} />
      </audio>
    </Box>
  );
}
export { AudioPlayer };
