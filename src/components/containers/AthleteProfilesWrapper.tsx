import React, { useEffect } from "react";
import useAthleteProfilesAPI from "../../lib/hooks/useAthleteProfilesAPI";
import { AthleteProfilesRouteHeader, AthleteProfilesTable } from "../ui";
import Loader from "../ui/Loader";

const AthleteProfilesWrapper = () => {
	const { fetchProfiles, profiles, fetchProfilesError, fetchProfilesLoading } =
		useAthleteProfilesAPI();

	useEffect(() => {
		void fetchProfiles();
	}, []);

	useEffect(() => {
		if (fetchProfilesError) {
			void console.error(fetchProfilesError);
		}
	}, [fetchProfilesError]);

	return (
		<div className="my-4">
			<>
				<AthleteProfilesRouteHeader
					title="Athlete profiles"
					subTitle="View all athlete profiles"
					primaryButtonText="Add profile"
				/>
				{!fetchProfilesLoading && profiles.length > 0 && (
					<div className="my-4">
						<AthleteProfilesTable profiles={profiles} />
					</div>
				)}
				{fetchProfilesLoading && (
					<div className="my-16">
						<Loader loaderText="Fetching profiles.." />
					</div>
				)}
				{!fetchProfilesLoading && profiles.length === 0 && (
					<div>No profiles found</div>
				)}
				{!fetchProfilesLoading && fetchProfilesError && (
					<div>Error fetching profiles</div>
				)}
			</>
		</div>
	);
};

export default AthleteProfilesWrapper;
