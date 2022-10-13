import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  const state = useSelector((state) => state.themeSlice);
  const themeObject = state.theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={state}>
      <BrowserRouter>
        <GlobalStyle theme={themeObject} />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
