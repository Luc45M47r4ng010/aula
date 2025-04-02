import "./globals.css";
import RadialMenu from "@/components/RadialMenu";
import SkillSwapAppBar from "@/components/SkillSwapAppBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <SkillSwapAppBar />
        <main className="pt-16"></main>
        <RadialMenu />
        {children}
      </body>
    </html>
  );
}
