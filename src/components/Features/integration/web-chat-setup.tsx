import Button from "@/components/shared/button";
import copy from "@/assets/icons/copy-outline-white.svg";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const WebChatSetup = () => {
  return (
    <DialogContent className="!max-w-[870px]">
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Web chat setup</h1>
          <p className="text-base text-[#737373]">
            View instructions for deploying your chatbot on your website
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex border justify-between border-[#E7E7E7] rounded-lg p-5 flex-col gap-y-10">
            <div>
              <h1 className="text-dark font-bold text-lg">
                Using embed script
              </h1>
              <p className="text-base text-[#737373]">
                Deploying your bot is as simple as pasting the follow HTML
                snippet into your website pages
              </p>
            </div>

            <div className="bg-[#EEEEFD] flex rounded-2xl divide-y flex-col w-full">
              <pre className="mx-5 text-xs w-fit text-dark my-2.5 whitespace-pre-wrap break-all">
                <code>
                  {`
(function(r,e,s,o,c,h,a,t) { 
  r[c]=r[c]||function(){(r[c].a=r[c].a||[]).push(arguments)}; 
  t=e.createElement(s),a=e.getElementsByTagName(s)[0],t.async=1,t.src=o,a.parentNode.insertBefore(t,a) 
})(window,document,"script","https://resonoon.com/chat/js_chat.min.js?v="+new Date(Date.now()).setSeconds(0,0,0),"reso"); 
  reso("yg6GCWhs8g9vFV7OQvFhZYt57T3poP", "init");
`}
                </code>
              </pre>

              <Button wrapperclass="justify-end py-2.5 px-5" className="!bg-dark !w-fit">
                Copy
                <img src={copy} alt="copy icon" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between border border-[#E7E7E7] rounded-lg p-5 flex-col gap-y-10">
            <div className="flex justify-between">
              <div>
                <h1 className="text-dark font-bold text-lg">Customization</h1>
                <p className="text-base text-[#737373]">
                  For conversation customization, describe
                  the getUserData function, where you need to set user
                  parameters in the format shown in the example below
                </p>
              </div>

              <Switch />
            </div>

            <div className="bg-[#EEEEFD] flex rounded-2xl divide-y flex-col w-full">
              <pre className="mx-5 text-xs w-fit text-dark my-2.5 whitespace-pre-wrap break-all">
                <code>
                  {`
(function(r,e,s,o,c,h,a,t) { 
  r[c]=r[c]||function(){(r[c].a=r[c].a||[]).push(arguments)}; 
  t=e.createElement(s),a=e.getElementsByTagName(s)[0],t.async=1,t.src=o,a.parentNode.insertBefore(t,a) 
})(window,document,"script","https://resonoon.com/chat/js_chat.min.js?v="+new Date(Date.now()).setSeconds(0,0,0),"reso"); 
  reso("yg6GCWhs8g9vFV7OQvFhZYt57T3poP", "init");
`}
                </code>
              </pre>
              
              <Button wrapperclass="justify-end py-2.5 px-5" className="!bg-dark !w-fit">
                Copy
                <img src={copy} alt="copy icon" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default WebChatSetup;
