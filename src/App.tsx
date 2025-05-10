import { BrowserRouter } from 'react-router-dom';
import { RootNavigation } from './routes/RootNavigation';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RootNavigation />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;