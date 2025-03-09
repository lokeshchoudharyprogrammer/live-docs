
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Home=()=>{

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Link href="/documents/12">
      Got to docs</Link>
    </div>
  )
}

export default Home;