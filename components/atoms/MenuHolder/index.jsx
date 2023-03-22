import {
	Button,
	Box,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useTranslation, Trans } from 'react-i18next';


const langFlags = {
	gb: "https://flagcdn.com/60x45/gb.png",
	fr: "https://flagcdn.com/60x45/fr.png",
};

const lngs = {
	en: { nativeName: 'English', flag: "https://flagcdn.com/60x45/gb.png" },
	fr: { nativeName: 'French', flag: "https://flagcdn.com/60x45/fr.png" }
};

export default function MenuHolder({ href, label }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { t, i18n } = useTranslation();
	const [lang, setLang] = React.useState(i18n.resolvedLanguage);


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
		i18n.changeLanguage(lang)
	};

	return (
		<div className="menu-holder">
			<ul className="main-links">
				<li>
					<Box>
						<Tooltip title="Language">
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={open ? "account-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={lngs[lang].flag}
								/>
							</IconButton>
						</Tooltip>
					</Box>
					<Menu
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
						{Object.keys(lngs).map((lng) => (
							<>
								<MenuItem key={lng} onClick={() => handleLangChange(lng)}>
									<Avatar
										// variant="square"
										sx={{ width: 24, height: 24 }}
										src={lngs[lng].flag}
									/>
									{lngs[lng].nativeName}
								</MenuItem>
							</>
						))}
						
					</Menu>
				</li>
				<li>
					<Box sx={{ mx: 2 }}>
						<Link className="normal-link" href={href}>
							Don't have an account?
						</Link>
					</Box>
				</li>
				<li>
					<Box>
						<Link href={href}>
							<Button variant="contained" className="bg-yellow">
								{label}
							</Button>
						</Link>
					</Box>
					{/* <Link className="sign-button" href="/register">
            Sign up
          </Link> */}
				</li>
			</ul>
		</div>
	);
}
