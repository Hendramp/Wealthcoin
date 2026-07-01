import { useState } from "react";
import { IconCoin } from "../shared/Icons";

export default function Navbar({
  account,
  connectWallet,
  disconnectWallet,
}) {
  const [open, setOpen] = useState(false);

  const links = [
    "Home",
    "Academy",
    "Community",
    "Foundation",
    "Documents",
    "Dashboard",
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
        className="bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/20"
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-4">

            <div className="w-12 h-12">
              <IconCoin />
            </div>

            <h1 className="font-display text-4xl gold-text font-bold">
              WealthCoin
            </h1>

          </div>

          {/* Desktop Nav */}

          <nav className="hidden lg:flex items-center gap-8">

            {links.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-white/75 hover:text-[#FFD700] transition text-sm uppercase tracking-wider"
              >
                {item}
              </a>
            ))}

          </nav>

          {/* Desktop Wallet */}

          <div className="hidden lg:block">

            <button
              onClick={account ? disconnectWallet : connectWallet}
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/10 transition"
            >
              {account ? "Disconnect" : "Connect Wallet"}
            </button>

          </div>

          {/* Mobile Hamburger */}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1"
          >

            <span className="w-6 h-[2px] bg-[#FFD700]" />
            <span className="w-6 h-[2px] bg-[#FFD700]" />
            <span className="w-6 h-[2px] bg-[#FFD700]" />

          </button>

        </div>

        {/* Mobile Menu */}

        {open && (

          <div className="lg:hidden border-t border-[#D4AF37]/20 bg-black">

            <div className="px-6 py-6 flex flex-col gap-5">

              {links.map((item) => (

                <a
                  key={item}
                  href={"#" + item.toLowerCase()}
                  onClick={() => setOpen(false)}
                  className="text-white/80 text-lg"
                >
                  {item}
                </a>

              ))}

              <button
                onClick={() => {
                  setOpen(false);

                  if (account)
                    disconnectWallet();
                  else
                    connectWallet();
                }}
                className="mt-4 py-3 rounded-xl border border-[#D4AF37]/40 text-[#FFD700]"
              >
                {account ? "Disconnect" : "Connect Wallet"}
              </button>

            </div>

          </div>

        )}

      </header>

      {/* Prevent content from hiding behind navbar */}

      <div className="h-20" />
    </>
  );
}