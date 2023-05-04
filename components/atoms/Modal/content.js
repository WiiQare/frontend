import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { HiXMark } from "react-icons/hi2";
import MuiPhoneNumber from "material-ui-phone-number";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { invitationFriend } from "../../../lib/helper";
import { useSession } from "next-auth/react";
import LoadingButton from "../Loader/LoadingButton";
import Toast from "../Toast";


const TabHistories = [
	{
		name: "email",
	},
	{
		name: "Phone",
	}
]

const ContentModal = ({ title, tabs, children, closeModal }) => {
	const [value, setValue] = useState(0);
    const { status, data: session } = useSession();
    const [state, setState] = useState({ type: 0, message: '' });


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const closeToast = () => {
		setState({ type: 0, message: "" })
	}

	return (
		<div className="fixed inset-0 overflow-y-auto">
			{state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}
			<div className="flex items-center justify-center min-h-full p-4 text-center">
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl space-y-8">
						<Dialog.Title as="div" className="flex justify-between items-center">
							<h3 className="text-md font-semibold leading-6 text-gray-900">
								{title}
							</h3>

							{tabs ? <TabsModal value={value} handleChange={handleChange} /> : <></>}
						</Dialog.Title>


						{
							tabs ? (
								<TabItems value={value} accessToken={session.user.data.access_token} closeModal={closeModal} setState={setState}/>
							) : <></>
						}

					</Dialog.Panel>
				</Transition.Child>
			</div>
		</div>
	);
}

export default ContentModal;

function TabItems({ value, accessToken, closeModal, setState }) {
	// For Email
	const [allFriends, setAllFriends] = useState([{email: ""}]);

	const [allFriendsPhone, setAllFriendsPhone] = useState([{phone: ""}]);



	const handleAddFriend = (phone = false) => {
		if (phone) {
			const values = [...allFriendsPhone];
			values.push({
				phone: "",
			});
			setAllFriendsPhone(values);

			console.log(allFriendsPhone);
		} else {
			const values = [...allFriends];
			values.push({
				email: "",
			});
			setAllFriends(values);
		}
	};

	const handleInputChange = (index, event, phone = false) => {

		if (phone) {
			const values = [...allFriendsPhone];
			const updatedValue = event.target.name;
			values[index][updatedValue] = event.target.value;

			setAllFriendsPhone(values);
		} else {

			const values = [...allFriends];
			const updatedValue = event.target.name;
			values[index][updatedValue] = event.target.value;

			setAllFriends(values);
		}
	};

	const handleInputChangePhone = (index, event) => {

		const values = [...allFriendsPhone];
		values[index]['phone'] = event;

		setAllFriendsPhone(values);

	};

	const handleRemoveFriends = (index, phone = false) => {

		if (phone) {

			const values = [...allFriendsPhone];
			if (values.length > 1) {
				values.splice(index, 1);
				setAllFriendsPhone(values);
			}
		} else {
			const values = [...allFriends];
			if (values.length > 1) {
				values.splice(index, 1);
				setAllFriends(values);
			}
		}
	};

	const newInviteMutation = useMutation(invitationFriend, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Les invitations ont été envoyé" })

                //Close Modal
				setTimeout(() => {
					closeModal()
				}, 2500);

            };
        }
    });

	const onSubmit = async (values) => {

		let mails = [], phones = [];

		allFriends.map((friend) => { friend.email.trim(" ") != "" && mails.push(friend.email)})
		allFriendsPhone.map((friend) => { friend.phone.trim(" ") != "" && phones.push(friend.phone)})

		if(value == 0) {

			newInviteMutation.mutate({ inviteType: "EMAIL", emails: mails, accessToken })
		} else {

			newInviteMutation.mutate({ inviteType: "SMS", phoneNumbers: phones, accessToken })
		}
    };

	const formik = useFormik({
		initialValues: {},
        onSubmit
    })

	return (
		<div className="mt-2">

			<div className="text-sm text-gray-500">
				{/* For Email */}
				<TabPanel value={value} index={0} >
					<div className="space-y-8">
						<form id="invite-email" className="space-y-8" onSubmit={formik.handleSubmit}>


							<div className="flex flex-col gap-2 w-full">
								{
									allFriends.map((field, index) => (
										<form key={index} className="flex w-full justify-between items-center gap-3">

											<TextField
												fullWidth
												type={"email"}
												className="w-9/12 placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
												label="Adresse e-mail d'un ami"
												name="email"
												variant="outlined"
												value={field.email}
												onChange={(event) =>
													handleInputChange(index, event)
												}
											/>

											{
												index > 0 ? (
													<button className="bg-red-300 rounded-full hover:bg-red-700 hover:text-white transition duration-200" onClick={() => handleRemoveFriends(index)}>
														<HiXMark />
													</button>
												) : <></>
											}
										</form>
									))
								}
							</div>

							<div className="flex flex-row-reverse gap-4">
								<button className="bg-orange text-sm py-2 px-4 rounded-lg effect-up text-white" onClick={() => handleAddFriend()} type="button">
									+ Ajouter un ami
								</button>
								<button className="border border-orange text-sm py-2 px-4 rounded-lg text-orange effect-up"  type="submit" form="invite-email">
									{newInviteMutation.isLoading ? <LoadingButton /> : 'Envoyer'}								
								</button>
							</div>
						</form>
					</div>

				</TabPanel>

				<TabPanel value={value} index={1} >

					<div>
						<form id="invite-sms" className="space-y-8" onSubmit={formik.handleSubmit}>
							
							<div className="flex flex-col gap-2 w-full">
								{
									allFriendsPhone.map((field, index) => (
										<form key={index} className="flex w-full justify-between items-center gap-3">
											
											<MuiPhoneNumber
												fullWidth
												name="phone"
												label="Numéro de téléphone d'un ami"
												onChange={(event) => handleInputChangePhone(index, event)}
												variant="outlined"
												defaultCountry={"fr"}
												value={field.phone}
												placeholder={"Entrez le numéro de téléphone d'un ami"}
												className="w-9/12 py-3 placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
											/>
											{
												index > 0 ? (
													<button type="button" className="bg-red-300 rounded-full hover:bg-red-700 hover:text-white transition duration-200" onClick={() => handleRemoveFriends(index, true)}>
														<HiXMark />
													</button>
												) : <></>
											}
										</form>
									))
								}
							</div>

							<div className="flex flex-row-reverse gap-4">
								<button className="bg-orange text-sm py-2 px-4 rounded-lg effect-up text-white" onClick={() => handleAddFriend(true)} type="button">
									+ Ajouter un ami
								</button>
								<button className="border border-orange text-sm py-2 px-4 rounded-lg text-orange effect-up" type="submit" form="invite-sms">
									{newInviteMutation.isLoading ? <LoadingButton /> : 'Envoyer'}
								</button>
							</div>
						</form>
					</div>

				</TabPanel>
			</div>
		</div>
	)
}

function TabsModal({ value, handleChange }) {

	return (
		<div>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{TabHistories.map((item, index) => <Tab label={item.name} {...a11yProps(index)} key={index} />)}
				</Tabs>
			</Box>
		</div>
	)
}

export function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}