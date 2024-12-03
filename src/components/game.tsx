"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Artist, type Genre, fetchArtists } from "@/utils/artistData";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import AnimatedMusicIcon from "./animated-music-icon";
import { Navbar } from "./navbar";
import { ThemeProvider } from "./theme-provider";

export default function ArtistGuessingGame() {
	const [targetArtist, setTargetArtist] = useState<Artist | null>(null);
	const [artists, setArtists] = useState<Artist[]>([]);
	const [loading, setLoading] = useState(false);
	const [guesses, setGuesses] = useState<Artist[]>([]);
	const [currentGuess, setCurrentGuess] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [suggestions, setSuggestions] = useState<Artist[]>([]);
	const [showCongrats, setShowCongrats] = useState(false);

	function resetGame() {
		setTargetArtist(artists[Math.floor(Math.random() * artists.length)]);
		setCurrentGuess("");
		setGuesses([]);
	}
	useEffect(() => {
		async function getData() {
			const artists: Artist[] = await fetchArtists().finally(() => {
				setLoading(true);
			});
			setArtists(artists);
			setTargetArtist(artists[Math.floor(Math.random() * artists.length)]);
		}
		getData();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCurrentGuess(value);
		setError(null);

		if (value.length > 0) {
			const filteredArtists = artists.filter((artist) =>
				artist.name.toLowerCase().includes(value.toLowerCase()),
			);
			setSuggestions(filteredArtists.slice(0, 5));
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (artist: Artist) => {
		setCurrentGuess(artist.name);
		setSuggestions([]);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const artistInfo = getArtistInfo(currentGuess);
		if (artistInfo) {
			setError(null);
			setGuesses([...guesses, artistInfo]);
			setCurrentGuess("");
			setSuggestions([]);
			if (artistInfo.name.toLowerCase() === targetArtist?.name.toLowerCase()) {
				setShowCongrats(true);
			}
		} else {
			setError("Artista não encontrado. Por favor tente outro.");
		}
	};

	const getResultColor = (
		field: keyof Artist,
		value: Genre[] | string | number | boolean,
	): string => {
		if (!targetArtist || targetArtist[field] === null) return "";

		if (typeof targetArtist[field] === "string" && typeof value === "string") {
			if (targetArtist[field].toLowerCase() === value.toLowerCase())
				return "bg-green-500";
		}
		if (
			(typeof targetArtist[field] === "boolean" &&
				typeof value === "boolean") ||
			(typeof targetArtist[field] === "number" && typeof value === "number")
		) {
			if (targetArtist[field] === value) return "bg-green-500";
		}
		if (
			typeof targetArtist[field] === "object" &&
			typeof value === "object" &&
			targetArtist[field].length > 0
		) {
			const filteredArray = targetArtist[field].filter((e) =>
				value.includes(e),
			);
			if (filteredArray.length === value.length) {
				return "bg-green-500";
			}
			if (filteredArray.length > 0) {
				return "bg-yellow-500";
			}
		}

		return "bg-red-500";
	};

	function getYearComparison(
		guessDecade: number,
	): "earlier" | "later" | "correct" {
		if (!targetArtist) return "correct";
		const targetDecade = targetArtist.decade;
		if (targetDecade === guessDecade) return "correct";
		return targetDecade > guessDecade ? "later" : "earlier";
	}

	function getAgeComparison(guessAge: number): "earlier" | "later" | "correct" {
		if (!targetArtist) return "correct";
		const targetAge = targetArtist.age;
		if (targetAge === guessAge) return "correct";
		return targetAge > guessAge ? "later" : "earlier";
	}
	function getArtistInfo(name: string): Artist | undefined {
		return artists.find(
			(artist: Artist) => artist.name.toLowerCase() === name.toLowerCase(),
		);
	}
	return (
		<>
			{!loading && <AnimatedMusicIcon />}

			{loading && (
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<motion.div
						initial={{ opacity: 0, y: 20, pointerEvents: "none" }}
						animate={{ opacity: 1, y: 0, pointerEvents: "all" }}
						transition={{ duration: 0.5 }}
						className="w-2/3 flex-col items-center justify-center p-4 pt-20 h-full"
					>
						<motion.h1
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200 }}
							className="text-2xl font-bold mb-4"
						>
							Descubra o artista!
						</motion.h1>
						<form onSubmit={handleSubmit} className="space-y-4 mb-8">
							<div className="relative">
								<Label htmlFor="name">Nome do artista</Label>
								<Input
									id="name"
									name="name"
									value={currentGuess}
									onChange={handleInputChange}
									required
									autoComplete="on"
								/>
								<AnimatePresence>
									{suggestions.length > 0 && (
										<motion.ul
											initial={{ opacity: 0, x: -10, pointerEvents: "none" }}
											animate={{ opacity: 1, x: 0, pointerEvents: "all" }}
											exit={{ opacity: 0, x: -10, pointerEvents: "none" }}
											transition={{ duration: 0.2 }}
											className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto"
										>
											{suggestions.map((artist) => (
												<motion.li
													key={artist.name}
													initial={{
														opacity: 0,
														x: -10,
														pointerEvents: "none",
													}}
													animate={{ opacity: 1, x: 0, pointerEvents: "all" }}
													exit={{ opacity: 0, x: -10, pointerEvents: "none" }}
													transition={{ duration: 0.2 }}
													className="px-4 py-2 hover:bg-accent cursor-pointer"
													onClick={() => handleSuggestionClick(artist)}
												>
													{artist.name}
												</motion.li>
											))}
										</motion.ul>
									)}
								</AnimatePresence>
							</div>
							<Button className="w-full" type="submit">
								Enviar
							</Button>
						</form>

						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, x: -10, pointerEvents: "none" }}
									animate={{ opacity: 1, x: 0, pointerEvents: "all" }}
									exit={{ opacity: 0, x: -10, pointerEvents: "none" }}
									transition={{ duration: 0.3 }}
								>
									<Alert variant="destructive" className="mb-4">
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								</motion.div>
							)}
						</AnimatePresence>

						<motion.div className="flex-col-reverse justify-end gap-4 flex overflow-y-scroll ">
							{guesses.map((guess, index) => (
								<motion.div
									key={guess.artistId}
									initial={{ opacity: 0, x: -20, pointerEvents: "none" }}
									animate={{ opacity: 1, x: 0, pointerEvents: "all" }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
									className="grid grid-cols-2 md:grid-cols-7 gap-2 border-b border-muted-foreground pb-4"
								>
									{(
										[
											"name",
											"age",
											"genres",
											"gender",
											"isAlive",
											"decade",
											"wonGrammy",
										] as const
									).map((field) => (
										<div
											key={field}
											className={`p-3 rounded-lg shadow-md font-semibold items-center flex justify-center text-center ${getResultColor(field, guess[field])}`}
										>
											{field === "genres" && (
												<span>
													{guess[field].map(
														(e) =>
															// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
															e.name,
													)}
												</span>
											)}
											{field === "wonGrammy" && (
												<span>
													{guess[field] ? "Tem Grammy" : "Sem Grammy"}
												</span>
											)}
											{field === "gender" && (
												<span>{!guess[field] ? "Banda" : guess[field]}</span>
											)}
											{field === "isAlive" && (
												<span>{guess[field] ? "Ativo" : "Inativo"}</span>
											)}
											{field === "name" && <span>{guess[field]}</span>}

											{field === "age" && <span>{guess[field]} anos </span>}
											{field === "age" &&
												getAgeComparison(guess[field]) !== "correct" && (
													<span className="text-white ml-2">
														{getYearComparison(guess[field]) === "later" ? (
															<ChevronUp className="w-5 h-5" />
														) : (
															<ChevronDown className="w-5 h-5" />
														)}
													</span>
												)}
											{field === "decade" && <span>Anos {guess[field]}</span>}
											{field === "decade" &&
												getYearComparison(guess[field]) !== "correct" && (
													<span className="text-white ml-2">
														{getYearComparison(guess[field]) === "later" ? (
															<ChevronUp className="w-5 h-5" />
														) : (
															<ChevronDown className="w-5 h-5" />
														)}
													</span>
												)}
										</div>
									))}
								</motion.div>
							))}
						</motion.div>

						<div className="mt-6 text-sm bg-muted p-4 rounded-lg">
							<p className="font-bold mb-2">Legenda</p>
							<ul className="list-disc list-inside space-y-1">
								<li className="flex items-center">
									<span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2" />{" "}
									Correto
								</li>
								<li className="flex items-center">
									<span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2" />{" "}
									Parcialmente correto
								</li>
								<li className="flex items-center">
									<span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2" />{" "}
									Incorreto
								</li>
								<li className="flex items-center">
									<span className="inline-flex items-center">
										<ChevronUp className="w-4 h-4 mr-2" /> Maior
									</span>
								</li>
								<li className="flex items-center">
									<span className="inline-flex items-center">
										<ChevronDown className="w-4 h-4 mr-2" /> Menor
									</span>
								</li>
							</ul>
						</div>

						<AnimatePresence>
							{showCongrats && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
									animate={{ opacity: 1, scale: 1, pointerEvents: "all" }}
									exit={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
									transition={{ duration: 0.5, type: "spring" }}
									className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
									onClick={() => {
										setShowCongrats(false);
										resetGame();
									}}
								>
									<motion.div
										initial={{ y: -50, opacity: 0, pointerEvents: "none" }}
										animate={{ y: 0, opacity: 1, pointerEvents: "all" }}
										exit={{ y: 50, opacity: 0, pointerEvents: "none" }}
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
										className="bg-background p-8 rounded-lg shadow-xl text-center"
										onClick={(e) => e.stopPropagation()}
									>
										<Alert>
											<AlertTitle className="text-2xl mb-2">
												Parabéns!
											</AlertTitle>
											<AlertDescription className="text-lg">
												Você acertou, o artista era: {targetArtist?.name}
											</AlertDescription>
										</Alert>
										<Button
											onClick={() => {
												setShowCongrats(false);
												resetGame();
											}}
											className="mt-4"
										>
											Jogar novamente
										</Button>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</ThemeProvider>
			)}
		</>
	);
}
