import "./Style.css";
import { entertainmentBus } from "../Stores/entertainmentBus";

export function Entertainment() {
  let sourceSel = entertainmentBus((state) => state.sourceSel);

  sourceSel = "Bluetooth"

  return (
    <>
      <div id="outlet" className="fadeIn">
        {sourceSel == "Radio" ? (
          <Radio />
        ) : sourceSel == "Bluetooth" ? (
          <Bluetooth />
        ) : sourceSel == "Aux" ? (
          <Aux />
        ) : (
          <Unknown />
        )}
      </div>
    </>
  );
}

function Radio() {
  const fmStation = entertainmentBus((state) => state.fmStation);
  const dabStation = entertainmentBus((state) => state.dabStation);
  const source = entertainmentBus((state) => state.source);
  const text = entertainmentBus((state) => state.text);
  // eslint-disable-next-line no-unused-vars
  const block = entertainmentBus((state) => state.block);
  // eslint-disable-next-line no-unused-vars
  const active = entertainmentBus((state) => state.active);


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
      <div className="absolute flex w-full h-full">
        <div className="flex absolute grid-cols-6 my-2 w-[100%] h-[15%] justify-evenly text-center items-center">
          {/* Radio Source */}
          {menuItems.map((m, index) => {
            let x = source;
            let y = m.name;
            return (
              <div
                key={index}
                className={`${x === y
                  ? "text-blue-500 text-3xl"
                  : "text-white text-2xl opacity-50"
                  } h-max`}
              >
                {m.name}
              </div>
            );
          })}
        </div>
        <div className="absolute grid grid-rows-2 h-[15%] top-[15%] justify-center w-[100%] text-center">
          <div className="grid row-span-1 justify-evenly w-[100%] text-center text-xl">
            {/* Radio Station */}
            <p>
              {source == "DAB1" || source == "DAB2"
                ? dabStation
                : source == "FM" || source == "FM-AST"
                  ? fmStation
                  : "??"}
            </p>
          </div>
          <div className="grid row-span-1 justify-evenly w-[100%] text-center text-xl">
            {/* Radio Text */}
            <p>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Bluetooth() {
  //const mediaPhoneName = entertainmentBus((state) => state.mediaPhoneName);
  //const trackName = entertainmentBus((state) => state.trackName);
  //const artistName = entertainmentBus((state) => state.artistName);
  //const volume = entertainmentBus((state) => state.volume);


  // I Think this data is correctly responding
  //const mediaPhoneName = "Xoami Mi 9";
  //const trackName = "Spotify - This is a song"
  //const artistName = "Test Name"
  //const volume = 100

  
  return (
    <>
      <div className="fadeIn grid grid-rows-2 justify-evenly h-full w-full text-center">
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Bluetooth Station */}
          <p>Bluetooth</p>
        </div>
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Bluetooth Text */}
          <p>Figure this out</p>
        </div>
      </div>
    </>
  );
}

function Aux() {
  return (
    <>
      <div className="fadeIn grid grid-rows-2 justify-evenly h-full w-full text-center">
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Aux Station */}
          <p>Aux</p>
        </div>
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Aux Text */}
          <p>Guess there ain&apos;t much to show here!</p>
        </div>
      </div>
    </>
  );
}

function Unknown() {
  const sourceSel = entertainmentBus((state) => state.sourceSel);
  return (
    <>
      <div className="grid grid-rows-2 justify-evenly h-full w-full text-center">
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Unknown */}
          <p>Beep Boop - We got a problem!</p>
        </div>
        <div className="grid grid-cols-1 justify-evenly h-full w-full text-center">
          {/* Unknown Text */}
          <p>Something hasn&apos;t added up here...</p>
          <p>{sourceSel}</p>
        </div>
      </div>
    </>
  );
}
export default Entertainment;
