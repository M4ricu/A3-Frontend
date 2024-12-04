"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Music } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AvatarToggle } from "./avatar-toggle";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (localStorage.getItem("loggedIn") !== null) {
			setUsername(localStorage.getItem("loggedIn") || "");
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 bg-background z-10 shadow-md dark:shadow-stone-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center">
						<Music className="h-8 w-8 text-primary" />
						<span className="ml-2 font-bold text-xl text-foreground">
							Single
						</span>
					</Link>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link
								href="/about"
								className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
							>
								Sobre
							</Link>
							<Link
								href="/settings"
								className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
							>
								Opções
							</Link>
							{!isLoggedIn && (
								<Link
									href="/login"
									className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
								>
									Login
								</Link>
							)}
							{isLoggedIn && (
								<AvatarToggle>{username.charAt(0).toUpperCase()}</AvatarToggle>
							)}
						</div>
					</div>
					<div className="md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="text-foreground">
									<Menu className="h-6 w-6" />
									<span className="sr-only">Abrir menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px]">
								<nav className="flex flex-col space-y-4 mt-6">
									<AnimatePresence>
										{isOpen && (
											<>
												<motion.div
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{ duration: 0.2, delay: 0.1 }}
												>
													<Link
														href="/about"
														className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-lg font-medium block"
														onClick={() => setIsOpen(false)}
													>
														Sobre
													</Link>
												</motion.div>
												<motion.div
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{ duration: 0.2, delay: 0.2 }}
												>
													<Link
														href="/settings"
														className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-lg font-medium block"
														onClick={() => setIsOpen(false)}
													>
														Opções
													</Link>
													{!isLoggedIn && (
														<Link
															href="/login"
															className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
															onClick={() => setIsOpen(false)}
														>
															Login
														</Link>
													)}
													{isLoggedIn && (
														<AvatarToggle>
															{username.charAt(0).toUpperCase()}
														</AvatarToggle>
													)}
												</motion.div>
											</>
										)}
									</AnimatePresence>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
}
