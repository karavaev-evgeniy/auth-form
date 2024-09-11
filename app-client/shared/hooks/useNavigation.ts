import { ROUTES } from "@client/app/types/router";
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
	const navigate = useNavigate();

	return {
		goToHome: () => navigate(ROUTES.HOME),
		goToLogin: () => navigate(ROUTES.LOGIN),
	};
};
