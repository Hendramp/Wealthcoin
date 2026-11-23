import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { getFeeBps, getFactoryContract, getReadRunner } from "../services/escrow";
import { useAppKitAccount } from "@reown/appkit/react";

const CATEGORIES = [
  { value: "handmade", label: "Handmade & Artisan" },
  { value: "digital", label: "Digital Products" },
  { value: "physical", label: "Physical Goods" },
  { value: "services", label: "Services & Labor" },
  { value: "business", label: "Business Services" },
  { value: "local_food", label: "Local Food & Farm" },
  { value: "ministry", label: "Ministry & Nonprofit" },
  { value: "other", label: "Other" },
];

const DELIVERY_METHODS = [
  { value: "ship", label: "Ships (sold in WTC on-platform)" },
  { value: "digital", label: "Digital Delivery (sold in WTC on-platform)" },
  { value: "local_pickup", label: "Local Pickup / Signpost (perishable only)" },
];

const HARD_BAN_TERMS = [
  "weed","marijuana","cannabis","cocaine","heroin","fentanyl","mdma","molly",
  "ecstasy","lsd","acid","shrooms","psilocybin","dmt","ketamine","meth",
  "oxycodone","xanax","adderall","gun","firearm","pistol","rifle","shotgun",
  "ammunition","explosive","bomb","grenade","switchblade","brass knuckles",
  "taser","trafficking","escort","livestock","cattle","counterfeit","stolen",
  "fake id","social security",
];

const SIGNAGE_FEE_USD = 5.00; // flat advertising fee for local pickup / signpost posts
const FALLBACK_PRICE_USD = 0.000075;
const POOL_ADDRESS = "0x9feffb07add2daa2a19a78ea0aa1e5bbdbeaa57753151146a83fe91ccb306c7e";
const MAX_IMAGES = 4;
const MAX_IMAGE_MB = 5;
const MAX_FILE_MB = 25; // digital product file size cap

