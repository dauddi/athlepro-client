import axios from "axios";

const AthleproAPI = axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "*",
		// Origin: "http://localhost:3000",
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
