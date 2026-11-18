import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ROUTES, SESSION } from "@/config";

type Session = { loggedIn: false } | { loggedIn: true; continueHref: string };

const SessionContext = createContext<Session>({ loggedIn: false });

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({ loggedIn: false });

  useEffect(() => {
    if (!SESSION.enabled) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SESSION.timeoutMs);

    fetch(SESSION.endpoint, { credentials: "include", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { nextRoute?: string } | null) => {
        if (data) {
          setSession({ loggedIn: true, continueHref: data.nextRoute ?? ROUTES.continueDefault });
        }
      })
      // Gagal atau lambat: tetap versi "belum login".
      .catch(() => {})
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
