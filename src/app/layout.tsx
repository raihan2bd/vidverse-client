import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UILayout from "@/components/Layout/UILayout";
import Provider from "@/components/Provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidverse | Your favorite streaming site.",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit sequi delectus ipsam consequuntur perspiciatis eveniet dolores molestias, cumque consequatur sapiente ipsa, beatae sunt laboriosam labore recusandae unde est. Quasi?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <UILayout>{children}</UILayout>
        </Provider>
      </body>
    </html>
  );
}
