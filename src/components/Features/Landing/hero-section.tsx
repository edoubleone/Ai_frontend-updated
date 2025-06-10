import telegram from "/images/telegram.png";
import email from "/images/email 2.png";
import instagram from "/images/instagram.png";
import linktree from "/images/linktree.png";
import messanger from "/images/messanger.png";
import slack from "/images/slack.png";
import soundwave from "/images/soundwave.png";
import twitter from "/images/twitter.png";
import whatsapp from "/images/WhatsApp-White-Dark-Background-Logo.wine 3.png";
import Button from "@/components/shared/button";
import { Link } from "react-router-dom";

const icons = [
  email,
  whatsapp,
  telegram,
  messanger,
  slack,
  instagram,
  twitter,
  linktree,
  soundwave,
];

const HeroSection = () => {
  return (
    <div className="pt-4 bg-white sm:pt-8">
      <div className="max-w-full bg-[url('/images/hero-section.png')] min-h-[887px] bg-no-repeat bg-center bg-contain mx-auto overflow-hidden lg:px-8">
        {/* Hero Content */}
        <div className="flex flex-col items-center px-4 pt-20 text-center gap-y-5 md:gap-y-8">
          <div className="space-y-2.5">
            <h1 className="font-semibold text-[24px] max-w-[68rem] mx-auto text-center px-4 md:text-5xl lg:text-6xl text-dark">
              Grow your business by using{" "}
              <span className="text-blue-600">AI</span> to make smarter
              engagement and sales
            </h1>

            <p className="w-[90%] mx-auto md:w-[75%] lg:w-[65%] text-sm lg:text-base">
              Enhance your business with intelligent automated responses across
              all platforms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center w-full gap-4 mt-2 sm:gap-6">
            <Link to={"/signup"}>
              <Button className="!min-w-40">Build a Bot</Button>
            </Link>

            <Link to={"/demo"}>
              <Button className="!min-w-40" variant="outline-blue">
                Book a Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center overflow-x-auto gap-x-6">
            {icons.map((icon, index) => (
              <img
                src={icon}
                key={index}
                alt="social icon"
                width={50}
                height={50}
              />
            ))}
          </div>

          {/* <div className="pb-32" /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
