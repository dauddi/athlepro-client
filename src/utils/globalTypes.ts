interface AthleteProfileType {
	id?: string;
	firstName: string;
	lastName: string;
	gender: string;
	dateOfBirth: string;
	address: {
		street: string;
		city: string;
		zipCode: string;
		country: string;
	};
	sports: string;
	team: string;
	description: string;
}

export type { AthleteProfileType };
