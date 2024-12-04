"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Login, loginUser } from "@/utils/userData";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [user, setUser] = useState<Login>({ username: "", password: "" });
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await loginUser(user).then((data) => {
				if (typeof data === "string") {
					setError(`Erro ao realizar login: ${data}`);
				} else {
					localStorage.setItem("loggedIn", user.username);
					window.location.href = "/";
					setUsername("");
					setPassword("");
				}
			});
		} catch (err) {
			setError("Usuário ou senha incorretos.");
			console.error("Login error:", err);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const login: Login = {
			username: username,
			password: password,
		};
		setUser(login);
	}, [username, password]);
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<div className="flex items-center justify-center min-h-screen bg-background">
				<Navbar />
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Login</CardTitle>
						<CardDescription>
							Digite seu usuário e senha para acessar sua conta.
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="username">Usuário</Label>
								<Input
									id="username"
									type="text"
									placeholder="Digite seu usuário"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									disabled={isLoading}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									placeholder="Digite sua senha"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={isLoading}
								/>
							</div>
							<Link className="hover:text-accent text-sm" href={"/register"}>
								Não tem uma conta? Clique aqui!
							</Link>
							{error && <p className="text-sm text-red-500">{error}</p>}
						</CardContent>
						<CardFooter>
							<Button
								type="submit"
								className="w-full font-bold"
								disabled={isLoading}
							>
								{isLoading ? "Entrando..." : "Entrar"}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</ThemeProvider>
	);
}
