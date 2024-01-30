import { MainNav } from "./main-nav"

export default function Header() {
  return (
    <header className="sticky flex justify-left border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 sm:px-6 text-orange-500">
        Wallet app
      </div>
    </header>
  )
}

