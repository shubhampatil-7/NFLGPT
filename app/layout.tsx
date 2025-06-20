import "./global.css";

export const metadata = {
  title: "F1GPT",
  description: "ALL Your f1 questions answered",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
