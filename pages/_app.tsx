import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='max-w-7xl mx-auto '>
      <Component {...pageProps} />
      <footer>© 2024 Mi Aplicación del Clima</footer>
    </div>
  );
}

export default MyApp;