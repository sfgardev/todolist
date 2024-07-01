import { Menu } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";
import { authMe, logout, selectIsLoggedIn } from "../features/Login/authSlice";
import { selectIsInitialized, selectStatus } from "./appSlice";
import { ErrorSnackbar } from "../common/components";

type AppProps = {
  demo?: boolean;
};

function App({ demo = false }: AppProps) {
  const status = useAppSelector(selectStatus);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // const status = useAppSelector((state) => state.app.status);
  // const isInitialized = useAppSelector((state) => state.app.isInitialized);
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(authMe());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          )}
        </Toolbar>
        {isLoading && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
