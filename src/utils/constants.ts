const ATHLEPRO_API_BASE_URL =
	process.env.ATHLEPRO_API_BASE_URL ?? "http://localhost:8000";
const apiEndpoints = {
	profiles: "/profiles",
};
const CREATE_PROFILE_ROUTE = "/create-profile";

export { ATHLEPRO_API_BASE_URL, apiEndpoints, CREATE_PROFILE_ROUTE };
