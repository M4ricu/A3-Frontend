export interface User {
	cpf: string;
	username: string;
	password: string;
}

export interface Login {
	username: string;
	password: string;
}

export async function loginUser(user: Login): Promise<Response | string> {
	try {
		const response = await fetch("http://localhost:8080/api/login", {
			// Substitua '/register' pelo endpoint correto
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			const errorData = await response.text();
			const errorMessage = errorData || response.statusText;
			return errorMessage;
		}

		return await response.json();
	} catch (error) {
		console.error("Erro na requisição:", error);
		throw error; // Repassa o erro para ser tratado pelo chamador
	}
}
export async function registerUser(user: User): Promise<Response | string> {
	try {
		const response = await fetch("http://localhost:8080/api/register", {
			// Substitua '/register' pelo endpoint correto
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			const errorData = await response.text();
			const errorMessage = errorData || response.statusText;
			return errorMessage;
		}

		return await response.json();
	} catch (error) {
		console.error("Erro na requisição:", error);
		throw error; // Repassa o erro para ser tratado pelo chamador
	}
}
