export interface User {
	cpf: string;
	username: string;
	password: string;
}

export async function registerUser(user: User): Promise<Response> {
	try {
		const response = await fetch(
			"https://single-back-deploy-production.up.railway.app/register",
			{
				// Substitua '/register' pelo endpoint correto
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			},
		);

		if (!response.ok) {
			const errorData = await response.json(); // Tenta extrair informações de erro da resposta
			const errorMessage = errorData?.message || response.statusText; // Usa a mensagem de erro da resposta ou o statusText
			throw new Error(`Erro ao registrar usuário: ${errorMessage}`);
		}

		return response;
	} catch (error) {
		console.error("Erro na requisição:", error);
		throw error; // Repassa o erro para ser tratado pelo chamador
	}
}
