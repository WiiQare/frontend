import { HiChevronDown } from "react-icons/hi";
import RangeSlider from "../Input/RangeSlider";

const DropdownFilter = ({
  label,
  icon,
  items,
  className,
  labelClassName,
  onClick = () => {},
}) => {
  return (
    <div className={`${className} dropdown dropdown-end flex`}>
      <label
        tabIndex={0}
        className={`${labelClassName} bg-white border rounded-xl w-full py-2 px-4 flex justify-between items-center`}
      >
        <span className="flex mr-2 gap-4 items-center">
          {icon()}
          <span className="font-light">{label}</span>
        </span>
        <HiChevronDown size={20} />
      </label>
      <ul
        tabIndex={0}
        className="w-full mt-14 dropdown-content menu p-2 bg-white border rounded-box text-gray-700 font-light"
      >
        {items ? (
          items.map((item, index) => (
            <li onClick={onClick} key={index}>
              <a>{item}</a>
            </li>
          ))
        ) : (
          <RangeSlider
            initialMin={10}
            initialMax={10000}
            min={10}
            max={10000}
            step={1}
            priceCap={1000}
          />
        )}
      </ul>
    </div>
  );
};

export default DropdownFilter;
