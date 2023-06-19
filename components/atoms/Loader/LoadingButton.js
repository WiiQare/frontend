import React from "react";

const LoadingButton = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div
        className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <span>{t('signIn.buttons.waiting')}</span>
    </div>
  );
};

export default LoadingButton;
