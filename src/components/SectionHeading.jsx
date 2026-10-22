import styles from './SectionHeading.module.css'

export function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
