import Image from 'next/image'
import styles from '@/scss/pages/home.module.scss'

export default function Home() {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.title}>i'm a title</div> 
        <div className={styles.image}>
          <Image
            className={styles.logo}
            src="/images/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <p>
          Using nextjs with scss but in css modules (wooooo, why?)
        </p>
      </div>

    </main>
  )
}
