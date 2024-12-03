import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Open_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Single: guess the artist!",
	description: "A wordle-like artist game.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
