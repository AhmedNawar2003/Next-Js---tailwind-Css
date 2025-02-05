import Link from "next/link";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import LogoutButton from './LogoutButton';
const Header = async () => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <div>
      <header className={styles.header}>
        <Navbar />
        <div className={styles.right}>
          {payload ? (
            <>
              <strong className="text-blue-800 md:text-xl capitalize">
                {payload.username}
              </strong>
              <LogoutButton/>
            </>
          ) : (
            <>
              <Link className={styles.btn} href="/login">
                Login
              </Link>
              <Link className={styles.btn} href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
