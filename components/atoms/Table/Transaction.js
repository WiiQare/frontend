import Link from "next/link";
import React from "react";

export default function TransactionTable() {
	return (
		<div className="border rounded-lg overflow-x-auto w-full">
			<table className=" table w-full">
				<thead>
					<tr>
						<th className="bg-white">
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<th className="bg-white">Name</th>
						<th className="bg-white">Job</th>
						<th className="bg-white">Favorite Color</th>
						<th className="bg-white"></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<td>
							<Link href={"/transactions/12345"} legacyBehavior>
								<div className="flex items-center space-x-3 cursor-pointer">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src="/images/avatar.jpg"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div className="font-bold">Hart Hagerty</div>
										<div className="text-sm opacity-50">United States</div>
									</div>
								</div>
							</Link>

						</td>
						<td>
							Zemlak, Daniel and Leannon
							<br />
							<span className="badge badge-ghost badge-sm">
								Desktop Support Technician
							</span>
						</td>
						<td>Purple</td>
						<th>
							<button className="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>

					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<td>
							<Link href={"/transactions/12345"} legacyBehavior>
								<div className="flex items-center space-x-3 cursor-pointer">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src="/images/avatar.jpg"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div className="font-bold">Brice Swyre</div>
										<div className="text-sm opacity-50">China</div>
									</div>
								</div>
							</Link>
						</td>
						<td>
							Carroll Group
							<br />
							<span className="badge badge-ghost badge-sm">Tax Accountant</span>
						</td>
						<td>Red</td>
						<th>
							<button className="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>

					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<td>
							<Link href={"/transactions/12345"} legacyBehavior>

								<div className="flex items-center space-x-3 cursor-pointer">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src="/images/avatar.jpg"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div className="font-bold">Marjy Ferencz</div>
										<div className="text-sm opacity-50">Russia</div>
									</div>
								</div>
							</Link>
						</td>
						<td>
							Rowe-Schoen
							<br />
							<span className="badge badge-ghost badge-sm">
								Office Assistant I
							</span>
						</td>
						<td>Crimson</td>
						<th>
							<button className="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>

					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<td>
							<Link href={"/transactions/12345"} legacyBehavior>

								<div className="flex items-center space-x-3 cursor-pointer">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src="/images/avatar.jpg"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div className="font-bold">Yancy Tear</div>
										<div className="text-sm opacity-50">Brazil</div>
									</div>
								</div>
							</Link>
						</td>
						<td>
							Wyman-Ledner
							<br />
							<span className="badge badge-ghost badge-sm">
								Community Outreach Specialist
							</span>
						</td>
						<td>Indigo</td>
						<th>
							<button className="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>
				</tbody>


			</table>
		</div>
	);
}
