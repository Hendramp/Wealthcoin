import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PrivacyNotice() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-16 text-white">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
          Privacy Notice
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold">
          Your information stays yours.
        </h1>

        <div className="mt-8 space-y-6 text-white/70 leading-7">
          <section>
            <h2 className="text-lg font-semibold text-white">What we collect</h2>
            <p>
              When you subscribe to the WealthCoin Academy, we collect your
              email address — and only your email address. We use it strictly
              to send you Academy lesson updates and announcements.

            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">What we never do</h2>
            <p>
              We never sell, rent, or share your information with third
              parties. Your email is used for WealthCoin Academy updates
              only — nothing else.

            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Unsubscribe anytime</h2>
            <p>
              You can unsubscribe with one click from any email we send.
              And if you change your mind, you can resubscribe just as
              easily.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Updates to this notice</h2>
            <p>
              This notice may be updated as WealthCoin grows and our practices
              evolve. Any changes will be reflected here.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Questions</h2>
            <p>
              Email us at{" "}
              <a href="mailto:WTCteam@outlook.com" className="text-[#D4AF37] hover:underline">
                WTCteam@outlook.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
