"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import BotChatPreview, { type BotChatPreviewProps } from "./BotChatPreview";
import { useFormikContext } from "formik";
import { type CustomizeFormValues } from "./create-bot/Types";
import SecondaryInput from "@/components/shared/secondary-input";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import AvatarComponent from "@/components/shared/custom-avatar";

export interface BotEditPageProps extends BotChatPreviewProps {
  onBack?: () => void;
}

export function BotEditPage({ onBack, switchColor }: BotEditPageProps) {
  const { values } = useFormikContext<CustomizeFormValues>();

  const [settings, setSettings] = useState({
    general: true,
    colorsAndStyle: true,
    chatButton: true,
    additionalSettings: true,
  });

  interface SettingsState {
    general: boolean;
    colorsAndStyle: boolean;
    chatButton: boolean;
    additionalSettings: boolean;
  }

  type SettingKey = keyof SettingsState;

  const handleSettingChange = (setting: SettingKey) => {
    setSettings((prev: SettingsState) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  values.general = settings.general;
  values.colorsAndStyle = settings.colorsAndStyle;
  values.chatButton = settings.chatButton;
  values.additionalSettings = settings.additionalSettings;

  return (
    <div className={`flex flex-col h-full ${onBack && "bg-gray-50"}`}>
      {/* Header with Back Button */}
      {onBack && (
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 p-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">My Bot</h1>
        </header>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col lg:flex-row gap-y-8 lg:gap-6 ${
          onBack && "p-6"
        }`}
      >
        {/* Settings Panel - Left Side */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>General</h3>
              <Switch
                checked={settings.general}
                className={switchColor}
                onCheckedChange={() => handleSettingChange("general")}
              />
            </div>
            <p className="text-sm text-gray-600">
              Set your bot name, avatar, description and functionality
            </p>

            {values.general && (
              <div className="mt-5 flex flex-col gap-y-4">
                <SecondaryInput
                  label="Assistant's Name Displayed to Users"
                  placeholder="Enter Assistant's Name"
                />

                <SecondaryTextArea
                  info
                  hasMax
                  maxLength={50}
                  placeholder="Describe the assistant's purpose and behavior"
                  label="Assistant's Description"
                />
              </div>
            )}
          </div>

          {/* Colors and Style */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>
                Colors and style
              </h3>
              <Switch
                checked={settings.colorsAndStyle}
                onCheckedChange={() => handleSettingChange("colorsAndStyle")}
              />
            </div>
            <p className="text-sm text-gray-600">
              Appearance of the chat header and the chat window styles
            </p>

            {values.colorsAndStyle && (
              <div className="mt-5 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-4">
                  <p className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold">
                    Chat Header Background & Text Over Head
                  </p>
                  <div className="grid border rounded-md p-3 grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <p className="text-sm font-medium">
                        Chat Header Background
                      </p>
                      <div className="bg-[#E7E7E7] flex p-2 justify-center items-center gap-2 rounded-md">
                        <span className="size-7 rounded-md bg-white" />
                        <p className="text-sm font-medium ">#FFFFFF</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <p className="text-sm font-medium">Text Over Header</p>
                      <div className="bg-[#E7E7E7] flex p-2 justify-center items-center gap-2 rounded-md">
                        <span className="size-7 rounded-md bg-black" />
                        <p className="text-sm font-medium">#000000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <p className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold">
                    Chat Style
                  </p>
                  <div className="grid border rounded-md p-3 grid-cols-2 gap-x-4">
                    <button className="bg-[#E7E7E7] rounded-md p-3 text-sm font-medium">
                      Rounded
                    </button>

                    <button className="bg-defaultBlue text-white rounded-md p-3 text-sm font-medium">
                      Rectangular
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Button */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>
                Chat button
              </h3>
              <Switch
                checked={settings.chatButton}
                onCheckedChange={() => handleSettingChange("chatButton")}
              />
            </div>
            <p className="text-sm text-gray-600">
              Customize the appearance of the chat button
            </p>

            {values.chatButton && (
              <div className="mt-5 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-4">
                  <p className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold">
                    Button Position
                  </p>
                  <div className="grid border rounded-md p-3 grid-cols-2 gap-x-4">
                    <button className="bg-[#E7E7E7] rounded-md p-3 text-sm font-medium">
                      Right
                    </button>

                    <button className="bg-defaultBlue text-white rounded-md p-3 text-sm font-medium">
                      Left
                    </button>
                  </div>
                </div>

                <SecondaryInput
                  label="Button Text"
                  placeholder="Enter Button Text"
                />

                <div className="flex flex-col gap-y-4">
                  <p className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold">
                    Icon
                  </p>
                  <div className="flex overflow-x-auto border rounded-md p-3 gap-x-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                      <button
                        key={item}
                        className="bg-[#E7E7E7] rounded-md p-2 text-sm font-medium"
                      >
                        <AvatarComponent avatarClass="size-6" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <p className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold">
                    Color over button
                  </p>
                  <div className="grid border rounded-md p-3 grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <p className="text-sm font-medium">Button Color</p>
                      <div className="bg-[#E7E7E7] flex p-2 justify-center items-center gap-2 rounded-md">
                        <span className="size-7 rounded-md bg-white" />
                        <p className="text-sm font-medium ">#FFFFFF</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <p className="text-sm font-medium">Color Over Button</p>
                      <div className="bg-[#E7E7E7] flex p-2 justify-center items-center gap-2 rounded-md">
                        <span className="size-7 rounded-md bg-black" />
                        <p className="text-sm font-medium">#000000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>
                Additional settings
              </h3>
              <Switch
                checked={settings.additionalSettings}
                onCheckedChange={() =>
                  handleSettingChange("additionalSettings")
                }
              />
            </div>
            <p className="text-sm text-gray-600">
              Configure the conversation timeout, enabling parameters and chat
              initialization delay for a seamless user experience
            </p>

            {values.additionalSettings && (
              <div className="mt-5 flex flex-col gap-y-4">
                <SecondaryInput
                  label="Right padding"
                  placeholder="Enter Right padding"
                />

                <SecondaryInput
                  label="Bottom padding"
                  placeholder="Enter Bottom padding"
                />
              </div>
            )}
          </div>
        </div>

        {/* Chat Preview - Right Side */}
        <div className="h-[600px]">
          <BotChatPreview />
        </div>
      </div>

      {/* Save Changes Button - Fixed Position */}
      {onBack && (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
