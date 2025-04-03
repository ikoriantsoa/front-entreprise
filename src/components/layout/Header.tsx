import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useState } from "react";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    console.log("Déconnexion...");
    setShowMenu(false);
  };
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 lg:gap-4 w-full">
          <div className="md:flex relative w-full max-w-sm lg:max-w-md font-extrabold lg:text-4xl">
            TALENTUP ENTREPRISE
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <div className="flex flex-col items-center p-4">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Avatar"
                className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
                onClick={handleAvatarClick}
              />

              {/* Menu Déconnexion */}
              {showMenu && (
                <div className="absolute top-14 right-0 bg-white shadow-lg border rounded-lg w-40">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
