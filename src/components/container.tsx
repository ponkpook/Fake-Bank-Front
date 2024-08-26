import React, { ReactNode } from "react";
import { Navbar } from "./navbar";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-bg-green min-h-screen">
      {/* 导航栏 */}
      <Navbar />
      {children}
      {/* 页面内容 */}
    </div>
  );
};
