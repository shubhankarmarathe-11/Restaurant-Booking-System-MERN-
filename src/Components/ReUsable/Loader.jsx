import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#3788caff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
