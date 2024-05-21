import React from 'react';
import loader from "../../assets/loader.gif"
export const Loader: React.FC = () => {
  return (
    <div className="w-scree fixed left-0 top-0 flex w-screen h-screen items-center justify-center">
      <img src={loader} alt="Loading animation" />
    </div>
  );
}


