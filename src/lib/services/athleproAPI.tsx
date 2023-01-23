import axios from "axios";
import { ATHLEPRO_API_BASE_URL } from "../../utils/constants";

const AthleproAPI = axios.create({
	baseURL: ATHLEPRO_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const AthleproAPIGETRequest = async (endpoint: string) => {
	return AthleproAPI.get(endpoint);
};

const AthleproAPIPOSTRequest = async (endpoint: string, data: any) => {
	return AthleproAPI.post(endpoint, data);
};

const AthleproAPIPATCHRequest = async (endpoint: string, data: any) => {
	return AthleproAPI.patch(endpoint, data);
};

export {
	AthleproAPIGETRequest,
	AthleproAPIPOSTRequest,
	AthleproAPIPATCHRequest,
};
