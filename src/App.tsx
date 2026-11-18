import { LandingPage } from "./LandingPage";
import { SessionProvider } from "./lib/session";

export default function App() {
  return (
    <SessionProvider>
      <LandingPage />
    </SessionProvider>
  );
}
