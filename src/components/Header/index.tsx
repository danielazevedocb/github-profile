import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import styles from '../Header/styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={Logo} height={48} width={233} alt="logo" />
      </Link>
    </header>
  )
}
