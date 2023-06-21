import Image from 'next/image'
import Stage from '@/components/Stage'
import styles from '@/scss/pages/home.module.scss'

async function getWorks() {
  const res = await fetch(`@/db/works.json`)
  return res.json()
}

export default function Home({galleryContents}) {

  const contents = getWorks();

  return (
    <main>
      <Stage contents={contents.items} />
    </main>
  )
}


