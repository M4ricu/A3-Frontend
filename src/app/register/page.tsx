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
import { type User, registerUser } from "@/utils/userData";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [cpf, setCpf] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [user, setUser] = useState<User>({
		username: "",
		password: "",
		cpf: "",
	});
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await registerUser(user).then((data) => {
				if (typeof data === "string") {
					setError(`Erro ao registrar usuário: ${data}`);
				} else {
					window.location.href = "/login";
					setUsername("");
					setPassword("");
				}
			});
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const newUser: User = {
			cpf: cpf,
			username: username,
			password: password,
		};
		setUser(newUser);
	}, [username, password, cpf]);
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
						<CardTitle className="text-2xl font-bold">Registro</CardTitle>
						<CardDescription>
							Digite seu CPF, usuário e senha para registrar-se.
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="cpf">CPF</Label>
								<Input
									id="CPF"
									type="text"
									placeholder="Digite seu CPF"
									value={cpf}
									onChange={(e) => setCpf(e.target.value)}
									pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
									title="Digite um CPF válido"
									required
									disabled={isLoading}
								/>
							</div>
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
							{error && <p className="text-sm text-red-500">{error}</p>}
						</CardContent>
						<CardFooter>
							<Button
								type="submit"
								className="w-full font-bold"
								disabled={isLoading}
							>
								{isLoading ? "Cadastrando..." : "Registrar-se"}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</ThemeProvider>
	);
}
