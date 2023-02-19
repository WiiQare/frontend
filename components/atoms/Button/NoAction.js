const ButtonNoAction = ({color, text}) => {
    return (
        <button className={`border border-${color} hover:bg-${color} hover:text-white text-${color} font-normal h-fit  py-2 px-3 rounded-lg text-sm transition duration-300`}>{text}</button>
    );
}

export default ButtonNoAction;