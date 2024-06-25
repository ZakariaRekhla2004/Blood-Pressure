import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/providers/AuthProvider";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " BP Tracker | Where developers suffere together",
  description: "daily.dev | Where developers suffere together",
};
export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en" className="black" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
