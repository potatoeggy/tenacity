import React from "react";
import { FilePicker } from "../components/FilePicker";
import ProgressBar from "../components/ProgressBar";
import "./pages.css";
import ParticlesBg from "particles-bg";

const Home = () => {
  return (
    <>
      <ParticlesBg type="circle" bg={true} />
      <div className="container1">
        <FilePicker></FilePicker>
      </div>
    </>
  );
};

export default Home;
