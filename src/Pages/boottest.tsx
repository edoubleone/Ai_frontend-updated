import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SendIconMain from "@/components/icons/SendIcon";
import MicroPhoneIcon from "@/components/icons/MicroPhoneIcon";
import AttachmentIcon from "@/components/icons/AttachmentIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import { CloseCircle } from "iconsax-reactjs";

interface BotSettings {
  business_id: string;
  description: string;
  system_name: string;
  powered_by: string;
  header_bg: string;
  header_text: string;
  button_bg: string;
  button_icon: string;
  message_box_style: "rounded" | "rectangular";
  position: "left" | "right";
  right: number;
  left: number;
  bottom: number;
  icon_url: string;
  general: {
    enabled: boolean;
  };
  colorsAndStyle: {
    enabled: boolean;
  };
  chatButton: {
    enabled: boolean;
  };
  additionalSettings: {
    enabled: boolean;
  };
}

function BotTest() {
  const [settings, setSettings] = useState<BotSettings>({
    business_id: "",
    system_name: "Argentic Bot",
    description: "",
    powered_by: "Powered by Argentic AI",
    header_bg: "#F5F5F5",
    header_text: "#000000",
    button_bg: "#4CAF50",
    button_icon: "#141B34",
    message_box_style: "rounded",
    position: "right",
    right: 20,
    left: 20,
    bottom: 20,
    icon_url: "",
    general: {
      enabled: false,
    },
    colorsAndStyle: {
      enabled: false,
    },
    chatButton: {
      enabled: false,
    },
    additionalSettings: {
      enabled: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (
    section: keyof Pick<
      BotSettings,
      "general" | "colorsAndStyle" | "chatButton" | "additionalSettings"
    >
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled: !prev[section].enabled,
      },
    }));
  };

  const handleInputChange = (
    field: keyof BotSettings,
    value: string | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    console.log("Data to submit to backend:", settings);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className=" ">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
          <div className="xl:col-span-3">
            <div className="h-[calc(100vh-200px)] overflow-y-auto p-8 bg-white rounded-lg ">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        General Settings
                      </h3>
                      <p className="text-sm text-gray-600">
                        Basic configuration for your bot
                      </p>
                    </div>
                    <Switch
                      checked={settings.general?.enabled || false}
                      onCheckedChange={() => handleToggle("general")}
                    />
                  </div>
                  {settings.general?.enabled && (
                    <div className="space-y-4 mt-4 border-b border-gray-300 pb-4">
                      <div>
                        <div>
                          <div
                            className="relative"
                            style={{
                              position: "relative",
                              marginBottom: "40px",
                            }}
                          >
                            <img
                              src={
                                settings.icon_url ||
                                "/images/botimageupload.png"
                              }
                              alt="icon"
                              className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {
                                document
                                  .getElementById("bot-icon-upload")
                                  ?.click();
                              }}
                              title="Click to change bot icon"
                            />
                            <div
                              className="absolute bottom-[0px] left-10 cursor-pointer"
                              style={{
                                background: settings.icon_url
                                  ? "red"
                                  : "#E7E7E7",
                                borderRadius: "50%",
                                padding: "4px",
                              }}
                              onClick={() => {
                                if (settings.icon_url) {
                                  handleInputChange("icon_url", "");
                                } else {
                                  document
                                    .getElementById("bot-icon-upload")
                                    ?.click();
                                }
                              }}
                              title="Click to change bot icon"
                            >
                              {settings.icon_url ? (
                                <CloseCircle />
                              ) : (
                                <SettingsIcon />
                              )}
                            </div>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target
                                      ?.result as string;
                                    handleInputChange("icon_url", result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id="bot-icon-upload"
                            />
                          </div>
                        </div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Assistants Name Displayed to Users
                        </label>
                        <Input
                          value={settings.system_name}
                          onChange={(e) =>
                            handleInputChange("system_name", e.target.value)
                          }
                          placeholder="Enter system name"
                          className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Description
                        </label>
                        <Input
                          minLength={7}
                          value={settings.description}
                          maxLength={10}
                          multiple={true}
                          min={10}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Enter Description"
                          className="w-full h-[100px] text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Powered By Text
                        </label>
                        <Input
                          value={settings.powered_by}
                          onChange={(e) =>
                            handleInputChange("powered_by", e.target.value)
                          }
                          placeholder="Powered by..."
                          className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Icon URL
                        </label>
                        <Input
                          value={settings.icon_url}
                          onChange={(e) =>
                            handleInputChange("icon_url", e.target.value)
                          }
                          placeholder="Enter icon URL"
                          className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div> */}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Colors and Style
                      </h3>
                      <p className="text-sm text-gray-600">
                        Appearance of the chat header and message styles
                      </p>
                    </div>
                    <Switch
                      checked={settings.colorsAndStyle.enabled}
                      onCheckedChange={() => handleToggle("colorsAndStyle")}
                    />
                  </div>
                  {settings.colorsAndStyle.enabled && (
                    <div className="space-y-6 mt-4 border-b border-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">
                          Chat Header background & Text over header
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 rounded-lg">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">
                              Chat Header background
                            </label>
                            <div className="flex items-center justify-center gap-1 bg-[#E7E7E7] rounded-lg">
                              <Input
                                type="color"
                                value={settings.header_bg}
                                onChange={(e) =>
                                  handleInputChange("header_bg", e.target.value)
                                }
                                className="h-12 w-14 rounded-lg border-none shadow-none"
                              />
                              <p>{settings.header_bg}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">
                              Text over header
                            </label>
                            <div className="flex items-center justify-center gap-1 bg-[#E7E7E7] rounded-lg">
                              <Input
                                type="color"
                                value={settings.header_text}
                                onChange={(e) =>
                                  handleInputChange(
                                    "header_text",
                                    e.target.value
                                  )
                                }
                                className="h-12 w-14 rounded-lg border-none shadow-none"
                              />
                              <p>{settings.header_text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">
                          Chat style
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 rounded-lg">
                          <Button
                            onClick={() =>
                              handleInputChange("message_box_style", "rounded")
                            }
                            className={`px-4 py-6 w-full transition-all duration-200 ${
                              settings.message_box_style === "rounded"
                                ? "bg-[#343CED] text-white shadow-lg"
                                : "bg-[#E7E7E7] text-black hover:bg-[#343CED] hover:text-white"
                            }`}
                          >
                            Rounded
                          </Button>
                          <Button
                            onClick={() =>
                              handleInputChange(
                                "message_box_style",
                                "rectangular"
                              )
                            }
                            className={`px-4 py-6 w-full transition-all duration-200 ${
                              settings.message_box_style === "rectangular"
                                ? "bg-[#343CED] text-white shadow-lg"
                                : "bg-[#E7E7E7] text-black hover:bg-[#343CED] hover:text-white"
                            }`}
                          >
                            Rectangular
                          </Button>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Chat Button
                      </h3>
                      <p className="text-sm text-gray-600">
                        Customize the appearance of the chat button
                      </p>
                    </div>
                    <Switch
                      checked={settings.chatButton.enabled}
                      onCheckedChange={() => handleToggle("chatButton")}
                    />
                  </div>
                  {settings.chatButton.enabled && (
                    <div className="space-y-4 mt-4 border-b border-gray-300 pb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">
                          Button Position
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 rounded-lg">
                          <Button
                            onClick={() =>
                              handleInputChange("position", "left")
                            }
                            className={`px-4 py-6 w-full transition-all duration-200 ${
                              settings.position === "left"
                                ? "bg-[#343CED] text-white shadow-lg"
                                : "bg-[#E7E7E7] text-black hover:bg-[#343CED] hover:text-white"
                            }`}
                          >
                            Left
                          </Button>
                          <Button
                            onClick={() =>
                              handleInputChange("position", "right")
                            }
                            className={`px-4 py-6 w-full transition-all duration-200 ${
                              settings.position === "right"
                                ? "bg-[#343CED] text-white shadow-lg"
                                : "bg-[#E7E7E7] text-black hover:bg-[#343CED] hover:text-white"
                            }`}
                          >
                            Right
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3 mt-5">
                            Color over button and Color over button
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full border border-gray-300 p-4 rounded-lg">
                            <div>
                              <label className="block text-sm text-gray-600 mb-2">
                                Button color
                              </label>
                              <div className="flex items-center justify-center w-full gap-1 bg-[#E7E7E7] rounded-lg">
                                <Input
                                  type="color"
                                  value={settings.button_bg}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "button_bg",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 w-14 rounded-lg border-none shadow-none"
                                />
                                <p>{settings.button_bg}</p>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-2">
                                Button Icon color
                              </label>
                              <div className="flex items-center justify-center w-full gap-1 bg-[#E7E7E7] rounded-lg">
                                <Input
                                  type="color"
                                  value={settings.button_icon}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "button_icon",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 w-14 rounded-lg border-none shadow-none"
                                />
                                <p>{settings.button_icon}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Position and Spacing
                      </h3>
                      <p className="text-sm text-gray-600">
                        Configure the position and spacing of the chat widget
                      </p>
                    </div>
                    <Switch
                      checked={settings.additionalSettings.enabled}
                      onCheckedChange={() => handleToggle("additionalSettings")}
                    />
                  </div>
                  {settings.additionalSettings.enabled && (
                    <div className="space-y-4 mt-4 border-b border-gray-300 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">
                            Right padding (px)
                          </label>
                          <Input
                            type="number"
                            value={settings.right}
                            onChange={(e) =>
                              handleInputChange(
                                "right",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="36"
                            className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">
                            Left padding (px)
                          </label>
                          <Input
                            type="number"
                            value={settings.left}
                            onChange={(e) =>
                              handleInputChange(
                                "left",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="20"
                            className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Bottom padding(px)
                        </label>
                        <Input
                          type="number"
                          value={settings.bottom}
                          onChange={(e) =>
                            handleInputChange(
                              "bottom",
                              parseInt(e.target.value)
                            )
                          }
                          placeholder="20"
                          className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 py-8 pr-8">
            <div
              style={{
                borderRadius: 20,
              }}
              className="bg-[#F5F5F5] rounded-lg overflow-hidden min-h-[calc(100vh-200px)] relative"
            >
              <div
                className="px-6 py-8 text-white flex items-center space-x-3"
                style={{
                  backgroundColor: settings.header_bg,
                  color: settings.header_text,
                }}
              >
                <img
                  src={
                    settings.icon_url
                      ? settings.icon_url
                      : "/images/botimage.png"
                  }
                  alt="icon"
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-xl">{settings.system_name}</div>
              </div>
              {/* Chat Messages - With padding applied only here */}
              <div
                className="space-y-4 h-[100%]"
                style={{
                  paddingTop: "24px",
                  paddingRight: `${settings.right}px`,
                  paddingLeft: `${settings.left}px`,
                  paddingBottom: `${settings.bottom}px`,
                }}
              >
                <div className="text-black flex items-center justify-center flex-col gap-2 mb-10">
                  <img
                    src={
                      settings.icon_url
                        ? settings.icon_url
                        : "/images/botimage.png"
                    }
                    alt="icon"
                    style={{
                      objectFit: "cover",
                      height: 100,
                      width: 100,
                    }}
                    className="w-17 h-17 rounded-full"
                  />
                  <div className="text-xl">{settings.system_name}</div>
                </div>

                {/* Bot Message */}
                <div className="flex items-start space-x-2">
                  <img
                    src={
                      settings.icon_url
                        ? settings.icon_url
                        : "/images/botimage.png"
                    }
                    alt="icon"
                    className="w-10 h-10 rounded-full"
                  />
                  <div
                    style={
                      settings.message_box_style === "rounded"
                        ? {
                            borderBottomLeftRadius: 35,
                            borderBottomRightRadius: 30,
                            borderTopRightRadius: 30,
                          }
                        : {}
                    }
                    className="px-4 py-4 max-w-xs bg-[#D0D0D0]"
                  >
                    <p className="text-sm">
                      Testing <span className="text-xs">3:13pm</span>
                    </p>
                  </div>
                </div>

                {/* Customer Message */}
                <div className="flex justify-end">
                  <div
                    style={
                      settings.message_box_style === "rounded"
                        ? {
                            borderBottomRightRadius: 35,
                            borderBottomLeftRadius: 30,
                            borderTopLeftRadius: 30,
                            border: "1px solid #D0D0D0",
                          }
                        : { border: "1px solid #D0D0D0" }
                    }
                    className={`px-4 py-4 max-w-xs ${
                      settings.message_box_style === "rounded"
                        ? "rounded-lg"
                        : "rounded-none"
                    } bg-[#2E2E2E] text-white`}
                  >
                    <p className="text-sm">
                      Customer says <span className="text-xs">3:13pm</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area - Positioned based on settings */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <div className="p-4">
                  <div
                    className="flex items-center space-x-4 bg-white p-2 px-4 rounded-lg gap-2"
                    style={{
                      flexDirection:
                        settings?.position === "right" ? "row" : "row-reverse",
                    }}
                  >
                    <Input
                      placeholder="Write a message.."
                      className="flex-1 h-12 text-base border-none shadow-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div
                      className="flex items-center gap-4"
                      style={{
                        flexDirection:
                          settings?.position === "right"
                            ? "row"
                            : "row-reverse",
                      }}
                    >
                      <AttachmentIcon color={settings?.button_icon} />
                      <MicroPhoneIcon color={settings?.button_icon} />
                      <SendIconMain color={settings?.button_icon} />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "#E7E7E7",
                    padding: 4,
                  }}
                >
                  <p className="text-sm text-gray-500 mt-2 mb-2 text-center">
                    {settings.powered_by}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default BotTest;
