import SecondaryInput from "@/components/shared/secondary-input";
import { Card } from "@/components/ui/card";

const ShareBots = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Test and Share bots</h1>

      <Card className="flex flex-col min-h-svh gap-6 py-4 px-4 sm:px-8 w-full">
        <SecondaryInput
          wrapperClass="max-w-[500px]"
          label="Get your demonstration link"
          value={`https://argentic.com/chat/demo.html?botId=yhhhgg3222..`}
        />

        <SecondaryInput
          wrapperClass="max-w-[500px]"
          label="You can share this link with your users so they can ask your assistant a question"
          value={`https://argentic.com/chat/demo.html?botId=yhhhgg3222..`}
        />
      </Card>
    </div>
  );
};

export default ShareBots;
