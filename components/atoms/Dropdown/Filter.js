import { HiChevronDown } from 'react-icons/hi';

const DropdownFilter = ({label, icon, items, onClick=() => {}}) => {
    return (
        <div className="dropdown dropdown-end w-full md:w-1/3 flex">
			<label tabIndex={0} className="bg-white border rounded-xl w-full py-3 px-4 flex justify-between items-center">
				<span className='flex gap-4 items-center'>
					{icon()}
					<span className='font-light'>{label}</span>
				</span>
				<HiChevronDown size={20} />
			</label>
			<ul tabIndex={0} className="w-full mt-14 dropdown-content menu p-2 bg-white border rounded-box text-gray-700 font-light">
				{items.map((item, index) => <li onClick={onClick} key={index}><a>{item}</a></li>)}
			</ul>
		</div>
    );
}

export default DropdownFilter;
