const isValidEmail = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(value);
};

const isValidUrl = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	return regex.test(value);
};

const isValidCFDate = (value: any) => {
	try {
		if (!value || !isObject(value) || !value.day || !value.month || !value.year || !isValidNumber(value.day) || !isValidNumber(value.month) || !isValidNumber(value.year) || String(value.year).length !== 4) return false;

		const day = +value.day;
		const month = +value.month;
		const year = +value.year;

		if (!day || day < 1 || day > 31 || !month || month < 1 || month > 12) return false;

		const date = new Date(`${year}/${month}/${day}`);
		if (!date || !isValidNumber(date.getTime())) return false;

		const maxDaysInSelectedMonth = new Date(year, month, 0)?.getDate();
		if (day > maxDaysInSelectedMonth) return false;

		return true;
	} catch (err) {
		return false;
	}
};

const isValidCFTime = (value: any) => {
	try {
		if (!value || !isObject(value) || !isValidNumber(value.hour) || !isValidNumber(value.minute)) return false;

		const hour = +value.hour;
		const minute = +value.minute;

		if (hour < 0 || hour > 23 || minute < 0 || minute > 55) return false;
		if (minute % 5 !== 0) return false;

		return true;
	} catch (err) {
		return false;
	}
};

const isValidCFDateTime = (value: any) => {
	if (!isValidCFDate(value) || !isValidCFTime(value)) return false;
	return true;
}

const isValidDate = (value: any) => {
	if (!['number', 'string', 'object'].includes(typeof value)) return false;
	if (value instanceof Date && !isNaN(value.getTime())) return true;
	try {
		let ts = new Date(value)?.getTime();
		if (ts && !isNaN(ts) && ts === ts) return true;
		else return false;
	} catch (err) {
		return false
	}
};

const isValidPassword = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/;
	return regex.test(value);
};

const isValidNumber = (value: any, checkOnlyString: boolean = false) => {
	if (typeof value === 'number' && !checkOnlyString) return true;
	else if (typeof value === 'string') return (!isNaN(value as any) && !isNaN(parseFloat(value)));
	return false;
};

const isValidCreditCardNumber = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = new RegExp(
		'(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\\d{3})\\d{11}$)',
	);
	return regex.test(value);
}

const isValidCreditCardDate = (value: any) => {
	if (typeof value !== 'string') return false;
	if (![5, 7].includes(value.length)) return false;
	const regex = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
	if (!regex.test(value)) return false;

	let year: number;
	let month: number;
	const [m, y] = value.split('/');
	month = Number(m as string);
	if (value.length === 5) {
		year = 2000 + Number(y as string);
	} else {
		year = Number(y as string);
	}

	const now = new Date().getTime();
	const lastExpMoment = new Date(year, month, 0, 23, 59, 59).getTime();

	if (now > lastExpMoment) return false;

	return true;
}

const isValidCreditCardCVV = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = new RegExp(/^[0-9]{3,4}$/);
	return regex.test(value);
}

const isValidHexColor = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/;
	return regex.test(value);
};

const isValidRGBColor = (value: any) => {
	if (typeof value !== 'string') return false;
	const regex = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/;
	return regex.test(value);
};

const isValidColor = (value: any) => {
	if (typeof value !== 'string') return false;
	return isValidHexColor(value) || isValidRGBColor(value);
}

const isValidObjectId = (value: any) => {
	const regex = /^[a-f\d]{24}$/i;
	if (typeof value === 'string') return regex.test(value);
	else if (typeof value === 'object') {
		if ('toString' in value && typeof value.toString === 'function') {
			try {
				return regex.test(value.toString());
			} catch (err) {
				return false;
			}
		} else return false;
	} else return false;
}

const checkSwedishSSNChecksum = (value: string) => {
	const ssn = value.split('').reverse().slice(0, 10);
	if (ssn.length !== 10) return false;
	const checksum = ssn.map(n => +n).reduce((prev, curr, i) => {
		if (i % 2) curr *= 2;
		if (curr > 9) curr -= 9;
		return prev + curr
	});

	return checksum % 10 === 0;
}

const checkDanishSSNChecksum = (value: string) => {
	try {
		const multipliers = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];
		function sumProduct(a: any, b: any) {
			return a.reduce(function (sum: any, digit: any, i: any) { return sum + digit * b[i] }, 0)
		}
		function modulo11(cpr: string) {
			return sumProduct(cpr.split(''), multipliers) % 11
		}
		return modulo11(value) === 0
	} catch (err) {
		return false;
	}
}

const genSSNFormatBasedOnCountry = (country: ('sweden' | 'germany' | 'denmark')) => {
	if (country === 'denmark') return 'ddmmyynnnn';
	return 'yyyymmddnnnn';
}

