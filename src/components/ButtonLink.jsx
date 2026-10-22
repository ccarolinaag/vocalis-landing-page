import styles from './ButtonLink.module.css'

export function ButtonLink({ children, href, variant = 'primary', className = '' }) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${className}`} href={href}>
      {children}
    </a>
  )
}