export default function ListingForm({ onListed }) {
  const { user } = useAuth();
  const { address } = useAppKitAccount();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceUsd, setPriceUsd] = useState(""); // USD is the stable reference
  const [category, setCategory] = useState("handmade");
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [wtcPrice, setWtcPrice] = useState(null);
  const [feeBps, setFeeBps] = useState(null);
  const [feeUnavailable, setFeeUnavailable] = useState(false);
  const [contractTerms, setContractTerms] = useState(null);
  const [images, setImages] = useState([]); // preview images
  const [productFile, setProductFile] = useState(null); // the actual digital deliverable

  React.useEffect(() => {
    async function fetchPrice() {
      try {
        const gt = await fetch(
          `https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/${POOL_ADDRESS}`
        );
        const gtData = await gt.json();
        const gtPrice = gtData?.data?.attributes?.base_token_price_usd;
        const parsedPrice = Number(gtPrice);
        if (Number.isFinite(parsedPrice) && parsedPrice > 0) {
          setWtcPrice(parsedPrice);
          return;
        }
        throw new Error("no indexed price");
      } catch (err) {
        console.error("Price fetch failed:", err);
        setWtcPrice(FALLBACK_PRICE_USD);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let active = true;
    async function fetchFee() {
      try {
        const bps = await getFeeBps();
        if (active) {
          setFeeBps(Number(bps));
          setFeeUnavailable(false);
        }
      } catch (err) {
        console.error("Escrow fee read failed:", err);
        if (active) {
          setFeeBps(null);
          setFeeUnavailable(true);
        }
      }
    }
    fetchFee();
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    async function fetchTerms() {
      try {
        const factory = getFactoryContract(getReadRunner());
        const [defaultPaymentWindow, defaultDeliveryWindow, MIN_PAYMENT_WINDOW, MIN_DELIVERY_WINDOW, MAX_FEE_BPS] =
          await Promise.all([
            factory.defaultPaymentWindow(),
            factory.defaultDeliveryWindow(),
            factory.MIN_PAYMENT_WINDOW(),
            factory.MIN_DELIVERY_WINDOW(),
            factory.MAX_FEE_BPS(),
          ]);
        if (active) setContractTerms({
          defaultPaymentWindow: Number(defaultPaymentWindow),
          defaultDeliveryWindow: Number(defaultDeliveryWindow),
          MIN_PAYMENT_WINDOW: Number(MIN_PAYMENT_WINDOW),
          MIN_DELIVERY_WINDOW: Number(MIN_DELIVERY_WINDOW),
          MAX_FEE_BPS: Number(MAX_FEE_BPS),
        });
      } catch (error) {
        console.error("Escrow terms read failed:", error);
        if (active) setContractTerms({ unavailable: true });
      }
    }
    fetchTerms();
    return () => { active = false; };
  }, []);

  const priceUsdNum = Number(priceUsd);
  const isSignage = deliveryMethod === "local_pickup";
  const isDigital = deliveryMethod === "digital";

  // USD → WTC conversion at the current live price
  const wtcValue = wtcPrice && !Number.isNaN(priceUsdNum) && priceUsdNum > 0
    ? priceUsdNum / wtcPrice
    : null;

  // Fee logic: local pickup is a flat signage fee; escrow sales use the factory fee.
  const feeUsd = isSignage
    ? SIGNAGE_FEE_USD
    : !Number.isNaN(priceUsdNum) && priceUsdNum > 0 && feeBps !== null
      ? priceUsdNum * (Number(feeBps) / 10000)
      : null;
  const feeWtc = wtcPrice ? (feeUsd / wtcPrice).toFixed(4) : null;
  const feeLabel = isSignage ? "Signage / advertising fee" : "Transaction fee";

  async function handleFiles(fileList) {
    if (!user) return;
    const files = Array.from(fileList || []);

    for (const file of files) {
      if (images.length >= MAX_IMAGES) {
        setError(`You can add up to ${MAX_IMAGES} images per listing.`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        setError(`Each image must be under ${MAX_IMAGE_MB} MB.`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      const entry = { name: file.name, url: previewUrl, uploading: true };
      setImages((prev) => [...prev, entry]);

      const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Could not upload ${file.name}. Please try again.`);
        setImages((prev) => prev.filter((i) => i.name !== file.name));
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);

      setImages((prev) =>
        prev.map((i) =>
          i.name === file.name ? { ...i, url: urlData.publicUrl, uploading: false } : i
        )
      );
    }
  }

  function removeImage(name) {
    setImages((prev) => prev.filter((i) => i.name !== name));
  }

  // Upload the actual digital deliverable file (not viewable by buyers until purchase)
  async function handleProductFile(file) {
    if (!user || !file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
      "image/jpeg",
      "image/png",
      "application/zip",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("That file type isn't supported for digital delivery. Use PDF, DOCX, TXT, MD, JPG, PNG, or ZIP.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Digital files must be under ${MAX_FILE_MB} MB.`);
      return;
    }

    const path = `${user.id}/digital/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const { error: uploadError } = await supabase.storage
      .from("digital-deliverables")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError("Could not upload your file. Please try again.");
      return;
    }

    setProductFile({
      name: file.name,
      path,
      size: file.size,
    });
    setError("");
  }

  function removeProductFile() {
    setProductFile(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      setError("You must be signed in to list an item.");
      return;
    }

    if (!title.trim() || !description.trim() || !priceUsd || Number.isNaN(priceUsdNum) || priceUsdNum <= 0) {
      setError("Please fill in a title, description, and a valid USD price.");
      return;
    }

    if (!acknowledged) {
      setError("You must confirm your listing complies with all Marketplace Rules.");
      return;
    }

    if (!address) {
      setError("Connect your wallet before listing an item.");
      return;
    }

    if (!isSignage && (feeUnavailable || feeUsd === null)) {
      setError("Escrow fee unavailable. Please try again after the contract fee is available.");
      return;
    }

    if (deliveryMethod === "local_pickup" && (!city.trim() || !state.trim())) {
      setError("Local pickup listings require a city and state.");
      return;
    }

    // Digital products must have the actual deliverable file
    if (isDigital && !productFile) {
      setError("Digital products require the actual file to be uploaded.");
      return;
    }

    const combined = `${title} ${description}`.toLowerCase();
    if (HARD_BAN_TERMS.some((term) => combined.includes(term))) {
      setError("Your listing contains a term that is permanently prohibited on the Marketplace.");
      return;
    }

    if (images.some((i) => i.uploading)) {
      setError("Please wait for all images to finish uploading.");
      return;
    }

    setSubmitting(true);
    setError("");

    const { data, error: insertError } = await supabase
      .from("marketplace_listings")
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        price_usd: priceUsdNum, // USD is the stable reference
        category,
        delivery_method: deliveryMethod,
        city: city.trim() || null,
        state: state.trim() || null,
        zip: zip.trim() || null,
        status: "pending",
        acknowledged: true,
        seller_wallet: address,
        fee_usd: feeUsd,
        fee_type: isSignage ? "signage" : "transaction",
        images: images.map((i) => i.url),
        // Digital deliverable — stored privately, unlocked on purchase
        digital_file_path: isDigital ? productFile.path : null,
        digital_file_name: isDigital ? productFile.name : null,
      })
      .select();

    if (insertError || !data || !data[0]) {
      setSubmitting(false);
      setError("Could not create listing. Please try again.");
      return;
    }

    await supabase.from("moderation_queue").insert({
      listing_id: data[0].id,
      user_id: user.id,
      reason: "new_listing",
    });

    setSubmitting(false);
    setTitle("");
    setDescription("");
    setPriceUsd("");
    setCategory("handmade");
    setDeliveryMethod("ship");
    setCity("");
    setState("");
    setZip("");
    setAcknowledged(false);
    setImages([]);
    setProductFile(null);
    onListed?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />

      <div className="relative">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          New Listing
        </p>
        <h2 className="mb-6 font-display text-2xl font-extrabold text-white">
          List an item{" "}
          <span className="bg-gradient-to-r from-[#F0D878] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            in WTC
          </span>
        </h2>

        <div className="space-y-5">
          {/* Images (previews) */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Photos <span className="normal-case text-white/30">(up to {MAX_IMAGES}, {MAX_IMAGE_MB} MB each)</span>
            </label>

            <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-black/40 px-4 py-6 text-center transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  handleFiles(event.target.files);
                  event.target.value = "";
                }}
              />
              <span className="text-2xl">📷</span>
              <span className="text-sm font-semibold text-white/70">
                {images.length ? "Add more photos" : "Click to add photos"}
              </span>
              <span className="text-xs text-white/40">
                JPG, PNG, or WebP
              </span>
            </label>

            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((img) => (
                  <div
                    key={img.name}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {img.uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img.name)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white/70 transition hover:bg-red-500/80 hover:text-white"
                      aria-label={`Remove ${img.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What are you listing?"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the item or service…"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Price (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={priceUsd}
                  onChange={(event) => setPriceUsd(event.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-40 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                {wtcValue && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-[#D4AF37]">
                    ≈ {wtcValue.toFixed(0)} WTC
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-white/40">
                Listed in USD — converts to WTC at the live price when someone buys.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Category
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Delivery Method
            </label>
            <select
              value={deliveryMethod}
              onChange={(event) => setDeliveryMethod(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
            >
              {DELIVERY_METHODS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Digital product file upload */}
          {isDigital && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Digital File <span className="normal-case text-white/30">(the deliverable — up to {MAX_FILE_MB} MB)</span>
              </label>

              {!productFile ? (
                <label className="flex min-h-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-black/40 px-4 py-5 text-center transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      handleProductFile(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                  <span className="text-2xl">📄</span>
                  <span className="text-sm font-semibold text-white/70">
                    Upload the file buyers will receive
                  </span>
                  <span className="text-xs text-white/40">
                    PDF, DOCX, TXT, MD, JPG, PNG, or ZIP
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D4AF37]/20 bg-black/40 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-xl">📄</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{productFile.name}</p>
                      <p className="text-xs text-white/40">
                        {(productFile.size / (1024 * 1024)).toFixed(2)} MB · unlocked on purchase
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeProductFile}
                    className="shrink-0 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              )}
              <p className="mt-1 text-xs text-white/40">
                Buyers can't see this file until they pay. The preview image above is what they see.
              </p>
            </div>
          )}

          {deliveryMethod === "local_pickup" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Alpharetta"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder="GA"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                  ZIP
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                  placeholder="30004"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[#D4AF37]/20 bg-black/40 p-4 text-sm">
            <p className="text-white/60">
              {feeLabel}:{" "}
              {feeUsd === null ? (
                <span className="font-bold text-red-400">fee unavailable</span>
              ) : (
                <span className="font-bold text-[#D4AF37]">
                  ${feeUsd.toFixed(2)}
                </span>
              )}
              {feeUsd !== null && feeWtc && (
                <span className="text-emerald-400">
                  {" "}≈ {feeWtc} WTC
                </span>
              )}
            </p>
            {isSignage ? (
              <p className="mt-1 text-xs text-white/40">
                Flat advertising fee for local pickup / signpost posts. No escrow or transaction fee — this is a signpost for your business.
              </p>
            ) : (
              <p className="mt-1 text-xs text-white/40">
                {feeUnavailable
                  ? "fee unavailable"
                  : feeBps !== null
                    ? `${(Number(feeBps) / 100).toFixed(2)}% transaction fee, taken from escrow at release. No minimum fee.`
                    : "Loading escrow fee…"}
              </p>
            )}
            {contractTerms?.unavailable ? (
              <p className="mt-2 text-xs text-red-400">Escrow window terms unavailable</p>
            ) : contractTerms ? (
              <p className="mt-2 text-xs text-white/40">
                Payment window: {contractTerms.defaultPaymentWindow}s (minimum {contractTerms.MIN_PAYMENT_WINDOW}s) ·
                Delivery window: {contractTerms.defaultDeliveryWindow}s (minimum {contractTerms.MIN_DELIVERY_WINDOW}s) ·
                Maximum fee: {(contractTerms.MAX_FEE_BPS / 100).toFixed(2)}%
              </p>
            ) : (
              <p className="mt-2 text-xs text-white/40">Loading escrow terms…</p>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#D4AF37]"
            />
            <span>
              I confirm this listing complies with all Marketplace Rules and
              Regulations, including the prohibition on illegal goods, religious
              services for sale, and anything that could harm another person.
            </span>
          </label>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full min-h-[52px] rounded-xl px-5 py-3 font-bold shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {submitting ? "Submitting for review…" : "List in WTC"}
          </button>

          <p className="text-center text-xs text-white/40">
            Listings are reviewed before going live.
          </p>
        </div>
      </div>
    </form>
  );
}
