import { entertainmentBus } from "../VariableMaps/EntertainmentBusVar";

export function eb486(msg) {
	const arr = [...msg.data];

	var source = arr[3];

	if (source == 7 || source == 206 || source == 39) {
		//Radio Bands
		entertainmentBus.sourceSel = "Radio";
	} else if (source == 219) {
		//Bluetooth
		entertainmentBus.sourceSel = "Bluetooth";
	} else if (source == 155) {
		//Aux - Line In
		entertainmentBus.sourceSel = "Aux";
	} else {
		// I don't know what this is
		entertainmentBus.sourceSel = source;
	}
}
