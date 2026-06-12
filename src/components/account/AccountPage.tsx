"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, LogOut, Mail, Pencil, Phone, User as UserIcon, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isPhoneOnlyUser } from "@/lib/dummy-auth";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full min-h-[44px] px-4 border border-[#e5e5e5] bg-white text-sm text-[#111111] placeholder:text-[#aaaaaa] focus:outline-none focus:border-[#111111] rounded-sm";

function getDisplayName(user: { name?: string; phone?: string }) {
  if (user.name && !user.name.startsWith("+91 ")) return user.name;
  if (user.phone) return `+91 ${user.phone}`;
  return user.name || "GILZOD Member";
}

function getDisplayEmail(user: { email: string }) {
  return isPhoneOnlyUser(user) ? "" : user.email;
}

export function AccountPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { user, isReady, updateUser, logout } = useAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  useEffect(() => {
    if (!user) return;
    setName(getDisplayName(user) === `+91 ${user.phone}` ? "" : user.name || "");
    setEmail(getDisplayEmail(user));
    setPhone(user.phone || "");
    setAvatar(user.avatar || "");
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const startEdit = () => {
    if (!user) return;
    setName(user.name && !user.name.startsWith("+91 ") ? user.name : "");
    setEmail(getDisplayEmail(user));
    setPhone(user.phone || "");
    setAvatar(user.avatar || "");
    setError("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result || ""));
    reader.readAsDataURL(file);
    setError("");
  };

  const saveProfile = () => {
    const trimmedPhone = phone.replace(/\D/g, "").slice(-10);
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (trimmedPhone && trimmedPhone.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    updateUser({
      name: trimmedName || (trimmedPhone ? `+91 ${trimmedPhone}` : user?.name),
      phone: trimmedPhone || user?.phone,
      email: trimmedEmail || user?.email || `${trimmedPhone || "user"}@gilzod.phone`,
      avatar: avatar || undefined,
    });

    setEditing(false);
    setError("");
  };

  if (!isReady || !user) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  const displayName = getDisplayName(user);
  const displayEmail = getDisplayEmail(user);

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#666666] hover:text-[#111111] text-xs uppercase tracking-[0.15em] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111]">
            My Account
          </h1>
          {!editing && (
            <button
              type="button"
              onClick={startEdit}
              aria-label="Edit profile"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#666666] hover:text-[#111111] hover:border-[#111111] transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="bg-white border border-[#e5e5e5] p-6 space-y-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {editing ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] overflow-hidden flex items-center justify-center">
                    {avatar ? (
                      <Image src={avatar} alt="Profile" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <UserIcon className="w-8 h-8 text-[#666666]" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-md"
                    aria-label="Change photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-[10px] uppercase tracking-[0.12em] text-[#666666] hover:text-[#111111]"
                >
                  Update Photo
                </button>
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="form-label">Gmail / Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="form-label">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 border border-[#e5e5e5] bg-[#fafafa] text-sm text-[#666666] rounded-sm shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit number"
                    className={inputClass}
                  />
                </div>
              </div>

              {error && <p className="text-red-600 text-xs">{error}</p>}

              <div className="flex gap-3 pt-2">
                <Button variant="primary" className="flex-1" onClick={saveProfile}>
                  Save
                </Button>
                <Button variant="secondary" className="flex-1" onClick={cancelEdit}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] overflow-hidden flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <Image src={user.avatar} alt="Profile" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <UserIcon className="w-6 h-6 text-[#666666]" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[#111111] text-lg font-medium truncate">{displayName}</p>
                {displayEmail && (
                  <p className="text-[#666666] text-sm flex items-center gap-1.5 mt-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{displayEmail}</span>
                  </p>
                )}
                {user.phone && (
                  <p className="text-[#666666] text-sm flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    +91 {user.phone}
                  </p>
                )}
              </div>
            </div>
          )}

          {!editing && (
            <div className="border-t border-[#e5e5e5] pt-5 space-y-3">
              <Button variant="secondary" href="/track-order" className="w-full">
                Track Orders
              </Button>
              <Button variant="secondary" href="/#collection" className="w-full">
                Continue Shopping
              </Button>
              <Button
                variant="ghost"
                className="w-full text-red-500 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
