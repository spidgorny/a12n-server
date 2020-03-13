import {POJO} from "./POJO";

export class Trip extends POJO {
	id: string;	// uuid
	user: number;
	destination: string;
	start_date: Date;
	end_date: Date;
	comment: string;

	constructor(props: any) {
		super(props);
		Object.assign(this, props);
	}

}
