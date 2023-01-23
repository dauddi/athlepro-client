import React from "react";
import AthleteProfieleForm from "../ui/AthleteProfieleForm";

const CreateProfileWrapper = () => {
	const handleAthleteFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<div className="flex flex-col items-center">
			<div className="text-center my-6">
				<h2 className="text-2xl">Create a new athlete profile</h2>
				<p className="text-sm text-slate-600 ">
					Complete the form below to continiue
				</p>
			</div>
			<AthleteProfieleForm handleAthleteFormSubmit={handleAthleteFormSubmit} />
		</div>
	);
};

export default CreateProfileWrapper;
