import { useEffect, useState } from "react";
import {
  getGenesisOwner,
  getTreasury,
  isSaleOpen,
} from "../../services/blockchain";

export default function GenesisStatus() {
  const [owner, setOwner] = useState("");
  const [treasury, setTreasury] = useState("");
  const [saleOpen, setSaleOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setOwner(await getGenesisOwner());
        setTreasury(await getTreasury());
        setSaleOpen(await isSaleOpen());
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-yellow-600 bg-black/70 p-6 text-white">
      <h2 className="text-2xl font-bold text-yellow-400">
        Genesis Network Status
      </h2>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Network:</strong> Polygon Amoy
        </p>

        <p>
          <strong>Owner:</strong>
          <br />
          {owner}
        </p>

        <p>
          <strong>Treasury:</strong>
          <br />
          {treasury}
        </p>

        <p>
          <strong>Sale Open:</strong>{" "}
          {saleOpen ? "🟢 Yes" : "🔴 No"}
        </p>
      </div>
    </section>
  );
}