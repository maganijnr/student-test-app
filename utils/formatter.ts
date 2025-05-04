export function numberWithCommas(number: number) {
	if (!number) return number;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateRandomId = () => {
	return Math.random().toString(36).substring(2, 15);
};

export const shortenWord = (str: string, n: number) => {
	return str?.length >= n ? str.slice(0, n) + "..." : str;
};