const isValidSSN = (
	value: any,
	_country?: ('sweden' | 'germany' | 'denmark'),
	_format?: string,
	_env?: ('development' | 'production' | 'test')
) => {
	try {
		const country = _country ?? 'sweden';
		const format = _format ? _format.toLocaleLowerCase() : genSSNFormatBasedOnCountry(country);
		const env = _env ?? 'production';

		if (!value || typeof value !== 'string') return false;
		const ssn: string = (value.replace(/\D/g, '') as string);
		if (ssn.length !== format.length || !isValidNumber(ssn)) return false;

		const now = new Date();
		now.setHours(12);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);

		if (country === 'sweden') {
			if (ssn.length !== 12) return false;
			const year = Number(`${ssn[0]}${ssn[1]}${ssn[2]}${ssn[3]}`);
			const month = Number(`${ssn[4]}${ssn[5]}`);
			const day = Number(`${ssn[6]}${ssn[7]}`);
			if (!isValidCFDate({ year, month, day })) return false;

			const date = new Date(year, month - 1, day, 12, 0, 0);
			if (date.getTime() >= now.getTime()) return false;

			if (env === 'production' && !checkSwedishSSNChecksum(ssn)) return false;
		} else if (country === 'denmark') {
			if (ssn.length !== 10) return false;
			const day = Number(`${ssn[0]}${ssn[1]}`);
			const month = Number(`${ssn[2]}${ssn[3]}`);
			const year1 = Number(`19${ssn[4]}${ssn[5]}`);
			const year2 = Number(`20${ssn[4]}${ssn[5]}`);
			if (!isValidCFDate({ year: year1, month, day }) && !isValidCFDate({ year: year2, month, day })) return false;
			if (env === 'production' && !checkDanishSSNChecksum(ssn)) return false;
		} else if (country === 'germany') {
			if (ssn.length !== 12) return false;
			const year = Number(`${ssn[0]}${ssn[1]}${ssn[2]}${ssn[3]}`);
			const month = Number(`${ssn[4]}${ssn[5]}`);
			const day = Number(`${ssn[6]}${ssn[7]}`);

			const date = new Date(year, month - 1, day, 12, 0, 0);
			if (date.getTime() >= now.getTime()) return false;

			if (!isValidCFDate({ year, month, day })) return false;
		}

		return true;
	} catch (err) {
		return false;
	}
}

const exists = (value: any) => {
	return !([undefined, null].includes(value) || typeof value === 'undefined')
};

const isArray = (value: any) => Array.isArray(value);

const isBool = (value: any) => typeof value === 'boolean';

const isObject = (value: any) => (typeof value === 'object' && !Array.isArray(value) && ![null, undefined].includes(value));

const isFunction = (value: any) => typeof value === 'function';

const isNotEmpty = (value: any) => {
	if (!exists(value)) return false;
	if (Array.isArray(value)) return value.length !== 0;

	switch (typeof value) {
		case 'bigint': case 'number': return value !== 0;
		case 'boolean': return value === true;
		case 'object': return Object.keys(value)?.length > 0;
		case 'string': return value.trim() !== '';
		case 'symbol': return value.toString().trim() !== '';
		case 'function': return typeof value() === 'undefined';
		default: return false;
	}
}

const isEmpty = (value: any) => !isNotEmpty(value);

export const Validator = {
	isValidEmail,
	isValidUrl,
	isValidCFDate,
	isValidCFTime,
	isValidCFDateTime,
	isValidDate,
	isValidPassword,
	isValidNumber,
	isValidCreditCardNumber,
	isValidCreditCardDate,
	isValidCreditCardCVV,
	isValidHexColor,
	isValidRGBColor,
	isValidColor,
	isValidObjectId,
	exists,
	isArray,
	isBool,
	isObject,
	isFunction,
	isNotEmpty,
	isEmpty,
	isValidSSN,
}

// export default Validator;

export interface ValidatorInterface {
	isValidEmail: (value: any) => boolean;
	isValidUrl: (value: any) => boolean;
	isValidCFDate: (value: any) => boolean;
	isValidCFTime: (value: any) => boolean;
	isValidCFDateTime: (value: any) => boolean;
	isValidDate: (value: any) => boolean;
	isValidPassword: (value: any) => boolean;
	isValidNumber: (value: any, checkOnlyString?: boolean) => boolean;
	isValidCreditCardNumber: (value: any) => boolean;
	isValidCreditCardDate: (value: any) => boolean;
	isValidCreditCardCVV: (value: any) => boolean;
	isValidHexColor: (value: any) => boolean;
	isValidRGBColor: (value: any) => boolean;
	isValidColor: (value: any) => boolean;
	isValidObjectId: (value: any) => boolean;
	exists: (value: any) => boolean;
	isArray: (value: any) => boolean;
	isBool: (value: any) => boolean;
	isObject: (value: any) => boolean;
	isFunction: (value: any) => boolean;
	isNotEmpty: (value: any) => boolean;
	isEmpty: (value: any) => boolean;
	isValidSSN: (value: any, country?: ('sweden' | 'denmark' | 'germany'), format?: string, env?: ('development' | 'production' | 'test')) => boolean;
}