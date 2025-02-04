"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
// import { GrTechnology } from 'react-icons/gr';
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav className={styles.navbar}>
        <div>
          <Link href="/" className={styles.logo}>
            CLOUD <GrTechnology /> HOSTING
          </Link>
          <div className={styles.menu}>
            {toggle ? (
              <IoMdClose onClick={() => setToggle((prev) => !prev)} />
            ) : (
              <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
            )}
          </div>
        </div>
        <div
          className={styles.navLinksWrapper}
          style={{
            clipPath:
              (toggle && "polygon(0 1%, 100% 0, 100% 100%, 0% 100%)") || "",
          }}
        >
          <ul className={styles.navLinks}>
            <Link
              onClick={() => setToggle(false)}
              className={styles.navLink}
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setToggle(false)}
              className={styles.navLink}
              href="/articles?pageNumber=1"
            >
              Articles
            </Link>
            <Link
              onClick={() => setToggle(false)}
              className={styles.navLink}
              href="/about"
            >
              About
            </Link>
            <Link
              onClick={() => setToggle(false)}
              className={styles.navLink}
              href="/admin"
            >
              Admin Dashboard
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
