import Link from 'next/link';
import styles from './header.module.scss'

function Header() {
    return (
      <header className={styles.headerContent}>
        <Link href='/'>
          <img src='/images/Logo.png' alt="logo" />
        </Link>
      </header>
    )
  }
  
  export default Header;