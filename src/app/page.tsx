import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-sans transition-colors">
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-6 sm:p-16 text-center">
        
        {/* Container do Ícone - Adiciona peso visual */}
        <div className="mb-6 p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <PlusCircle size={48} />
        </div>

        {/* Texto Principal - Hierarquia clara */}
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zincine100 sm:text-5xl">
          Create a new page
        </h1>
        
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          Start your journey by creating a new workspace. All your settings will be saved automatically.
        </p>

        {/* Call to Action (CTA) - O elemento que falta no seu original */}
        <div className="mt-10">
          <Button variant="primary"> Teste </Button>
          <button className="px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Get Started
          </button>
        </div>

        {/* Link secundário - Para UX de navegação */}
        <button className="mt-6 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
          Browse templates instead
        </button>

      </main>
    </div>
  );
}
