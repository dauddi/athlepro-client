import { Table } from "flowbite-react/lib/esm/components/Table";
import React from "react";
import { AthleteProfileType } from "../../utils/globalTypes";

interface AthleteProfileTableProps {
	profiles: Array<AthleteProfileType>;
}

function calculateAge(dateString: string): number {
	const birthDate = new Date(dateString);
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

const AthleteProfilesTable: React.FC<AthleteProfileTableProps> = ({
	profiles,
}) => {
	return (
		<Table hoverable={true}>
			<Table.Head>
				<Table.HeadCell>Name</Table.HeadCell>
				<Table.HeadCell>Age</Table.HeadCell>
				<Table.HeadCell>Team</Table.HeadCell>
				<Table.HeadCell>City</Table.HeadCell>
				<Table.HeadCell>Country</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">View</span>
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{profiles.map((profile: AthleteProfileType) => (
					<Table.Row
						key={profile.id}
						className="bg-white dark:border-gray-700 dark:bg-gray-800"
					>
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							{profile?.firstName + " " + profile?.lastName}
						</Table.Cell>
						<Table.Cell>
							{calculateAge(profile?.dateOfBirth) + " years"}
						</Table.Cell>
						<Table.Cell>{profile?.team}</Table.Cell>
						<Table.Cell>{profile?.address?.city}</Table.Cell>
						<Table.Cell>{profile?.address?.country}</Table.Cell>
						<Table.Cell>
							<a
								href="/"
								className="font-medium text-green-600 hover:underline dark:text-green-500"
							>
								View
							</a>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

export default AthleteProfilesTable;
