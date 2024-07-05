import { Validator } from '../Validator';

const hexToRGBA = (value: string) => {
	try {
		let c: any;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) {
			c = value.substring(1).split('');
			if (c?.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			c = '0x' + c.join('');
			return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
		} else return value;
	} catch (err) {
		console.log('hexToRGBA err: ', err);
		return value;
	}
}

const rgbToHex = (value: string) => {
	try {
		if (!value.startsWith('rgb(')) return value;
		let [r, g, b] = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')')).split(/,\s*/) as any[];
		if (!r || !g || !b) return value;
		if (!Validator.isValidNumber(r) || !Validator.isValidNumber(g) || !Validator.isValidNumber(b)) return value;
		if (+r < 0 || +r > 255 || +g < 0 || +g > 255 || +b < 0 || +b > 255) return value;
		return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
	} catch (err) {
		console.log('rgbToHex err: ', err);
		return value;
	}
}

const grossToNett = (gross: number, tax: number) => gross - (gross * tax / 100);

const nettToGross = (nett: number, tax: number) => nett / (1 - (tax / 100));

const stringWithDotToObject = (
	str: string,
	value: any
): [{ [key: string]: any }, string] => {
	const keys = str.split('.');
	if (keys.length === 2) return [{ [keys[1] as string]: value }, keys[0] as string];

	const firstKey = keys.shift()!;
	const lastKey = keys.pop()!;

	const obj = keys.reduceRight((acc, key) => ({ [key]: acc }), { [lastKey]: value });

	return [obj, firstKey]
}

const getValueFromObject = (
	obj: { [key: string]: any },
	key: string
) => {
	if (key.includes('.')) {
		return String(key).split('.').reduce((o, k) => (o || {})[k], obj);
	} else {
		return obj[key];
	}
}

const camelCaseToCapitalizedString = (str: string) => str.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());

const mapToObject = (map: Map<string, any>): Record<string, any> => {
	const obj: Record<string, any> = {};

	if (map && map.keys && typeof map.keys === 'function') {
		for (const key of map.keys()) {
			const value = map.get(key);

			if (value instanceof Map) {
				obj[key] = mapToObject(value);
			} else {
				obj[key] = value;
			}
		}
	}

	return obj;
};

const getInitialsFromName = (name: string) => {
	if (!name?.trim?.()) return 'XX';
	const arr = name.split(' ').filter(n => n && n.trim() ? true : false);
	if (arr.length === 0) return 'XX';
	if (arr.length === 1) {
		const name1 = arr[0];
		if (!name1) return 'XX';
		return name1[0]!.toLocaleUpperCase();
	}
	if (arr.length > 2) {
		const name1 = arr[0];
		const name2 = arr[arr.length - 1];
		if (!name1?.trim() || !name2?.trim()) return 'XX';
		return name1[0]!.toLocaleUpperCase() + name2[0]!.toLocaleUpperCase();
	}

	const [name1, name2] = arr;
	if (!name1?.trim() || !name2?.trim()) return 'XX';
	return name1[0]!.toLocaleUpperCase() + name2[0]!.toLocaleUpperCase();
}

const objectIdToTimestamp = (objectId: string) => {
	try {
		if (objectId && typeof objectId === 'string' && objectId.length === 24) {
			const str = objectId.substring(0, 8);
			const timestamp = parseInt(str, 16) * 1000;
			return timestamp;
		}
	} catch (err) {
		console.log('objectIdToTimestamp err: ', err);
	}

	return 0;
}

const formatFileSize = (bytes?: number) => {
	if (!bytes || typeof bytes !== 'number') return 'N/A';

	if (bytes < 1024) return bytes + " Bytes";
	else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
	else return (bytes / 1048576).toFixed(2) + " MB";
}

export const Converter = {
	hexToRGBA,
	rgbToHex,
	grossToNett,
	nettToGross,
	stringWithDotToObject,
	getValueFromObject,
	camelCaseToCapitalizedString,
	mapToObject,
	getInitialsFromName,
	objectIdToTimestamp,
	formatFileSize
}

export interface ConverterInterface {
	hexToRGBA: (value: string) => string;
	rgbToHex: (value: string) => string;
	grossToNett: (gross: number, tax: number) => number;
	nettToGross: (nett: number, tax: number) => number;
	stringWithDotToObject: (str: string, val: any) => [{ [key: string]: any }, string];
	getValueFromObject: (obj: { [key: string]: any }, key: string) => any;
	camelCaseToCapitalizedString: (str: string) => string;
	mapToObject: (map: Map<string, any>) => Record<string, any>;
	getInitialsFromName: (name: string) => string;
	objectIdToTimestamp: (objectId: string) => number;
	formatFileSize: (bytes?: number) => string;
}