import { Spinner } from "flowbite-react/lib/esm/components/Spinner";
import React from "react";

interface LoaderProps {
	loaderText?: string;
}

const Loader: React.FC<LoaderProps> = ({ loaderText }) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 ">
			<Spinner color="success" aria-label="Success spinner example" />
			<p className="text-xs text-secondary"> {loaderText} </p>
		</div>
	);
};

export default Loader;
