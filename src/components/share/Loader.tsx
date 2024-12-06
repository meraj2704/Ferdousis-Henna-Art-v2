import Lottie from "lottie-react";
import React from "react";
import loading from "../../../public/lottie/loading.json";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Lottie
        animationData={loading}
        loop={true}
        className="w-[100px] h-[100px]"
      />
    </div>
  );
};

export default Loader;
