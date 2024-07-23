import { Button } from "@mui/material";

function Summary({
  systemPrompt,
  userPrompt,
  setSystemPrompt,
  setUserPrompt,
  onClickSummary,
}: {
  systemPrompt: string;
  userPrompt: string;
  setSystemPrompt: (str: string) => void;
  setUserPrompt: (str: string) => void;
  onClickSummary: () => void;
}) {
  return (
    <>
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
      <Button onClick={onClickSummary} variant="contained">
        요약하기
      </Button>
    </>
  );
}
export { Summary };
