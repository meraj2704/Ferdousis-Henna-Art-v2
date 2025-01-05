import Lottie from "lottie-react";
import React from "react";
import loading from "../../../public/lottie/loading.json";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center pt-20">
      <Lottie
        animationData={loading}
        loop={true}
        className="w-8 h-8 md:w-14 md:h-14 xl:w-[100px] xl:h-[100px]"
      />
    </div>
  );
};

export default Loader;
