"use client";

import dynamic from "next/dynamic";

const ArtistGuessingGame = dynamic(() => import("@/components/game"), {
	ssr: false,
});

export default function Home() {
	return (
		<main className="min-h-screen bg-background flex flex-col items-center justify-center">
			<ArtistGuessingGame />
		</main>
	);
}
