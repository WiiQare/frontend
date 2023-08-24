import { useState, useEffect, useRef } from 'react';

const RangeSlider = ({ initialMin, initialMax, min, max, step, priceCap }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center my-6 ">
        <div className="rounded-md flex items-center">
          <span className="p-2 font-extralight text-xs"> Min</span>
          <label
            htmlFor=""
            className="text-sky font-bold text-2xl flex items-start"
          >
            {minValue}{' '}
            <span className="text-gray-500 font-light text-xs">$/mo</span>
          </label>
        </div>
        <div className="ml-2 font-semibold text-lg"> - </div>
        <div className=" ">
          <div className="rounded-md flex items-center">
            <span className="p-2 font-extralight text-xs"> Max</span>
            <label
              htmlFor=""
              className="text-sky font-bold text-2xl flex items-start"
            >
              {maxValue}
              <span className="text-gray-500 font-light text-xs">$/mo</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-green-300 rounded "
            ref={progressRef}
          ></div>
        </div>

        <div className="range-input relative  ">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
          />

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
