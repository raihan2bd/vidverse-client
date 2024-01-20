import type { Metadata } from "next";
import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import UILayout from "@/components/Layout/UILayout";
import Provider from "@/components/Provider/Provider";
import { WebSocketProvider } from "@/context/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
  variable: "--font-lato",
});

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
      <body className={lato.className}>
        <Provider>
          <WebSocketProvider>
            <UILayout>{children}</UILayout>
          </WebSocketProvider>
        </Provider>
      </body>
    </html>
  );
}
