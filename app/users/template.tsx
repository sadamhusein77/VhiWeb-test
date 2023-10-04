"use client";

import * as React from "react";
import "tailwindcss/tailwind.css";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { validateLogin } from "@/helper";
import Link from "next/link";
import RawDialog from "@/components/molecules/RawDialog";
import GeneralButton from "@/components/atoms/button";
import { setDisplayModalFunction } from "@/config/api/apiService";
import GlobalModal from "@/components/molecules/GlobalModal";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

interface INavItems {
  id: number;
  name: string;
  path: string;
}

const drawerWidth = 240;
const navItems: INavItems[] = [{ id: 1, name: "Users", path: "/users" }];

export default function Template(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [isErrorServer, setIsErrorServer] = React.useState<boolean>(false);

  const { window, children } = props;

  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = React.useCallback(() => {
    setIsOpenDialog(false);
  }, [isOpenDialog]);

  const handleLogout = React.useCallback(() => {
    Cookies.remove("token-vhiweb");
    handleCloseDialog();
    handleClose();
    router.push("/");
  }, []);

  const handleShowDialog = React.useCallback(() => {
    setIsOpenDialog(true);
  }, [isOpenDialog]);

  React.useEffect(() => {
    const token = validateLogin();
    if (!token) {
      router.push("/");
      toast.error("Silakan login terlebih dahulu");
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VhiWEB
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ id, name, path }: INavItems) => (
          <Link href={path} key={id}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  setDisplayModalFunction(() => {
    setIsErrorServer(true);
  });

  return (
    <div className="h-screen flex flex-col">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block" }}
          >
            VhiWEB
          </Typography>
          <Box sx={{ display: "block" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleShowDialog}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <div className="overflow-y-auto">{children}</div>
      <RawDialog isOpen={isOpenDialog}>
        <div className="flex flex-col gap-2 p-8">
          <h3 className="text-2xl font-semibold">Konfirmasi</h3>
          <span className="text-base text-slate-500">
            Apakah Anda yakin ingin keluar ?
          </span>
          <div className="flex justify-end gap-4 mt-8">
            <GeneralButton
              variant="text"
              label="Batal"
              className="!text-rose-500"
              size="medium"
              handleOnClick={handleCloseDialog}
            />
            <GeneralButton
              variant="contained"
              label="Ya"
              className="!bg-sky-500"
              size="medium"
              handleOnClick={handleLogout}
            />
          </div>
        </div>
      </RawDialog>
      <GlobalModal isOpen={isErrorServer} handleClickButton={handleLogout} />
    </div>
  );
}
