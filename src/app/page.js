import Stage from '@/components/Stage'
import styles from '@/scss/pages/home.module.scss'

async function getData() {
  const res = await fetch('http://localhost:3000/data/works.json')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home({galleryContents}) {

  const data = await getData()
  return (
    <main>
      <Stage contents={data.items} />
    </main>
  )
}


