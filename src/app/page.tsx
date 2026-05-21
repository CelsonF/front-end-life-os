import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-sans transition-colors">
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-6 sm:p-16 text-center">
        <div className="mb-6 p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <PlusCircle size={48} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Life OS
        </h1>

        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          Gamify your productivity. Track tasks, build habits, and level up your life.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/dashboard">
            <Button variant="primary">Go to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
