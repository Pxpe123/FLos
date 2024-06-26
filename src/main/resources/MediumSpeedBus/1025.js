/* eslint-disable no-unused-vars */
import { VINDecode } from "../JSON/VINDecode";
import { Vehicle_Manifest } from "../JSON/Vehicle_Manifest";
import { vehicleInfo } from "../VariableMaps/VehicleInfoVar";

// Mind bogglingly long array of all the possible CCFs
// To be honest, this really isn't required, but it was fun to make! :D

var arrBuilder = [
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
	"-",
];
//var Builder = []
var CCF = "";
var CCFString = "";
var is_modelid = false;
var is_model = false;
var is_ccfid = false;
var manifest_id = "";

var setup = false;
//Important stuff that will need broadcasting
vehicleInfo.VIN = "-";
vehicleInfo.Model_id = "-";
vehicleInfo.Brand = "-";
vehicleInfo.Model = "-";
vehicleInfo.ModelName = "-";
vehicleInfo.Market = "-";
vehicleInfo.BodyStyle = "-";
vehicleInfo.Trim = "-";
vehicleInfo.Emission = "-";
vehicleInfo.ModelYear = "-";
vehicleInfo.Plant = "-";
vehicleInfo.Driver = "-";
vehicleInfo.Transmission = "-";
vehicleInfo.Engine = "-";

export function ms1025(msg, window) {
	if (!setup) {
		if (arrBuilder.includes("-")) {
			vehicleInfo.setupStep = vehicleInfo.setupStep + 1;
			const strId = msg.id;
			const arr = [...msg.data];
			// //console.log(msg.data);
			var arrData = [arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]];
			for (var i = 0; i < arrData.length; i++) {
				arrData[i] = arrData[i].toString(16);
				if (arrData[i].length < 2) {
					arrData[i] = "0" + arrData[i];
				}
			}
			vehicleInfo.setupInfoLine =
				"Parsing VIN data: " + vehicleInfo.setupStep + "/28 blocks received";
			arrBuilder[parseInt(arr[0]) - 1] = arrData;
			// //console.log((arr[0] - 1) + ": " + (arrBuilder[(arr[0] - 1)]));
		} else {
			if (vehicleInfo.firstTimeSetup && !vehicleInfo.vinDecode) {
				vehicleInfo.setupInfoLine = "Calculating VIN...";
				//console.log("All CCF data received");
				CCF = arrBuilder.join("");
				CCF = CCF.replaceAll(",", "");
				CCFString = hex2a(CCF); //Converts the CCF to a string
				vehicleInfo.VIN = CCFString.substring(3, 20); //VIN is 17 characters long
				//console.log("This vehicles VIN: " + vehicleInfo.VIN);
				if (vehicleInfo.VIN.length === 17) {
					//console.log("VIN is valid");
					vehicleInfo.setupInfoLine = "Decoding VIN: Fetching Model ID";
					decodeModelID(vehicleInfo.VIN); //This is where the magic happens
					if (is_modelid) {
						//console.log("Model ID: " + vehicleInfo.Model_id);
						vehicleInfo.setupInfoLine = "Decoding VIN: Fetching Model";
						decodeModel(vehicleInfo.VIN); //This is where the magic happens
						if (is_model) {
							vehicleInfo.setupInfoLine = "Decoding VIN: Fetching CCF ID and As Built";
							decodeCCFID(); //This is where the magic happens
							if (is_ccfid) {
								vehicleInfo.setupInfoLine = "Decoding CCF: Well... On day I we will decode the CCF";
								//console.log("It would appear that all the vehicle info has been decoded!");
								vehicleInfo.vinDecode = true;
							}
						}
					}
				}
				if (!vehicleInfo.vinDecode) {
					vehicleInfo.setupInfoLine = "Oops! Something went wrong! We will try again!";
					// //console.log(
					//   "Parsing vehicle data has failed - See parsed data below"
					// );
					arrBuilder = [
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
						"-",
					];
					CCF = "";
					CCFString = "";
					vehicleInfo.firstTimeSetup = true;
					vehicleInfo.vinDecode = false;
					vehicleInfo.CCFID = "-";
					vehicleInfo.As_Built = "-";
					vehicleInfo.VIN = "-";
					vehicleInfo.Model_id = "-";
					vehicleInfo.Brand = "-";
					vehicleInfo.Model = "-";
					vehicleInfo.ModelName = "-";
					vehicleInfo.Market = "-";
					vehicleInfo.BodyStyle = "-";
					vehicleInfo.Trim = "-";
					vehicleInfo.Emission = "-";
					vehicleInfo.ModelYear = "-";
					vehicleInfo.Plant = "-";
					vehicleInfo.Driver = "-";
					vehicleInfo.Transmission = "-";
					vehicleInfo.Engine = "-";
				}
			} else if (!vehicleInfo.firstTimeSetup && !vehicleInfo.vinDecode) {
				// //console.log("All CCF data received");
				CCF = arrBuilder.join("");
				CCF = CCF.replaceAll(",", "");
				CCFString = hex2a(CCF);
				let VIN = CCFString.substring(3, 20);
				if (VIN === vehicleInfo.VIN) {
					vehicleInfo.vinDecode = true;
					setup = true;
					// //console.log("This is the same vehicle as before");
					// //console.log("This vehicles VIN: " + vehicleInfo.VIN);
				} else {
					vehicleInfo.firstTimeSetup = true;
					vehicleInfo.vinDecode = false;
					vehicleInfo.VIN = VIN;
					vehicleInfo.CCFID = "-";
					vehicleInfo.As_Built = "-";
					vehicleInfo.Model_id = "-";
					vehicleInfo.Brand = "-";
					vehicleInfo.Model = "-";
					vehicleInfo.ModelName = "-";
					vehicleInfo.Market = "-";
					vehicleInfo.BodyStyle = "-";
					vehicleInfo.Trim = "-";
					vehicleInfo.Emission = "-";
					vehicleInfo.ModelYear = "-";
					vehicleInfo.Plant = "-";
					vehicleInfo.Driver = "-";
					vehicleInfo.Transmission = "-";
					vehicleInfo.Engine = "-";
				}
			} else if (vehicleInfo.vinDecode) {
				setup = true;
				setTimeout(() => {
					window.webContents.send("fadeOut", "now");
					setTimeout(() => {
						vehicleInfo.firstTimeSetup = false;
					}, 2000);
				}, 2000);
			}
		}
	}
}

