import { PersonalModelService } from "../services/personal-model.service";

import { Modulo } from "./modulo";

export class Sleep {
	time_sleep:Date;
	time_wakeup:Date;

	constructor(time_start:Date, time_end:Date) {
		this.time_sleep = time_start;
		this.time_wakeup = time_end;
	}

	get day():string {
		if (this.time_sleep.getHours() < 5) return PersonalModelService.day_labels[Modulo.mod(this.time_sleep.getDay() - 1, 7)];
		else return PersonalModelService.day_labels[this.time_sleep.getDay()];
	}

	// Returns the duration in minutes of the sleep for this entry
	get duration():number {
		var diff_ms = this.time_wakeup.getTime() - this.time_sleep.getTime();
		var minutes = Math.floor(diff_ms / (1000*60));

		return minutes;
	}

	duration_as_str():string {
		var diff_ms = this.time_wakeup.getTime() - this.time_sleep.getTime();
		var hours = Math.floor(diff_ms / (1000*60*60));
		var minutes = Math.floor(diff_ms / (1000*60) % 60);

		if (hours < 1) return `${minutes} minutes`;
		else return `${hours} hours, ${minutes} minutes`;
	}

	time_sleep_as_str():string {
		if (this.time_sleep.getHours() < 5) {
			var yesterday = new Date(this.time_sleep);
			yesterday.setDate(yesterday.getDate() - 1);
			return yesterday.toDateString();
		} else return this.time_sleep.toDateString();
	}
}
