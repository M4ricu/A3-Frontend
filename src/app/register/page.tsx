"use client";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { type User, registerUser } from "@/utils/userData";
import { useEffect, useState } from "react";
export default function Settings() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const rodrigo: User = {
			cpf: "495.057.598-86",
			username: "buskik",
			password: "123",
		};
		registerUser(rodrigo).then((response) => {
			console.log(response);
			setUser(rodrigo);
		});
	}, []);
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
					<h1>{user?.cpf}</h1>
					<h1>{user?.username}</h1>
					<h1>{user?.password}</h1>
				</main>
			</div>
		</ThemeProvider>
	);
}
