import "./Style.css";
import { mediumSpeed } from "../Stores/mediumSpeed";
import { entertainmentBus } from "../Stores/entertainmentBus";
// import { FaFire, FaSnowman } from 'react-icons/fa'
import { Link } from "react-router-dom";
import CarImage from "../Images/Car.png";
import { vehicleInfo } from "../Stores/vehicleInfo";
import { GiFogLight } from "react-icons/gi";
import { PiSirenFill, PiCubeTransparent, PiLightbulbFill } from "react-icons/pi";

export function Home() {
	
	//const sourceSel = entertainmentBus((state) => state.sourceSel);	
	
	// DEBUG //
	let sourceSel = "Bluetooth"

	const VIN = vehicleInfo((state) => state.VIN);
	const modelID = vehicleInfo((state) => state.Model_id);
	const modelName = vehicleInfo((state) => state.ModelName);
	const model = vehicleInfo((state) => state.Model);
	const brand = vehicleInfo((state) => state.Brand);
	const modelYear = vehicleInfo((state) => state.ModelYear);
	const market = vehicleInfo((state) => state.Market);
	const bodyStyle = vehicleInfo((state) => state.BodyStyle);
	const trim = vehicleInfo((state) => state.Trim);
	const emission = vehicleInfo((state) => state.Emission);
	const plant = vehicleInfo((state) => state.Plant);
	const driver = vehicleInfo((state) => state.Driver);
	const transmission = vehicleInfo((state) => state.Transmission);
	const engine = vehicleInfo((state) => state.Engine);

	

	return (
		<>
			<div
				id='outlet'
				className='fadeIn'>
				<div className='absolute flex grid-cols-2 grid-rows-2 w-full h-full'>
					<div className='fixed row-span-2 w-[48.5%] top-[11%] left-[1%] h-[78%] outline outline-1 outline-gray-600 rounded-lg'>
						<Overview />
					</div>
					<Link
						to='/entertainment'
						className='fixed row-span-2 w-[48.5%] left-[50.5%] top-[11%] h-[38.5%] outline outline-1 outline-gray-600 rounded-lg'>
						{sourceSel == "Radio" ? (
							<Radio />
						) : sourceSel == "Bluetooth" ? (
							<Bluetooth />
						) : sourceSel == "Aux" ? (
							<Aux />
						) : (
							<Unknown />
						)}
					</Link>
					<div className='fixed row-span-2 w-[48.5%] left-[50.5%] top-[50.5%] h-[38.5%] outline outline-1 outline-gray-600 rounded-lg'>
						<Relay />
					</div>
				</div>
			</div>
		</>
	);
}
function Overview() {
	const interiorTempVar = mediumSpeed((state) => state.interior);
	// console.log(interiorTempVar);
	const exteriorTempVar = mediumSpeed((state) => state.exterior);
	const fuelVar = mediumSpeed((state) => state.fuel);
	const speedVar = mediumSpeed((state) => state.speed);
	return (
		<>
			<div
				id='outlet'
				className='absolute flex w-full h-full'>
				<div className='flex h-full justify-center items-center'>
					<div className='absolute grid grid-cols-8 items-center text-center top-1 w-[100%]'>
						{/* <div className="grid col-span-1 justify-center text-center items-center text-4xl"><FaFire /></div> */}
						<div className='grid col-span-4 text-center items-center text-lg'>
							Interior - {interiorTempVar}°C
						</div>
						<div className='grid col-span-4 text-center items-center text-lg'>
							Exterior - {exteriorTempVar}°C
						</div>
						{/* <div className="grid col-span-1 justify-center text-center items-center text-4xl"><FaSnowman /></div> */}
					</div>
					<img
						id='img'
						alt='Car'
						className='absolute flex bg-transparent transition-all '
						src={CarImage}
					/>
					<div className='absolute grid grid-cols-8 items-center text-center m-1 bottom-1 w-[100%]'>
						<div className='grid col-span-4 text-center items-center text-lg'>
							Speed - {speedVar} MPH
						</div>
						<div className='grid col-span-4 text-center items-center text-lg'>Placeholder</div>
						<div className='grid col-span-4 text-center items-center text-lg'>
							Fuel - {fuelVar}L
						</div>
						<div className='grid col-span-4 text-center items-center text-lg'>Range - Maybe</div>
					</div>
				</div>
			</div>
		</>
	);
}
function Relay() {
	const relay1 = mediumSpeed((state) => state.relay1);
	const relay2 = mediumSpeed((state) => state.relay2);
	const relay3 = mediumSpeed((state) => state.relay3);
	const relay4 = mediumSpeed((state) => state.relay4);
	const relay5 = mediumSpeed((state) => state.relay5);
	const relay6 = mediumSpeed((state) => state.relay6);

	const buttonItems = [
		{
			name: "Front Fog",
			icon: <GiFogLight />,
			value: relay1,
		},
		{
			name: "High Bar",
			icon: <PiLightbulbFill />,
			value: relay2,
		},
		{
			name: "Low Bar",
			icon: <PiLightbulbFill />,
			value: relay3,
		},
		{
			name: "Strobe",
			icon: <PiSirenFill />,
			value: relay4,
		},
		{
			name: "Spare",
			icon: <PiCubeTransparent />,
			value: relay5,
		},
		{
			name: "Spare",
			icon: <PiCubeTransparent />,
			value: relay6,
		},
	];

	return (
		<>
			<div className='absolute flex w-full h-full'>
				<div className='grid grid-rows-2 grid-cols-3 ml-[1.5%] mt-[0.5%] justify-evenly items-center align-middle h-[97%] w-full text-center'>
					{buttonItems.map((m, index) => {
						return (
							<div
								key={index}
								className={`${"text-white text-xl w-[95%] h-[90%] justify-evenly items-center rounded-2xl outline outline-1 outline-gray-600"}`}>
								<div className='flex justify-center items-center text-center text-xl'>{m.name}</div>
								<div className='flex justify-center items-center text-center text-4xl'>
									{m.icon}
								</div>
								<div
									className={`${!m.value ? "bg-green-500" : "bg-red-600"} bottom-8 ml-[12.5%] rounded-lg flex justify-center items-center w-[75%] h-[10%] text-center text-4xl`}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

function Radio() {
	let fmStation = entertainmentBus((state) => state.fmStation);
	
	const dabStation = entertainmentBus((state) => state.dabStation);
	const source = entertainmentBus((state) => state.source);
	const text = entertainmentBus((state) => state.text);
	// const block = entertainmentBus((state) => state.block)
	// const active = entertainmentBus((state) => state.active)

	const menuItems = [
		{
			name: "FM",
		},
		{
			name: "FM-AST",
		},
		{
			name: "DAB1",
		},
		{
			name: "DAB2",
		},
		{
			name: "AM",
		},
		{
			name: "AM-AST",
		},
	];

	return (
		<>
			<div className='absolute flex w-full h-full'>
				<div className='flex absolute grid-cols-6 w-[100%] h-[15%] justify-evenly text-center items-center'>
					{/* Radio Source */}
					{menuItems.map((m, index) => {
						let x = source;
						let y = m.name;
						return (
							<div
								key={index}
								className={`${
									x === y ? "text-blue-500 text-xl" : "text-white text-lg opacity-50"
								} h-max`}>
								{m.name}
							</div>
						);
					})}
				</div>
				<div className='transition absolute grid grid-rows-2 h-[15%] top-[15%] justify-center w-[100%] text-center'>
					<div className='transition  grid row-span-1 justify-evenly w-[100%] text-center text-xl font-bold'>
						{/* Radio Station */}
						<p>
							{source == "DAB1" || source == "DAB2"
								? dabStation
								: source == "FM" || source == "FM-AST"
									? fmStation
									: "??"}
						</p>
					</div>
					<div className='transition  grid row-span-1 justify-evenly my-2 w-[100%] text-center text-lg'>
						{/* Radio Text */}
						<p>{text}</p>
					</div>
				</div>
			</div>
		</>
	);
}

function Bluetooth() {
  // Example Data
  const mediaPhoneName = "Xiaomi Mi 9";
  const trackName = "Spotify - This is a song";
  const artistName = "Test Name";
  const volume = 43;
  const maxVolume = 100;
  const segments = 25; 
  const segmentVolume = maxVolume / segments;

  return (
    <>
      <div className="absolute flex w-full h-full">
        <div className="grid grid-rows-2 ml-2 h-full w-full text-center">
          <div className="underline grid grid-cols-1 justify-evenly h-full w-full text-center text-lg">
            <p>Bluetooth</p>
			<p className="underline">Volume: {volume}</p>
            <div className="w-[90%] h-[70%] flex justify-between justify-self-center">
              {Array.from({ length: segments }).map((_, index) => {
                const filledSegments = Math.floor(volume / segmentVolume);
                const remainingVolume = volume % segmentVolume;
                let bgColor = "bg-black";
                let opacity;

                if (index < filledSegments) {
                  bgColor = "bg-green-500";
                  opacity = "opacity-100";
                } else if (index === filledSegments && remainingVolume > 0) {
                  bgColor = "bg-green-500";
                  opacity = `opacity-${Math.round((remainingVolume / segmentVolume) * 100)}`;
				}
				else {
					opacity = "opacity-100"
				}

                return <div key={index} className={`w-full h-full mx-[1px] ${bgColor} ${opacity}`}></div>;
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 justify-evenly h-full w-full text-left text-lg pb-">
            <p>Phone: {mediaPhoneName}</p>
            <p>Track: {trackName}</p>
            <p>Artist: {artistName}</p>
          </div>
        </div>
      </div>
    </>
  );
}


function Aux() {
	return (
		<>
			<div className='absolute flex w-full h-full'>
				<div className='grid grid-rows-2 justify-evenly w-full text-center'>
					<div className='grid grid-cols-1 justify-evenly w-full text-center text-lg'>
						{/* Aux Station */}
						<p>Aux</p>
					</div>
					<div className='grid grid-cols-1 justify-evenly w-full text-center text-lg'>
						{/* Aux Text */}
						<p>Guess there ain&apos;t much to show here!</p>
					</div>
				</div>
			</div>
		</>
	);
}

function Unknown() {
	const sourceSel = entertainmentBus((state) => state.sourceSel);
	return (
		<>
			<div className='absolute flex w-full h-full'>
				<div className='grid grid-rows-2 justify-evenly h-full w-full text-center'>
					<div className='grid grid-cols-1 justify-evenly h-full w-full text-center'>
						{/* Unknown */}
						<p>Beep Boop - We got a problem!</p>
					</div>
					<div className='grid grid-cols-1 justify-evenly h-full w-full text-center'>
						{/* Unknown Text */}
						<p>Something hasn&apos;t added up here...</p>
						<p>{sourceSel}</p>
					</div>
				</div>
			</div>
		</>
	);
}
export default Home;
