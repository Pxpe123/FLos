import { FaCar, FaPhoneAlt, FaCog, FaQuestion } from "react-icons/fa";
import { GiRadioTower } from "react-icons/gi";

import { Outlet, Link, useLocation } from "react-router-dom";
import { theme } from "../Stores/theme";
import { mediumSpeed } from "../Stores/mediumSpeed";
import { vehicleInfo } from "../Stores/vehicleInfo";
import { entertainmentBus } from "../Stores/entertainmentBus";
import "./Style.css";
import ParkingSensors from "./ParkingSensors";
import LRLogo from "../Images/LandRoverLogo.png";

export function Layout() {
	const firstTimeSetup = vehicleInfo((state) => state.firstTimeSetup);
	const setFirstTimeSetup = vehicleInfo((state) => state.setFirstTimeSetup);
	// const gradient = (primaryColorSet + " " + secondaryColorSet).toString();

	if (false) {
		return <FirstTimeSetup />;
	} else {
		return <Nav />;
	}
}
export default Layout;

function Nav() {
	const primaryColor = theme((state) => state.primaryColor);
	const primaryColorSet = "from-" + primaryColor + "-600";
	const secondaryColor = theme((state) => state.secondaryColor);
	const secondaryColorSet = "to-" + secondaryColor + "-600";
	const textColor = theme((state) => state.textColor);
	let textColorSet = "text-" + textColor;
	if (textColorSet !== "black" || textColorSet !== "white") {
		textColorSet += "-600";
	}
	const location = useLocation();
	const menuItems = [
		{
			name: "Home",
			icon: <FaCog />,
			path: "/",
		},
		{
			name: "Radio",
			icon: <GiRadioTower />,
			path: "/entertainment",
		},
		{
			name: "Carplay",
			icon: <FaPhoneAlt />,
			path: "/carplay",
		},
		{
			name: "Off-Road",
			icon: <FaCar />,
			path: "/vehicle/dashboard",
		},
		{
			name: "NoClue",
			icon: <FaQuestion />,
			path: "/Vehicle",
		},
		{
			name: "Settings",
			icon: <FaCog />,
			path: "/settings/app",
		},
	];
	const active = mediumSpeed((state) => state.active);
	const hour = mediumSpeed((state) => state.hour);
	const minute = mediumSpeed((state) => state.minute);
	const volumeChange = entertainmentBus((state) => state.volumeChange);
	const volume = entertainmentBus((state) => state.volume);

	return (
		<div className={`h-screen w-screen ${textColorSet}`}>
			<div
				className={`${active ? "" : "hidden"
					} fade-in bg-slate-300 opacity-90 transition-all z-20 absolute rounded-xl h-[90%] w-[90%] left-[5%] top-[5%] flex items-center justify-center text-center text-8xl text-white`}>
				<ParkingSensors />
			</div>
			<div
				className={`${volumeChange ? "" : "hidden"
					} fade-in bg-gray-500 rounded-3xl transition-all z-20 absolute align-middle justify-center items-center m-auto h-[75%] w-[75%] left-[12.5%] top-[12.5%]`}>
				<div className='align-top h-1/4 text-center text-white text-2xl'>
					Beep Boop - Volume Change
				</div>
				<div className='flex align-middle items-center justify-center h-1/2 text-center text-8xl text-white'>
					<VolumeControl volumes={volume} />
					{volume}
				</div>
			</div>
			<div className={`${active || volumeChange ? "blur-sm" : ""} h-full w-full transition-all`}>
				<div
					className={`absolute top-0 justify-center grid grid-cols-3 fade-in shadow-lg bg-gradient-to-br ${primaryColorSet} ${secondaryColorSet} text-center w-[100%] h-[10%]`}>
					{/* <div className="h-[100%] grid grid-cols-3 justify-center text-center bg-gradient-to-br from-gray-600 to-gray-800 bg-opacity-40 text-white"> */}
					<div className='h-[100%] w-[100%] grid justify-center text-center items-center text-lg'></div>
					<div className='h-[100%] w-[100%] grid justify-center text-center items-center text-xl font-bold'>
						{hour}:{minute}
					</div>
					<div className='h-[100%] w-[100%] grid justify-center text-center items-center text-lg'></div>
					{/* </div> */}
				</div>
				{location.pathname !== "/carplay" ? (
					<>
						<div
							id='outlet'
							className={`transition-all absolute h-[100%] w-[100%]`}>
							<Outlet />
						</div>
					</>
				) : (
					<>
						<div
							id='outlet'
							className='transition-all absolute h-[100%] w-[100%]'>
							<Outlet />
						</div>
					</>
				)}
				<div
					className={`NAVBAR-CONTAINER w-[98%] h-[9%] shadow-lg inline-flex outline outline-1 outline-gray-600 rounded-lg absolute z-10 bottom-[1%] left-[1%] transition`}>
					<div className='NAVBAR-ITEMS flex absolute flex-row justify-between top-[10%] px-10 items-center w-[100%] h-[80%]'>
						{menuItems.map((m, index) => {
							// Add index as the second argument
							let x = location.pathname.split("/");
							let y = m.path.split("/");
							return (
								<Link
									key={index} // Add key prop with unique value
									to={m.path}
									className={
										x[1] === y[1]
											? "SINGLE-NAVBAR-ITEM bg-black bg-opacity-50 text-3xl text-white active:text-gray-100 px-5 py-1 rounded-lg active:bg-opacity-75 transition active:scale-95"
											: "SINGLE-NAVBAR-ITEM text-3xl text-white active:text-gray-100 bg-black bg-opacity-20 px-5 py-1 rounded-lg active:bg-opacity-40 transition active:scale-95"
									}>
									{m.icon}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
window.api.onFadeOut(() => {
	var element = document.getElementById("firstTime");
	element.classList.add("fadeOut");
	element.classList.remove("fadeIn");
});
function FirstTimeSetup() {
	const setupInfoLine = vehicleInfo((state) => state.setupInfoLine);
	const setupStep = vehicleInfo((state) => state.setupStep);
	const VIN = vehicleInfo((state) => state.VIN);
	// const Model_id = vehicleInfo((state) => state.Model_id)
	const Brand = vehicleInfo((state) => state.Brand);
	const Model = vehicleInfo((state) => state.Model);
	const ModelName = vehicleInfo((state) => state.ModelName);
	// const Market = vehicleInfo((state) => state.Market)
	// const BodyStyle = vehicleInfo((state) => state.BodyStyle)
	const Trim = vehicleInfo((state) => state.Trim);
	// const Emission = vehicleInfo((state) => state.Emission)
	const ModelYear = vehicleInfo((state) => state.ModelYear);
	// const Plant = vehicleInfo((state) => state.Plant)
	// const Driver = vehicleInfo((state) => state.Driver)
	// const Transmission = vehicleInfo((state) => state.Transmission)
	// const Engine = vehicleInfo((state) => state.Engine)

	return (
		<>
			<div
				id='firstTime'
				className='firstTime h-screen fade-in setup w-screen fixed items-center justify-center p-10'>
				<div className='setup fade-in w-full h-[25%] text-5xl flex items-center justify-center p-10'>
					<div>First Time Setup</div>
				</div>
				<div className='w-full h-[50%] flex items-center justify-center p-10'>
					<img
						id='img'
						className='img transition fadeIn'
						src={LRLogo}
					/>
				</div>
				<div
					id='InfoBar'
					className='setup fade-in w-full h-[25%] flex items-center flex-col justify-center p-10'>
					<div className='flex'>
						{setupInfoLine}
						{VIN !== "-" ? <div className='flex'>VIN: {VIN} </div> : null}
					</div>

					{/* <div className="flex">
            {ModelYear} {Brand} {ModelName} {Trim} ({Model})
          </div> */}
				</div>
			</div>
		</>
	);
}

// eslint-disable-next-line react/prop-types
const VolumeControl = ({ volumes }) => {
	var level = Math.ceil(volumes / 6);

	var isMuted = volumes === 0;

	return (
		<svg
			viewBox='0 0 100 77'
			width='150'
			height='115.5'>
			<path
				id='arcSmB5'
				className='volElem'
				stroke='#9e7818'
				d='m 80.983248,64.963577 c 9.12384,-5.39136 15.34464,-15.34464 15.34464,-26.54208 0,-11.19744 -6.2208,-21.35808 -15.34464,-26.54208'
				opacity={isMuted ? 0 : 0.4}
			/>
			<path
				id='arcSmF5'
				opacity={isMuted ? 0 : level >= 5 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='m 81.167453,65.022455 c 9.12384,-5.39136 15.34464,-15.34464 15.34464,-26.54208 0,-11.197439 -6.2208,-21.35808 -15.34464,-26.54208'
			/>
			<path
				id='arcSmB4'
				className='volElem'
				stroke='#9e7818'
				d='m 74.219707,60.5397 c 7.6032,-4.4928 12.7872,-12.7872 12.7872,-22.1184 0,-9.3312 -5.184,-17.7984 -12.7872,-22.1184'
				opacity={isMuted ? 0 : 0.4}
			/>
			<path
				id='arcSmF4'
				opacity={isMuted ? 0 : level >= 4 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='m 74.420266,60.608256 c 7.6032,-4.4928 12.7872,-12.7872 12.7872,-22.1184 0,-9.331199 -5.184,-17.7984 -12.7872,-22.1184'
			/>
			<path
				id='arcSmB3'
				className='volElem'
				stroke='#9e7818'
				d='m 67.306684,56.920972 c 6.336,-3.744 10.656,-10.656 10.656,-18.432 0,-7.776 -4.32,-14.832 -10.656,-18.432'
				opacity={isMuted ? 0 : 0.4}
			/>
			<path
				id='arcSmF3'
				opacity={isMuted ? 0 : level >= 3 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='m 67.424363,57.008643 c 6.336,-3.744 10.656,-10.656 10.656,-18.432 0,-7.775999 -4.32,-14.832 -10.656,-18.432'
			/>
			<path
				id='arcSmB2'
				className='volElem'
				stroke='#9e7818'
				d='m 60.23315,53.873683 c 5.28,-3.12 8.88,-8.88 8.88,-15.36 0,-6.48 -3.6,-12.36 -8.88,-15.36'
				opacity={isMuted ? 0 : 0.4}
			/>
			<path
				id='arcSmF2'
				opacity={isMuted ? 0 : level >= 2 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='m 60.270944,53.888117 c 5.28,-3.12 8.88,-8.88 8.88,-15.36 0,-6.479999 -3.6,-12.36 -8.88,-15.36'
			/>
			<path
				id='arcSmB1'
				className='volElem'
				stroke='#9e7818'
				d='m 53,51.3 c 4.4,-2.6 7.4,-7.4 7.4,-12.8 0,-5.4 -3,-10.3 -7.4,-12.8'
				opacity={isMuted ? 0 : 0.4}
			/>
			<path
				id='arcSmF1'
				opacity={isMuted ? 0 : level >= 1 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='m 53,51.3 c 4.4,-2.6 7.4,-7.4 7.4,-12.8 0,-5.4 -3,-10.3 -7.4,-12.8'
			/>
			<path
				id='speakB'
				className='volElem'
				stroke='#9e7818'
				d='M 51.2,18.5 V 5.5 C 51.2,3.4 48.7,2.2 47.1,3.6 L 21.8,25.9 c -1.4,1.2 -3.1,1.9 -4.9,1.9 H 8.2 C 5.9,27.8 4,29.7 4,32 v 13.3 c 0,2.3 1.9,4.2 4.2,4.2 H 17 c 1.9,0 3.7,0.7 5.1,1.9 l 25,22 c 1.6,1.4 4.1,0.3 4.1,-1.9 v -13'
				opacity='0.4'
			/>
			<path
				id='speakF'
				opacity={isMuted ? 0 : level >= 1 ? 1 : 0}
				className='volElem'
				stroke='#f4af0a'
				d='M 51.2,18.5 V 5.5 C 51.2,3.4 48.7,2.2 47.1,3.6 L 21.8,25.9 c -1.4,1.2 -3.1,1.9 -4.9,1.9 H 8.2 C 5.9,27.8 4,29.7 4,32 v 13.3 c 0,2.3 1.9,4.2 4.2,4.2 H 17 c 1.9,0 3.7,0.7 5.1,1.9 l 25,22 c 1.6,1.4 4.1,0.3 4.1,-1.9 v -13'
			/>
			<line
				id='crossLtRb'
				className='volElem'
				opacity={isMuted ? 0.6 : 0}
				stroke='#CE9610'
				x1='43.8'
				y1='29.2'
				x2='62.6'
				y2='47.8'
			/>
			<line
				id='crossLbRt'
				className='volElem'
				opacity={isMuted ? 0.6 : 0}
				stroke='#CE9610'
				x1='62.6'
				y1='29.2'
				x2='43.8'
				y2='47.8'
			/>
		</svg>
	);
};
