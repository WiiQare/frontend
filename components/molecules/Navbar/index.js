import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlinePersonOutline, MdMailOutline } from "react-icons/md";
import {
	AiOutlineArrowRight,
	AiOutlineBell,
	AiOutlineMessage,
} from "react-icons/ai";
import {
	Box,
	Tooltip,
	IconButton,
	Avatar as AvatarMui,
	Menu as MenuMui,
	MenuItem
} from "@mui/material";
import { DrawContext } from "../../../pages/_app";

import logo from "../../../public/images/favicon.png";
import logoDark from "../../../public/images/logo_dark_2.png";
import avatar from "../../../public/images/homme.png";
import IconBadge from "../../atoms/Icons/Badge";
import NotificationBadge from "../../atoms/Card/Notifications/Badge";
import { useContext, useState } from "react";
import { signOut } from "next-auth/react"


const langFlags = {
	gb: "https://flagcdn.com/60x45/gb.png",
	fr: "https://flagcdn.com/60x45/fr.png",
};

const Menu = ({ session, handleSignOut }) => {

	const [anchorEl, setAnchorEl] = useState(null);
	const [lang, setLang] = useState("fr");
    const { draw, setDraw } = useContext(DrawContext);


	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLangChange = (lang) => {
		setLang(lang);
		setAnchorEl(null);
	};

	return (
		<div className="flex gap-12 mx-auto items-center justify-between fixed top-0 bg-white py-4 px-4 md:px-14 shadow-sm w-full z-50">
			<div className="flex gap-16 items-center">
				<div className="flex gap-2 items-center">
					<Link href={"/"} legacyBehavior>
						<Image
							src={logo}
							className="h-8 md:h-14 w-min object-left object-contain"
						/>
					</Link>
					<Link href={"/"} legacyBehavior>
						<Image
							src={logoDark}
							className="h-6 md:h-9 object-left object-contain w-min"
						/>
					</Link>
				</div>

				<div className="gap-4 items-center hidden md:flex">
					<button className="cursor-pointer">
						<HiMenuAlt3 className="text-4xl text-blue-600" />
					</button>

					<form className="">
						<label htmlFor="voice-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<input
								type="text"
								id="voice-search"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-10  p-3"
								placeholder="Search..."
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 flex items-center pr-3"
							>
								<svg
									aria-hidden="true"
									className="w-4 h-4 text-gray-500 hover:text-gray-900"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="flex items-center justify-between gap-8 md:gap-20">
				<div className="flex items-center md:gap-6">
					<div className="">
						<Box>
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={open ? "account-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags[lang]}
								/>
							</IconButton>
						</Box>
						<MenuMui
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 24,
										height: 24,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={() => handleLangChange("fr")}>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags.fr}
								/>
								{"   "}
								Français
							</MenuItem>
							<MenuItem onClick={() => handleLangChange("gb")}>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags.gb}
								/>
								{"   "}
								English
							</MenuItem>
						</MenuMui>
					</div>

					<div className="flex">
						<Dropdown
							arrowIcon={false}
							inline={true}
							className="shadow-sm rounded-2xl w-fit"
							label={
								<IconBadge total={-1}>
									<AiOutlineBell size={25} />
								</IconBadge>
							}
						>
							<NotificationBadge
								avatar={avatar}
								time={"29 July 2020 - 02:26 PM"}
								title={"Dr sultads Send you Photo"}
							/>

							<NotificationBadge
								avatar={"https://via.placeholder.com/150"}
								time={"02 February 2023 - 1:43 PM"}
								title={"Bienvenu has received money from..."}
							/>

							<NotificationBadge
								avatar={avatar}
								time={"29 July 2020 - 02:26 PM"}
								title={"Dr sultads Send you Photo"}
							/>

							<Dropdown.Divider />

							<Dropdown.Item>
								<p className="text-center w-full flex items-center justify-center text-lg text-gray-500 font-light gap-2">
									See All Notification
									<AiOutlineArrowRight />
								</p>
							</Dropdown.Item>
						</Dropdown>
					</div>

					<div className="hidden md:flex">
						<label htmlFor="my-drawer-4" onClick={() => setDraw(!draw)}>
							<IconBadge total={-1}>
								<AiOutlineMessage size={25} />
							</IconBadge>
						</label>


					</div>
				</div>

				<div className="flex gap-3 items-center">
					<div className="text-right hidden md:block">
						<span>
							Hello, <span className="font-bold">{session?.user?.data.names ?? session?.user?.data.name ?? ""}</span>
						</span>
						<h5 className="text-xs font-light">{session?.user?.email ?? ``}</h5>
					</div>
					<Dropdown
						arrowIcon={false}
						inline={true}
						className="shadow-sm rounded-2xl w-48"
						label={
							<Avatar
								alt="User settings"
								img={session?.user?.data.image ?? `https://ui-avatars.com/api/?uppercase=true&background=FE8023&name=${session?.user?.data.names}&bold=true&color=FFF`}
								rounded={true}
								size={30}
								className="w-12 h-12"
							/>
						}
					>
						<Dropdown.Item>
							<Link href={"/profile"}>
								<span className="flex gap-3 text-lg items-center">
									<MdOutlinePersonOutline
										className="text-lg text-sky"
										size={23}
									/>
									<font>Profile</font>
								</span>
							</Link>
						</Dropdown.Item>
						<Dropdown.Item>
							<Link href={"/inbox"}>
								<span className="flex gap-3 text-lg items-center">
									<MdMailOutline className="text-lg text-green-500" size={23} />
									<font>Inbox</font>
								</span>
							</Link>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>
							<button onClick={handleSignOut}>
								<span className="flex gap-3 text-lg items-center">
									<MdMailOutline className="text-lg text-red-500" size={23} />
									<font>Logout</font>
								</span>
							</button>
						</Dropdown.Item>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default Menu;
