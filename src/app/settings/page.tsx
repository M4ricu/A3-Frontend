"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
export default function Settings() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<div className="min-h-screen bg-background">
				<Navbar />
				<main className="max-w-4xl mx-auto p-6 pt-24">
					<h1 className="text-4xl font-bold mb-8 text-primary">Opções</h1>
					<section className="mb-8 bg-card rounded-lg p-6 shadow-lg dark:shadow-stone-900">
						<h2 className="text-3xl font-semibold mb-4 text-card-foreground">
							Tema
						</h2>
						<div className="flex items-center space-x-4">
							<span className="text-card-foreground">
								Escolha o tema que preferir:
							</span>
							<ModeToggle />
						</div>
					</section>
				</main>
			</div>
		</ThemeProvider>
	);
}
