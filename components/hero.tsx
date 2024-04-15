import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="text-white max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
      <div className="text-center flex gap-2 max-w-4xl mx-auto items-center justify-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
          Website Status{" "}
          <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
            Checker
          </span>
        </h1>
      </div>

      <div className="mt-5 text-center max-w-3xl mx-auto">
        <p className="text-lg">
          Checkcup is a website status monitoring tool that helps you to monitor
          your website's uptime and downtime. It notifies you when your website
          goes down.
        </p>
      </div>
    </div>
  );
};

export default Hero;
