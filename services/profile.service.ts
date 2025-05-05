import { CurrentUserProps } from "@/types";

export const updateProfileApi = async (
	data: CurrentUserProps
): Promise<{
	success: boolean;
	message: string;
	data: CurrentUserProps | null;
}> => {
	if (!data) {
		return {
			success: false,
			message: "Invalid data",
			data: null,
		};
	}

	return {
		success: true,
		message: "Profile updated successfully",
		data: data,
	};
};
