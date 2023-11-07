import { Layout } from "./layout";
import { ThemeProvider } from "./components/theme-provider";

export const App = () => {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
};
