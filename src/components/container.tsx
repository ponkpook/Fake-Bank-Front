import React, { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-bg-green min-h-screen flex flex-col">
      {/* 导航栏 */}
      <Navbar />

      {/* 页面内容 */}
      <div className="flex-grow">{children}</div>

      {/* 页脚 */}
      <Footer />
    </div>
  );
};