function decodeModelID(VIN) {
	var charpos = "1,3";
	var opt = "";
	var charval = "";
	var val_test = "";
	is_modelid = false;
	for (var i = 0; i < VINDecode["Models"].length; i++) {
		//console.log("Running Model: " + i);
		//console.log("Number of Tests to run: " + VINDecode["Models"][i]["Test"].length);
		if (VINDecode["Models"][i]["Test"].length) {
			for (var x = 0; x < VINDecode["Models"][i]["Test"].length + 1; x++) {
				charpos = VINDecode.Models[i].Test[x].CharPos;
				opt = VINDecode.Models[i].Test[x].Operator;
				charval = VINDecode.Models[i].Test[x].CharValue;
				if (charpos.includes(",")) {
					val_test = VIN.substring(parseInt(charpos.charAt(0)) - 1, parseInt(charpos.charAt(2)));
					//console.log("val_test: " + val_test);
				} else {
					val_test = VIN.charAt(parseInt(charpos - 1));
					//console.log("val_test: " + val_test);
				}
				if (opt === "EQUAL") {
					if (val_test === charval) {
						is_modelid = true;
						//console.log("SOMETHING MATCHED! " + val_test + " matched with " + VINDecode.Models[i].DecodeModel);
					} else {
						is_modelid = false;
					}
				} else if (opt === "NOT_EQUAL") {
					if (val_test != charval) {
						is_modelid = true;
					} else {
						is_modelid = false;
					}
				}
				if (is_modelid === false) {
					break;
				} else {
					// //console.log('Test ' + x + ' passed')
				}
			}
		} else {
			charpos = VINDecode.Models[i].Test.CharPos;
			opt = VINDecode.Models[i].Test.Operator;
			charval = VINDecode.Models[i].Test.CharValue;
			if (charpos.includes(",")) {
				val_test = VIN.substring(parseInt(charpos.charAt(0)) - 1, parseInt(charpos.charAt(2)));
				//console.log("val_test: " + val_test);
			} else {
				val_test = VIN.charAt(parseInt(charpos - 1));
				//console.log("val_test: " + val_test);
			}
			if (opt === "EQUAL") {
				if (val_test == charval) {
					is_modelid = true;
					//console.log("SOMETHING MATCHED! " + val_test + " matched with " + VINDecode.Models[i].DecodeModel);
				} else {
					is_modelid = false;
				}
			} else if (opt === "NOT_EQUAL") {
				if (val_test != charval) {
					is_modelid = true;
				} else {
					is_modelid = false;
				}
			}
		}
		if (is_modelid) {
			vehicleInfo.Model_id = VINDecode.Models[i].DecodeModel;
			//console.log("decodeModelID Passed: " + vehicleInfo.Model_id);
			break;
		}
	}
	if (!is_modelid) {
		console.error("All tests have failed!\nIs this a JLR Vehicle?\nVIN: " + vehicleInfo.VIN);
		vehicleInfo.setupInfoLine = "Are you sure this is a JLR Vehicle?";
	}
}

