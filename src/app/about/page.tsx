import { Navbar } from "@/components/navbar";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function About() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main className="max-w-4xl mx-auto p-6 pt-24">
				<h1 className="text-4xl font-bold mb-8 text-primary flex items-center gap-4">
					<Image
						src="/avatar.png"
						height={90}
						objectFit="cover"
						width={100}
						alt="avatar"
						className="rounded"
					/>
					Mariana Oliveira Santos
				</h1>
				<section className="bg-card mb-12 rounded-lg p-6 shadow-lg dark:shadow-stone-900">
					<h2 className="text-3xl font-semibold mb-4 text-card-foreground">
						Contato
					</h2>
					<ul className="list-disc list-inside text-card-foreground">
						<p className="flex gap-2">
							<Mail /> marianaoliveirasantos207@gmail.com
						</p>
						<p className="flex gap-2">
							<Phone /> (11) 94515-6218
						</p>
					</ul>
				</section>
				<section className="bg-card mb-12 rounded-lg p-6 shadow-lg dark:shadow-stone-900">
					<h2 className="text-3xl font-semibold mb-4 text-card-foreground">
						Habilidades
					</h2>
					<ul className="list-disc list-inside text-card-foreground">
						<li>Bom relacionamento interpessoal para trabalho em equipe</li>
						<li>Inteligência emocional para lidar com os desafios diários</li>
						<li>Disposição para o aprendizado e aprimoramento contínuos</li>
						<li>
							Responsabilidade e autonomia para realização de trabalho remoto
						</li>
						<li>Capacidade de liderança e tomada de decisões assertivas</li>
					</ul>
				</section>
			</main>
		</div>
	);
}
