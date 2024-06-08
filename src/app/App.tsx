import "./App.css";
import { Todos } from "../features/Todos/Todos";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";

type AppProps = {
  demo?: boolean;
};

function App({ demo = false }: AppProps) {
  const status = useAppSelector((state) => state.app.status);
  const isLoading = status === "loading";

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {isLoading && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Todos demo={demo} />
      </Container>
    </div>
  );
}

export default App;
