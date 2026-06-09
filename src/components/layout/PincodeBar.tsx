"use client";

import { useState, useEffect } from "react";
import { X, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function PincodeBar() {
  const [open, setOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [savedPincode, setSavedPincode] = useState("");
  const [locationError, setLocationError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openModal = () => {
    setPincodeError("");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setPincodeError("");
  };

  const enableLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationError("");
        setSavedPincode("");
        closeModal();
      },
      () => setLocationError("Location permission denied."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const applyPincode = () => {
    if (pincode.length !== 6) {
      setPincodeError("Enter a valid 6-digit pincode");
      return;
    }
    setSavedPincode(pincode);
    setPincodeError("");
    closeModal();
  };

  return (
    <>
      <div className="fixed top-[calc(4rem+env(safe-area-inset-top))] md:top-[calc(4.5rem+env(safe-area-inset-top))] left-0 right-0 z-40 bg-[#ece8e2] border-b border-[#d8d2c8]">
        <Container className="!px-4 sm:!px-6 md:!px-8 lg:!px-10 xl:!px-12 py-1">
          <button
            type="button"
            onClick={openModal}
            className="text-[11px] sm:text-xs text-[#2a2a2a] leading-none hover:opacity-80 transition-opacity"
          >
            <span className="font-semibold">
              {savedPincode ? `Deliver to ${savedPincode}` : "Enter Pincode"}
            </span>
            <span> - </span>
            <span className="underline underline-offset-2">to check delivery</span>
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[70]"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-[calc(100%-2rem)] max-w-md bg-white shadow-xl"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-3 right-3 text-[#111] hover:opacity-70 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="p-4 sm:p-5 pt-10">
                <div className="flex items-center gap-3 bg-[#f3efe6] px-3 py-3 sm:px-4">
                  <Crosshair className="w-5 h-5 shrink-0 text-[#111]" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#111]">
                      Location is not enabled
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#555] mt-0.5">
                      Enable location for delivery estimate
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={enableLocation}
                    className="shrink-0 bg-[#111] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide px-4 py-2 hover:bg-[#333] transition-colors"
                  >
                    Enable
                  </button>
                </div>

                {locationError && (
                  <p className="text-center text-[11px] text-[#a0522d] mt-3">{locationError}</p>
                )}

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-[#ddd]" />
                  <span className="text-[10px] font-semibold text-[#888] tracking-widest">OR</span>
                  <div className="flex-1 h-px bg-[#ddd]" />
                </div>

                <label className="block text-[11px] font-bold uppercase tracking-wide text-[#111] mb-2">
                  Enter Pincode
                </label>
                <div className="relative border border-[#ccc]">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPincodeError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyPincode()}
                    placeholder=""
                    className="w-full px-3 py-3 pr-20 text-sm text-[#111] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyPincode}
                    className="absolute right-0 top-0 bottom-0 px-4 text-[11px] font-bold uppercase tracking-wide text-[#111] hover:bg-[#f5f5f5] transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {pincodeError && (
                  <p className="text-[11px] text-[#a0522d] mt-2">{pincodeError}</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
