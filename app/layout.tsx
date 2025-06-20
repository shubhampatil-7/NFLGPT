import "./global.css";

export const metadata = {
  title: "NFLGPT",
  description: "ALL Your Latest NFL questions answered",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
