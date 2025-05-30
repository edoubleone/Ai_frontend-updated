import email from "@/assets/images/email.png";
import Button from "@/components/shared/button";
import { Switch } from "@/components/ui/switch";

const Integrations = () => {
  return (
    <div className="bg-[#E7E7E7] flex flex-col gap-5 px-[50px] py-6 h-screen">
      <h1 className="text-dark text-2xl font-bold">Integrations</h1>

      <div className="flex flex-col rounded-lg gap-9 border py-6 px-9 bg-white h-full">
        {integrations.map((integration) => (
          <div key={integration.title}>
            <h4 className="text-dark text-lg font-bold">{integration.title}</h4>
            <p className="text-base text-[#737373]">
              {integration.description}
            </p>

            <div className="mt-9 grid items-start gap-x-5 gap-y-9 sm:grid-cols-2">
              {integration.channels.map((channel) => (
                <div
                  className="border border-[#E7E7E7] rounded-lg p-5"
                  key={channel.channel}
                >
                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-5">
                      <img
                        className="object-cover w-12 h-12"
                        src={channel.icon}
                        alt={channel.channel}
                      />
                      <div>
                        <h1 className="font-bold text-base text-[#171717]">
                          {channel.channel}
                        </h1>
                        <p className="text-sm text-[#171717]">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    <Switch />
                  </div>

                  <Button wrapperclass="justify-end mt-5" className="!w-fit">
                    Configure
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 18C9.5 18 15.5 13.5811 15.5 12C15.5 10.4188 9.5 6 9.5 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;

const integrations = [
  {
    title: "Notification channels",
    description: "Channels where leads collected by your bots will be sent",
    channels: [
      {
        channel: "Email",
        description:
          "Automatically send required information directly to your email. A great way to keep track of inquiries and follow-ups without missing any details.",
        icon: email,
      },
      {
        channel: "Webhook",
        description:
          "Call out to an external program based on events in your dialog.",
        icon: email,
      },
    ],
  },
  {
    title: "Social channels",
    description: "Channels where your bots connect",
    channels: [
      {
        channel: "Voice connection",
        description: "Connect your bot to a phone number as support manager",
        icon: email,
      },
      {
        channel: "Web chat",
        description:
          "Lorem ipsum dolor sit amet consectetur. Risus consequat etiam erat sed tincidunt amet. Ac risus magna in nisl purus in mollis magna. Vivamus ultrices.",
        icon: email,
      },
      {
        channel: "Telegram",
        description:
          "Make your Bot available to customers by adding it in to a Telegram as a bot",
        icon: email,
      },
      {
        channel: "WhatsApp",
        description:
          "Deliver an automated and personalized experience to each customer in WhatsApp",
        icon: email,
      },
      {
        channel: "E-mail IMAP",
        description:
          "Connect your bot to an E-mail inbox to receive and process messages",
        icon: email,
      },
    ],
  },
  {
    title: "API channels",
    description:
      "Channels where external systems can interact with your bots via API",
    channels: [
      {
        channel: "REST API",
        description:
          "Lorem ipsum dolor sit amet consectetur. Velit tortor eu sapien tellus placerat. Bibendum ultricies varius at in blandit vivamus. At nec eget tellus lacinia in. Amet.",
        icon: email,
      },
    ],
  },
  {
    title: "Available channels",
    description: "Channels your bots are able to connect to and interact with",
    channels: [
      {
        channel: "Facebook messenger",
        description:
          "Make your Bot available to customers through Facebook Messenger on the web or on native mobile clients",
        icon: email,
      },
      {
        channel: "Slack",
        description:
          "Make your Bot available to customers by adding it in to a Slack as a bot",
        icon: email,
      },
      {
        channel: "Instagram",
        description:
          "Make your Bot available to customers by adding it in to a Instagram as a bot",
        icon: email,
      },
      {
        channel: "X",
        description:
          "Make your Bot available to customers by adding it in to a X as a bot",
        icon: email,
      },
    ],
  },
];
