import React from "react";

type Props = {};

export default function SoonMore({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8">
      <div className="flex flex-col items-center space-y-2 px-3 py-2 rounded-full bg-gray-800 hover:border-gray-600">
        <p>More features incoming soon ✨ Stay tuned 😉</p>
      </div>
    </div>
  );
}
