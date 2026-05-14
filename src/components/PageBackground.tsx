import { ReactNode } from "react";

interface PageBackgroundProps {
  backgroundImage: string;
  children: ReactNode;
}

const PageBackground = ({ backgroundImage, children }: PageBackgroundProps) => {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="fixed inset-0 bg-background/80 backdrop-blur-[2px]" />
      <div className="fixed inset-0 pointer-events-none scanline" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PageBackground;
