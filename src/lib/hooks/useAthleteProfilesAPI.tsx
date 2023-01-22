import { useState } from "react";
import { apiEndpoints } from "../../utils/constants";
import { AthleteProfileType } from "../../utils/globalTypes";
import {
	AthleproAPIGETRequest,
	AthleproAPIPOSTRequest,
} from "../services/athleproAPI";

interface StateTypes {
	isLoading: boolean;
	error: unknown;
}

interface FetchProfilesStateTypes extends StateTypes {
	data: Array<AthleteProfileType>;
}

interface CreateProfilesStateTypes extends StateTypes {
	data: AthleteProfileType | null;
}

const useAthleteProfilesAPI = () => {
	const [profiles, setProfiles] = useState<FetchProfilesStateTypes["data"]>([]);
	const [fetchProfilesError, setFetchProfilesError] =
		useState<FetchProfilesStateTypes["error"]>(null);
	const [fetchProfilesLoading, setFetchProfilesLoading] =
		useState<FetchProfilesStateTypes["isLoading"]>(false);

	const [createProfilesState, setCreateProfilesState] =
		useState<CreateProfilesStateTypes>({
			isLoading: false,
			error: null,
			data: null,
		});

	const fetchProfiles = async () => {
		try {
			setFetchProfilesLoading(true);
			const response = await AthleproAPIGETRequest(apiEndpoints.profiles);

			if (response.status !== 200) {
				throw new Error("Something went wrong. Unable to fetch profiles.");
			}
			const data = await response.data;
			setProfiles(data);
		} catch (error) {
			setFetchProfilesError(error);
		} finally {
			setFetchProfilesLoading(false);
		}
	};

	const createProfile = async (profile: AthleteProfileType) => {
		setCreateProfilesState({ ...createProfilesState, isLoading: true });

		try {
			const response = await AthleproAPIPOSTRequest(
				apiEndpoints.profiles,
				profile
			);
			if (response.status !== 201) {
				throw new Error("Something went wrong. Unable to create profile.");
			}
			const data = await response.data;
			setCreateProfilesState({ ...createProfilesState, data });
		} catch (error) {
			setCreateProfilesState({ ...createProfilesState, error });
		} finally {
			setCreateProfilesState({ ...createProfilesState, isLoading: false });
		}
	};

	return {
		fetchProfiles,
		createProfilesState,
		createProfile,
		profiles,
		fetchProfilesError,
		fetchProfilesLoading,
	};
};

export default useAthleteProfilesAPI;