function decodeModel(VIN) {
	var charpos = "1,3";
	var opt = "";
	var charval = "";
	var val_test = "";
	var name = "";
	is_model = false;
	const result = VINDecode.Decodes.find((Decode) => Decode.id == vehicleInfo.Model_id);
	//console.log(result);
	for (var i = 0; i < result.Attribute.length; i++) {
		//console.log("Running Attribute: " + i);
		if (!result.Attribute[i].Char) {
			name = result.Attribute[i].Name;
			vehicleInfo[name] = result.Attribute[i].Decode;
			// //console.log(
			//   name +
			//   ": " +
			//   VINDecode.Decodes[vehicleInfo.Model_id - 1].Attribute[i].Decode +
			//   " | " +
			//   vehicleInfo[name]
			// );
		} else {
			charpos = result.Attribute[i].Char;
			if (charpos.includes(",")) {
				val_test = VIN.substring(parseInt(charpos.charAt(0) - 1), parseInt(charpos.charAt(2)));
			} else {
				val_test = VIN.charAt(parseInt(charpos - 1));
			}
			name = result.Attribute[i].Name;
			for (var x = 0; x < result.Attribute[i].Value.length; x++) {
				if (val_test == result.Attribute[i].Value[x].Value) {
					vehicleInfo[name] = result.Attribute[i].Value[x].Decode;
					// //console.log(
					//   name +
					//   ": " +
					//   VINDecode.Decodes[vehicleInfo.Model_id - 1].Attribute[i].Value[x]
					//     .Decode +
					//   " | " +
					//   vehicleInfo[name]
					// );
					break;
				}
			}
		}
	}
	if (
		vehicleInfo.VIN != "-" &&
		vehicleInfo.Model_id != "-" &&
		vehicleInfo.Brand != "-" &&
		vehicleInfo.Model != "-" &&
		vehicleInfo.ModelName != "-" &&
		vehicleInfo.Market != "-" &&
		(vehicleInfo.BodyStyle != "-") & (vehicleInfo.Trim != "-") &&
		vehicleInfo.ModelYear != "-" &&
		vehicleInfo.Plant != "-" &&
		vehicleInfo.Driver != "-" &&
		vehicleInfo.Transmission != "-" &&
		vehicleInfo.Engine != "-"
	) {
		//console.log("decodeModel Passed: " + vehicleInfo.Model);
		is_model = true;
	} else {
		is_model = false;
	}
}

function decodeCCFID() {
	is_ccfid = false;
	var yeartest = "";
	var vinMin = "";
	var vinMax = "";
	var vinTest = vehicleInfo.VIN.substring(11, 17);
	// //console.log("Decode CCF ID...");
	for (var x = 0; x < Vehicle_Manifest.vehicle_range.length; x++) {
		if (
			Vehicle_Manifest.vehicle_range[x].brand === vehicleInfo.Brand.toLowerCase().replace(" ", "")
		) {
			// //console.log("CCF: Found Brand");
			for (var y = 0; y < Vehicle_Manifest.vehicle_range[x].vehicle.length; y++) {
				if (Vehicle_Manifest.vehicle_range[x].vehicle[y].model.id == vehicleInfo.Model) {
					// //console.log("CCF: Found Model");
					for (var z = 0; z < Vehicle_Manifest.vehicle_range[x].vehicle[y].variant.length; z++) {
						yeartest = Vehicle_Manifest.vehicle_range[x].vehicle[y].variant[z].model_year.my_gui;
						yeartest = yeartest.split(" - ");
						if (
							vehicleInfo.ModelYear === yeartest[0] ||
							(vehicleInfo.ModelYear >= yeartest[0] && vehicleInfo.ModelYear <= yeartest[1])
						) {
							// //console.log("CCF: Found Model Year");
							vinMin = Vehicle_Manifest.vehicle_range[x].vehicle[y].variant[z].vin.min;
							vinMax = Vehicle_Manifest.vehicle_range[x].vehicle[y].variant[z].vin.max;
							if (vinTest >= vinMin && vinTest <= vinMax) {
								// //console.log("CCF: Found VIN");
								vehicleInfo.CCFID =
									Vehicle_Manifest.vehicle_range[x].vehicle[y].variant[z].file_manifest.id;
								vehicleInfo.As_Built = Vehicle_Manifest.vehicle_range[x].vehicle[y].as_built;
								// //console.log(
								// "CCFID: " +
								// vehicleInfo.CCFID +
								// " | As_Built: " +
								// vehicleInfo.As_Built
								// );
								is_ccfid = true;
								break;
							}
						}
					}
				}
				if (is_ccfid) {
					break;
				}
			}
		}
		if (is_ccfid) {
			break;
		}
	}
}

function hex2a(str1) {
	var hex = str1.toString();
	var str = "";
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}
