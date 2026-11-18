import { Button } from "@/lumina-ui";
import { ROUTES } from "@/config";
import { useSession } from "@/lib/session";

/** Tombol masuk ke aplikasi. Berubah menjadi "Lanjutkan belajar" jika session aktif. */
export function CtaButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const session = useSession();
  const href = session.loggedIn ? session.continueHref : ROUTES.login;
  return (
    <Button href={href} size="sm" className={className} onClick={onClick}>
      {session.loggedIn ? "Lanjutkan belajar" : "Masuk"}
    </Button>
  );
}
