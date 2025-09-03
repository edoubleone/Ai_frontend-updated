import Button from "@/components/shared/button";
import { Link } from "react-router-dom";
import email from "@/assets/images/email.png";
import telegram from "@/assets/images/telegram.png";
import voice from "@/assets/images/voice.png";

import whatsapp from "@/assets/images/whatsapp.png";
import x from "@/assets/images/x-icon.png";
import slack from "@/assets/images/slack-icon.png";

import restapi from "@/assets/images/rest-api.png";
import messenger from "@/assets/images/messenger-icon.png";

import instagram from "@/assets/images/ig-icon.png";
import Slider from "react-slick";

const icons = [
  email,
  whatsapp,
  telegram,
  messenger,
  slack,
  instagram,
  x,
  restapi,
  voice,
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 9,
  slidesToScroll: 8,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: false,
};

const HeroSection = () => {
  return (
    <div className="pt-20 md:pt-16 bg-white sm:pt-8 md:mb-[-9%] lg:mb-0">
      <div className="max-w-full  md:bg-[url('/images/hero-section.png')] min-h-full md:min-h-[687px] lg:min-h-[1087px] bg-no-repeat bg-center bg-contain mx-auto overflow-hidden lg:px-8">
        {/* Hero Content */}
        <div className="flex flex-col items-center px-4 pt-20 text-center gap-y-5 md:gap-y-8">
          <div className="space-y-2.5">
            <h1 className="font-semibold text-[24px] max-w-[68rem] mx-auto text-center px-4 md:text-5xl lg:text-6xl text-dark">
              Boost your business with an
              <span className="text-blue-600">AI Agent</span> that chats,
              captures leads, and drives sales—24/7.
            </h1>

            <p className="w-[90%] mx-auto md:w-[75%] lg:w-[65%] text-sm lg:text-base">
              Enhance Your Business with AI-Driven Responses that Engage,
              Qualify, and Convert leads
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center w-full gap-4 mt-2 sm:gap-6">
            <Link to={"/signup"}>
              <Button className="!min-w-40">Start Free Today</Button>
            </Link>

            <Link to={"/demo"}>
              <Button className="!min-w-40" variant="outline-blue">
                Request Demo
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden max-w-2xl mx-auto">
            <Slider {...settings}>
              {icons.map((icon, iconIndex) => (
                <div key={iconIndex} style={{ marginRight: 24 }}>
                  <img
                    src={icon}
                    alt="social icon"
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
