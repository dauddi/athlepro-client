import {
	Button,
	Label,
	Select,
	Spinner,
	Textarea,
	TextInput,
	Toast,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAthleteProfilesAPI from "../../lib/hooks/useAthleteProfilesAPI";
import { HiExclamation } from "react-icons/hi";

interface AthleteProfieleFormProps {
	handleAthleteFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const sampleSports = [
	{
		id: 1,
		name: "Football",
	},
	{
		id: 2,
		name: "Basketball",
	},
	{
		id: 3,
		name: "Volleyball",
	},
	{
		id: 4,
		name: "Tennis",
	},
	{
		id: 5,
		name: "Handball",
	},
	{
		id: 6,
		name: "Baseball",
	},
	{
		id: 7,
		name: "Hockey",
	},
	{
		id: 8,
		name: "Rugby",
	},
	{
		id: 9,
		name: "Golf",
	},
	{
		id: 10,
		name: "Cricket",
	},
];

const formSteps = ["Basic information", "About information", "Summary"];

const AthleteProfieleForm: React.FC<AthleteProfieleFormProps> = ({
	handleAthleteFormSubmit,
}) => {
	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		city: "",
		street: "",
		zipCode: "",
		country: "",
		dateOfBirth: "",
		description: "",
		gender: "Male",
		sport: "Football",
		team: "",
	});
	const [showErrorToast, setShowErrorToast] = useState(false);
	const navigate = useNavigate();

	const {
		createProfile,
		createProfileLoading,
		createdProfile,
		createProfileError,
	} = useAthleteProfilesAPI();

	const [step, setStep] = useState<number>(
		localStorage.getItem("step") ? JSON.parse(localStorage.getItem("step")!) : 1
	);

	useEffect(() => {
		if (localStorage.getItem("formState")) {
			const state = JSON.parse(localStorage.getItem("formState")!);
			setFormState(state);
		}
		if (localStorage.getItem("step")) {
			const step = JSON.parse(localStorage.getItem("step")!);
			setStep(step);
		}
	}, []);

	useEffect(() => {
		if (formState.firstName && formState.lastName) {
			localStorage.setItem("formState", JSON.stringify(formState));
		}
		localStorage.setItem("step", JSON.stringify(step));
	}, [formState, step]);

	useEffect(() => {
		if (createdProfile) {
			localStorage.removeItem("formState");
			localStorage.removeItem("step");
			void navigate("/");
		} else if (!createProfileLoading && createProfileError) {
			setShowErrorToast(true);
		}
	}, [createdProfile, createProfileError, createProfileLoading]);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleContinue = () => {
		if (step < 3) return void setStep(step + 1);
		createProfile({
			firstName: formState.firstName,
			lastName: formState.lastName,
			address: {
				city: formState.city,
				street: formState.street,
				zipCode: formState.zipCode,
				country: formState.country,
			},
			dateOfBirth: formState.dateOfBirth,
			description: formState.description,
			gender: formState.gender,
			sports: formState.sport,
			team: formState.team,
		});
	};
	const handleBack = () => {
		if (step > 1) return void setStep(step - 1);
	};
	return (
		<>
			{showErrorToast && (
				<Toast>
					<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
						<HiExclamation className="h-5 w-5" />
					</div>
					<div className="ml-3 text-sm font-normal">
						{JSON.stringify(createProfileError)}
					</div>
					<Toast.Toggle />
				</Toast>
			)}
			<form
				onSubmit={handleAthleteFormSubmit}
				className="w-[54%] grid grid-cols-2 gap-6 "
			>
				<h3 className="col-span-2 text-lg font-medium text-green-700 ">
					{" "}
					Step {step} of 3: {formSteps[step - 1]}{" "}
				</h3>
				{/* Step 1 */}
				{step === 1 && (
					<>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="firstName" value="First name " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								onChange={handleChange}
								value={formState.firstName}
								id="firstName"
								name="firstName"
								type="text"
								placeholder="John"
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="lastName" value="Last name " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								onChange={handleChange}
								value={formState.lastName}
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Snow"
								required={true}
							/>
						</div>
						<div id="select">
							<div className="mb-2 block">
								<Label htmlFor="gender" value="Select your gender " />
								<span className="text-red-600">*</span>
							</div>
							<Select
								name="gender"
								onChange={handleChange}
								value={formState.gender}
								id="gender"
								required={true}
							>
								<option disabled>Pick gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="None">Prefer not to say</option>
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="dateOfBirth" value="Date of birth " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="dateOfBirth"
								onChange={handleChange}
								value={formState.dateOfBirth}
								name="dateOfBirth"
								type="date"
								required={true}
							/>
						</div>
						<div id="select">
							<div className="mb-2 block">
								<Label htmlFor="sport" value="Sport " />
								<span className="text-red-600">*</span>
							</div>
							<Select
								onChange={handleChange}
								id="sport"
								value={formState.sport}
								name="sport"
								required={true}
							>
								<option disabled>Pick a sport</option>
								{sampleSports.map((sport) => (
									<option key={sport.id} value={sport.name}>
										{sport.name}
									</option>
								))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="team" value="Team " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="team"
								onChange={handleChange}
								value={formState.team}
								name="team"
								type="text"
								placeholder=""
								required={true}
							/>
						</div>
					</>
				)}
				{/* Step 2 */}
				{step === 2 && (
					<>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="street" value="Street address " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="street"
								name="street"
								onChange={handleChange}
								value={formState.street}
								type="text"
								placeholder="1234 Main St"
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="city" value="City " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="city"
								name="city"
								onChange={handleChange}
								value={formState.city}
								type="text"
								placeholder="New York"
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="zipCode" value="Zip code " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="zipCode"
								name="zipCode"
								onChange={handleChange}
								value={formState.zipCode}
								type="text"
								placeholder="10001"
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="country" value="Country " />
								<span className="text-red-600">*</span>
							</div>
							<TextInput
								id="country"
								name="country"
								onChange={handleChange}
								value={formState.country}
								type="text"
								placeholder="United States"
								required={true}
							/>
						</div>
						<div className="col-span-2" id="textarea">
							<div className="mb-2 block">
								<Label htmlFor="description" value="Description " />
								<span className="text-red-600">*</span>
							</div>
							<Textarea
								id="description"
								name="description"
								onChange={handleChange}
								value={formState.description}
								placeholder="Tell us about yourself.."
								required={true}
								rows={4}
							/>
						</div>
					</>
				)}
				{/* Step 3 */}
				{step === 3 && (
					<div className="col-span-2 grid grid-cols-3 space-y-6 ">
						<div className="space-y-1 self-end ">
							<h6 className="text-sm text-gray-800 font-semibold ">Name</h6>
							<p className="tracking-wide">
								{" "}
								{formState?.firstName + " " + formState?.lastName}{" "}
							</p>
						</div>
						<div className="space-y-1">
							<h6 className="text-sm text-gray-800 font-semibold ">Gender</h6>
							<p className="tracking-wide"> {formState?.gender} </p>
						</div>
						<div className="space-y-1">
							<h6 className="text-sm text-gray-800 font-semibold ">
								Date of birth
							</h6>
							<p className="tracking-wide"> {formState?.dateOfBirth} </p>
						</div>
						<div className="space-y-1 col-span-2">
							<h6 className="text-sm text-gray-800 font-semibold ">Sports</h6>
							<p className="tracking-wide"> {formState?.sport} </p>
						</div>
						<div className="space-y-1">
							<h6 className="text-sm text-gray-800 font-semibold ">Team</h6>
							<p className="tracking-wide">Southgate RFC</p>
						</div>
						<div className="space-y-1 col-span-3 ">
							<h6 className="text-sm text-gray-800 font-semibold ">Address</h6>
							<p className="tracking-wide">
								{formState?.street +
									", " +
									formState?.city +
									" - " +
									formState?.zipCode +
									", " +
									formState?.country}
							</p>
						</div>
						<div className="space-y-1 col-span-3 ">
							<h6 className="text-sm text-gray-800 font-semibold ">
								Description
							</h6>
							<p className="tracking-wide">{formState?.description}</p>
						</div>
					</div>
				)}
				<div className="flex w-full justify-between col-span-2 mt-6">
					<Button
						onClick={handleBack}
						disabled={step === 1 || createProfileLoading}
						color="gray"
						pill={true}
					>
						Back
					</Button>
					<div className="flex gap-8 items-center">
						<div className="text-pink-700 font-medium text-sm">
							<Link
								onClick={() => {
									localStorage.removeItem("formState");
									localStorage.removeItem("step");
								}}
								to="/"
							>
								Cancel
							</Link>
						</div>
						<Button
							disabled={createProfileLoading}
							onClick={handleContinue}
							color="success"
							pill={true}
						>
							{createProfileLoading ? (
								<>
									<Spinner aria-label="Spinner button example" />
									<span className="pl-3">Loading...</span>
								</>
							) : step < 3 ? (
								"Continue"
							) : (
								"Submit"
							)}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AthleteProfieleForm;
