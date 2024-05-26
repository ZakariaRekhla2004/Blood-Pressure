"use client";

import React from "react";

import SidebarLinks from "./SidebarLinks";


export default function Sidebar() {
  return (
    <div className="hidden  min-h-screen lg:block border-r w-[260px] p-4 shadow-sm shadow-blue-200  bg-gradient-to-bl from-blue-50 via-blue-100 to-blue-200">
      <SidebarLinks />
    </div>
  );
}
