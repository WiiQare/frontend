import { CiSaveDown2 } from "react-icons/ci";

import DropdownFilter from "../../Dropdown/Filter";
import { Button } from "flowbite-react";
import Breadcrumb from "../../Breadcrumbs";
import { HiOutlinePrinter } from "react-icons/hi";

const CardHeader = ({ title, sort, filter, breadcrumbs, download = true, print = false }) => {
	return (
		<div className="border w-full rounded-lg py-8 px-6 flex flex-col flex-wrap md:flex-row justify-between gap-4 bg-white cursor-pointer">
			<div className="flex flex-col">
				<h1 className="md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg">
					{title}
				</h1>
				{
					breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : <></>
				}
			</div>
			<div className="flex flex-row flex-wrap  gap-2 center justify-end space-x-2">
				{
					sort ?
						<DropdownFilter
							label="Sort By"
							className="w-[auto] flex"
							labelClassName="py-1 w-[auto] border-0"
							icon={sort.icon()}
							items={sort.items}
						/>
						: <></>
				}

				{
					print ? (
						<Button className="border-2 border-sky text-primary hover:text-white hover:bg-primary">
							<HiOutlinePrinter className="mr-2 h-5 w-5" />
							Print
						</Button>
					) : <></>
				}

				{
					download ? (
						<Button className="bg-primary">
							<CiSaveDown2 className="mr-2 h-5 w-5" />
							Download Report
						</Button>
					) : <></>
				}

				{
					filter ?
						<DropdownFilter
							label={filter.label.title}
							labelClassName={filter.label.className}
							className={filter.className}
							icon={filter.icon()}
							items={filter.items}
						/> : <></>
				}
			</div>
		</div>
	);
};

export default CardHeader;
