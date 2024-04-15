"use client";
import { useEffect, useState } from "react";

const funnySentences = [
  "If at first, you don't succeed, then skydiving definitely isn't for you.",
  "I asked God for a bike, but I know God doesn't work that way. So, I stole a bike and asked for forgiveness.",
  "I'm not arguing, I'm just explaining why I'm right.",
  "I'm not lazy, I'm just on energy-saving mode.",
  "I'm not a complete idiot, some parts are missing.",
  "I'm trying to see things from your point of view, but I can't get my head that far up my butt.",
  "I would love to insult you, but I'm afraid I wouldn't do as well as nature did.",
  "I'm not a smart aleck; I'm a skilled, trained professional in pointing out the obvious and I speak fluent sarcasm.",
  "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
  "I’m not saying you’re dumb; you just have bad luck when it comes to thinking.",
  "I'm not as think as you drunk I am.",
  "I'd agree with you, but then we'd both be wrong.",
  "If you find me offensive, then I suggest you quit finding me.",
  "I'm not lazy; I'm just conserving energy.",
  "I'm not arguing; I'm simply explaining why I'm right.",
  "I'm not insulting you; I'm describing you.",
  "I’m not sarcastic; I’m just intelligent beyond your understanding.",
  "I'm not rude; I'm honest.",
  "I'm not crazy; I'm just creatively insane.",
  "I’m not weird; I’m limited edition.",
  "I'm not short-tempered; I just have a quick reaction to stupidity.",
  "I’m not trying to be difficult; it just comes naturally to me.",
  "I'm not stubborn; I'm just always right.",
  "I’m not slow; I’m just pacing myself.",
  "I’m not laughing at you; I’m laughing with you. You're just not laughing.",
];

const LoadingSkeleton = () => {
  const [randomSentence, setRandomSentence] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funnySentences.length);
      const randomSentence = funnySentences[randomIndex];
      setRandomSentence(randomSentence);
    }, 7000); // Change the interval time as needed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col shadow-lg items-center gap-2 p-2 my-2 rounded border-2 border-gray-900/70 justify-center">
      <p className="leading-6 animate-pulse">Fetching Site Details wait...</p>
      <p className="mb-4 leading-6 ">{randomSentence}</p>
    </div>
  );
};

export default LoadingSkeleton;
