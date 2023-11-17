'use client'

import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  return (
    <main>
      <h1 className="bg-emerald-400 w-32 h-8" onClick={() => {
        router.push('/setor/admin')
      }}>Acesse aqui</h1>
    </main>
  )
}
