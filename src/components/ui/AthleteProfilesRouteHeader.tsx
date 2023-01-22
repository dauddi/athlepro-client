import React from "react";
import { Link } from "react-router-dom";
import { CREATE_PROFILE_ROUTE } from "../../utils/constants";

interface AthleteProfilesRouteHeaderProps {
	title: string;
	subTitle: string;
	primaryButtonText: string;
}

const AthleteProfilesRouteHeader: React.FC<AthleteProfilesRouteHeaderProps> = ({
	title,
	subTitle,
	primaryButtonText,
}) => {
	return (
		<div className="flex py-2 px-2 w-full justify-between items-center ">
			<div>
				<h2 className="text-xl text-slate-800 font-semibold ">{title}</h2>
				<p className="text-[13px] text-slate-500 font-medium">{subTitle}</p>
			</div>
			<div>
				<Link
					className="text-slate-50 px-4 py-2 text-sm bg-green-500 rounded-sm"
					to={CREATE_PROFILE_ROUTE}
				>
					{primaryButtonText}
				</Link>
			</div>
		</div>
	);
};

export default AthleteProfilesRouteHeader;
