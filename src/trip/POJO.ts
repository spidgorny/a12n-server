export class POJO {

	[key: string]: any;

	constructor(props: any) {
		Object.assign(this, props);
	}

	assignProps(props: any) {
		for (const key in props) {
			if (props.hasOwnProperty(key)) {
				console.log('this[', key, '] = ', props[key]);
				this[key] = props[key];
			}
		}
	}

	toJson() {
		return JSON.stringify(this);
	}

}
