import React, { Fragment } from "react";

interface AppLayoutProps {
	children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<Fragment>
			<header>
				<nav className="text-center w-full py-4 border-b ">
					<h1 className="text-3xl font-semibold">
						Athle
						<span className="text-green-500">Pro.</span>
					</h1>
				</nav>
			</header>
			<main>{children}</main>
			<footer className="h-[40px] border-t rounded-sm fixed bottom-0 inset-x-0 ">
				<div>
					<p className="text-center text-xs my-2">
						Site by:{" "}
						<span>
							<a
								className="text-blue-500 underline "
								href="https://github.com/dauddi"
								target="_blank"
								rel="noreferrer"
							>
								{" "}
								Davis Okioma{" "}
							</a>
						</span>
					</p>
				</div>
			</footer>
		</Fragment>
	);
};

export default AppLayout;
