import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import localfont from 'next/font/local';


const nugget = localfont(
    {
        src: [
            {
                path: "../../public/fonts/Draco.otf"
            }
        ],
        variable: "--font-nugget",
    }
);
function Navbar() {


    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/Video"><p className={nugget.className}>RAW RED</p></Link>
            </div>
            <div className={styles.links}>
                <div className={`nav_links ${nugget.className}`}>
                    <Link href='/Login'>
                        <h3 className="nav-link-text">Login</h3>
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
