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
import { useTranslation, Trans } from "react-i18next";
import { HiChevronDown, HiOutlineTranslate } from "react-icons/hi";

const langFlags = {
  gb: "https://flagcdn.com/60x45/gb.png",
  fr: "https://flagcdn.com/60x45/fr.png",
};

const lngs = {
  en: { nativeName: "English", flag: "https://flagcdn.com/60x45/gb.png" },
  fr: { nativeName: "French", flag: "https://flagcdn.com/60x45/fr.png" },
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
    i18n.changeLanguage(lang);
  };

  return (
    <div className="menu-holder">
      <ul className="main-links">
        <li>

          <details className="dropdown">
            <summary className="m-1 btn px-2 -py-1 bg-transparent text-gray-800 text-xs border-2 hover:border-gray-300 border-none space-x-1 hover:!bg-gray-100"><HiOutlineTranslate size={23} className="text-gray-600"/> <HiChevronDown size={20} className="text-gray-400"/></summary>
            <ul className="shadow-sm menu dropdown-content z-[1] w-max rounded-xl">
              <li><button onClick={() => handleLangChange("fr")}>Français</button></li>
              <li><button onClick={() => handleLangChange("en")}>Anglais&nbsp;&nbsp;</button></li>
            </ul>
          </details>
        </li>
        <li>
          <Box sx={{ mx: 2 }}>
            <Link className="normal-link" href={href}>
              {t('signIn.question')}
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
