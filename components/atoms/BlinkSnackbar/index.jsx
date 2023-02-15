import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import {
  Alert,
  AlertTitle,
  Avatar,
  Card,
  colors,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export default function BlinkSnackbar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 60000);
      }, 15000);
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={Fade}
      key={Fade.name}
    >
      <Card sx={{ maxWidth: 350, backgroundColor: colors.blue[50] }}>
        <ListItem alignItems="center" sx={{ p: 0 }}>
          <ListItemAvatar sx={{ m: 0, mr: 2, height: "100%", p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src="/images/push.jpeg"
              variant="square"
              sx={{ width: 90, height: "100%" }}
            />
          </ListItemAvatar>
          <ListItemText
            // sx={{ my: 2 }}
            // primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                {"I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </Card>
    </Snackbar>
  );
}
