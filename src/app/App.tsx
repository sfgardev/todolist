import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Todos } from "../features/Todos/Todos";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Todos />
      </Container>
    </div>
  );
}

export default App;
