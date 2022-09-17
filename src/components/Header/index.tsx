import ActiveLink  from '../ActiveLink'
import styles from './header.module.scss'

function Header() {
    return (
      <header className={styles.headerContent}>
        <ActiveLink href='/'>
          <img src='/images/Logo.png' alt="logo" />
        </ActiveLink>
      </header>
    )
  }
  
  export default Header;