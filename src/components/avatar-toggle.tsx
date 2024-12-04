"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AvatarToggle({ ...props }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="text-background font-black hover:bg-muted-foreground cursor-pointer bg-foreground hover:text-accent-background flex items-center justify-center w-16 h-12 rounded-lg text-sm">
					{props.children}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						localStorage.removeItem("loggedIn");
						window.location.href = "/";
					}}
				>
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
