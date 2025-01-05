"use client";

import React from "react";

const UserInfo = ({ userName }: { userName: string }) => {
  // Get today's date and day name
  const today = new Date();
  const date = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString(undefined, { weekday: "long" });

  return (
    <div className="flex flex-col items-start text-left">
      <span className="text-xl font-semibold text-textLight">Hei, {userName}</span>
      <span className="text-sm text-muted-foreground">
        Today is {dayName}, {date}
      </span>
    </div>
  );
};

export default UserInfo;
