import email from "@/assets/images/email.png";
import telegram from "@/assets/images/telegram.png";
import voice from "@/assets/images/voice.png";
import webchat from "@/assets/images/webchat.png";
import whatsapp from "@/assets/images/whatsapp.png";
import x from "@/assets/images/x-icon.png";
import slack from "@/assets/images/slack-icon.png";
import webhook from "@/assets/images/webhook.png";
import restapi from "@/assets/images/rest-api.png";
import messenger from "@/assets/images/messenger-icon.png";
import imap from "@/assets/images/imap.png";
import instagram from "@/assets/images/ig-icon.png";

import EmailIntegrationSetup from "@/components/Features/integration/email-integration-setup";
import IMapIntegrationSetup from "@/components/Features/integration/imap-integration-setup";
import InstagramSetup from "@/components/Features/integration/instagram-setup";
import MessengerSetup from "@/components/Features/integration/messenger-setup";
import SlackSetup from "@/components/Features/integration/slack-setup";
import TelegramSetup from "@/components/Features/integration/telegram-setup";
import VoiceConnectionIntegrationSetup from "@/components/Features/integration/voice-connection-setup";
import WebChatSetup from "@/components/Features/integration/web-chat-setup";
import WebHookIntegrationSetup from "@/components/Features/integration/webook-integration-setup";
import WhatsappSetup from "@/components/Features/integration/whatsapp-setup";
import XSetup from "@/components/Features/integration/x-setup";
import Button from "@/components/shared/button";
import { Dialog } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

import { useState } from "react";

interface Channel {
  channel: ChannelType;
  description: string;
  icon: string;
}

interface Integration {
  title: string;
  description: string;
  channels: Channel[];
}

type ChannelType =
  | "Email"
  | "Webhook"
  | "Voice connection"
  | "Web chat"
  | "Telegram"
  | "WhatsApp"
  | "E-mail IMAP"
  | "REST API"
  | "Facebook messenger"
  | "Slack"
  | "Instagram"
  | "X";

const Integrations = () => {
  const [currentChannel, setCurrentChannel] = useState<ChannelType | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfigureClick = (channel: ChannelType) => {
    setCurrentChannel(channel);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="bg-[#E7E7E7] flex flex-col gap-5 px-[50px] py-6">
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={handleDialogClose}>
          {currentChannel === "Email" && <EmailIntegrationSetup />}
          {currentChannel === "Webhook" && <WebHookIntegrationSetup />}
          {currentChannel === "Voice connection" && (
            <VoiceConnectionIntegrationSetup />
          )}
          {currentChannel === "Web chat" && <WebChatSetup />}
          {currentChannel === "Telegram" && <TelegramSetup />}
          {currentChannel === "WhatsApp" && <WhatsappSetup />}
          {currentChannel === "E-mail IMAP" && <IMapIntegrationSetup />}
          {currentChannel === "Facebook messenger" && <MessengerSetup />}
          {currentChannel === "Slack" && <SlackSetup />}
          {currentChannel === "Instagram" && <InstagramSetup />}
          {currentChannel === "X" && <XSetup />}
        </Dialog>
      )}

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
                  className="border border-[#E7E7E7] h-full rounded-lg p-5"
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

                  <Button
                    wrapperclass="justify-end mt-5"
                    className="!w-fit"
                    onClick={() => handleConfigureClick(channel.channel)}
                  >
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

const integrations: Integration[] = [
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
        icon: webhook,
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
        icon: voice,
      },
      {
        channel: "Web chat",
        description:
          "Lorem ipsum dolor sit amet consectetur. Risus consequat etiam erat sed tincidunt amet. Ac risus magna in nisl purus in mollis magna. Vivamus ultrices.",
        icon: webchat,
      },
      {
        channel: "Telegram",
        description:
          "Make your Bot available to customers by adding it in to a Telegram as a bot",
        icon: telegram,
      },
      {
        channel: "WhatsApp",
        description:
          "Deliver an automated and personalized experience to each customer in WhatsApp",
        icon: whatsapp,
      },
      {
        channel: "E-mail IMAP",
        description:
          "Connect your bot to an E-mail inbox to receive and process messages",
        icon: imap,
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
        icon: restapi,
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
        icon: messenger,
      },
      {
        channel: "Slack",
        description:
          "Make your Bot available to customers by adding it in to a Slack as a bot",
        icon: slack,
      },
      {
        channel: "Instagram",
        description:
          "Make your Bot available to customers by adding it in to a Instagram as a bot",
        icon: instagram,
      },
      {
        channel: "X",
        description:
          "Make your Bot available to customers by adding it in to a X as a bot",
        icon: x,
      },
    ],
  },
];
