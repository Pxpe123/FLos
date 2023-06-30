import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SettingsNav from "./Settings-Nav";
import "../Style.css";
import { FaCircle, FaFreeCodeCamp } from "react-icons/fa";
import { theme } from "../../Stores/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControlLabel, FormGroup, Slider, Switch } from "@mui/material";
import { settings } from "../../Stores/settings";
import { CirclePicker } from "react-color";
import { measurementStore } from "../../Stores/measurement";
import convert from "color-convert";

function AppSettings() {
  const measurementSystem = measurementStore((state) => state.measurementSystem);
  const setMeasurementSystem = measurementStore((state) =>
    state.setMeasurementSystem
  );
  const primaryColor = theme((state) => state.setPrimaryColor);
  const secondaryColor = theme((state) => state.setSecondaryColor);
  const setTextColor = theme((state) => state.setTextColor);
  const [showModal, setShowModal] = useState(false);
  const [colorPicker, setColorPicker] = useState("to");
  const [colors, setColors] = useState([]);
  const [textColors, setTextColors] = useState([]);

  const textColor = theme((state) => state.textColor);

  const handleTextColorChange = (e) => {
    const newColor = e.target.checked ? "lightblue" : "white";
    setTextColor(newColor);
  };

  const colorName = [
    "skyblue",
    "blue",
    "indigo",
    "lime",
    "pink",
    "purple",
    "red",
    "teal",
    "violet",
    "yellow",
  ];

  useEffect(() => {
    const temp = [];
    colorName.forEach((element) => {
      temp.push("#" + convert.keyword.hex(element));
    });
    setColors([...temp, "orange", "green"]);
    setTextColors(["white", "black", ...temp]);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const brightnessOffset = settings((state) => state.brightnessOffset);
  const setBrightnessOffset = settings((state) => state.setBrightnessOffset);
  const brightnessAuto = settings((state) => state.brightnessAuto);
  const setBrightnessAuto = settings((state) => state.setBrightnessAuto);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 300,
    bgcolor: "gray",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const updateBrightnessOffset = (e, data) => {
    setBrightnessOffset(data);
  };

  const updateBrightnessAuto = (e, data) => {
    setBrightnessAuto(data);
  };

  const updateColor = (color, event) => {
    const selectedColor = convert.hex.keyword(color.hex);
    if (colorPicker === "to") {
      primaryColor(selectedColor);
    } else {
      secondaryColor(selectedColor);
    }
  };

  const updateTextColor = (color, event) => {
    const selectedColor = convert.hex.keyword(color.hex);
    setTextColor(selectedColor);
  };

  useEffect(() => {
    window.api.actionBrightness({
      auto: brightnessAuto,
      value: brightnessOffset,
    });
  }, [brightnessAuto, brightnessOffset]);

  return (
    <div className="fade-in absolute w-[90%] h-[100%] left-[10%] justify-center">
      <div className="justify-center h-[10%]">
        <SettingsNav />
      </div>
      <div className="fade-in absolute w-[100%] h-[80%] justify-center items-center p-10 gap-5 flex-col flex">
        <div className="flex flex-row gap-5 ">
          <button
            className="flex gap-1.5 items-center bg-black bg-opacity-20 active:bg-opacity-40 transition px-3.5 py-2 rounded-lg"
            onClick={() => [handleOpen(), setColorPicker("to")]}
          >
            <FaCircle className="text-emerald-400" /> "To" Color
          </button>
          <button
            className="flex gap-1.5 items-center bg-black bg-opacity-20 active:bg-opacity-40 transition px-3.5 py-2 rounded-lg"
            onClick={() => [handleOpen(), setColorPicker("from")]}
          >
            <FaCircle className="text-emerald-400" /> "From" Color
          </button>
          <button
            className="flex gap-1.5 items-center bg-black bg-opacity-20 active:bg-opacity-40 transition px-3.5 py-2 rounded-lg"
            onClick={() => [handleOpen(), setColorPicker("text")]}
          >
            <FaCircle className="text-emerald-400" /> "Text" Color
          </button>
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={brightnessAuto}
                checked={brightnessAuto}
                onChange={updateBrightnessAuto}
              />
            }
            label="Automatic Dimming"
          />
        </FormGroup>
        <div className="w-[80%] left-[10%] bottom-2 place-self-center items-center justify-center absolute flex flex-col">
          <Slider
            sx={{
              "& .MuiSlider-thumb": {
                background: "linear-gradient(to right, black 50%, white 50%)",
                transform:
                  "rotateY(0deg) rotateX(0deg) rotateZ(45deg) translateX(-20px) ",
                height: 25,
                width: 25,
              },
            }}
            aria-label="Brightness"
            value={brightnessOffset}
            onChange={updateBrightnessOffset}
            min={5}
            max={32.5}
            defaultValue={brightnessOffset}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select a color!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              align: "center",
              width: "600px",
              position: "absolute",
              left: "40px",
              Content: "center",
            }}
          >
            <CirclePicker
              width={"540px"}
              circleSize={65}
              circleSpacing={25}
              colors={colorPicker === "text" ? textColors : colors}
              onChange={colorPicker === "text" ? updateTextColor : updateColor}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AppSettings;