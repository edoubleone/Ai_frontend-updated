
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TestShareBots = () => {
  return (
    <div className="bg-secondary p-8">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Test and Share bots</h1>
        
        <div className="space-y-6 bg-background min-h-[calc(100vh-200px)] rounded-lg px-[35px] py-[25px]">
          {/* Get your demonstration link */}
          <div className="space-y-3">
            <Label htmlFor="demo-link" className="text-sm font-medium text-gray-700">
              Get your demonstration link
            </Label>
            <Input
              id="demo-link"
              type="text"
              value="https://argentic.com/chat/demo.html?botId=yhhhhgg3222.."
              readOnly
              className="bg-white border-gray-300 text-gray-600"
            />
          </div>

          {/* Share link description and input */}
          <div className="space-y-3">
            <div className="text-sm text-gray-700">
              <p>You can share this link with your users so they can ask your assistant</p>
              <p>a question</p>
            </div>
            <Input
              type="text"
              value="https://argentic.com/chat/demo.html?botId=yhhhhgg3222.."
              readOnly
              className="bg-white border-gray-300 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestShareBots;