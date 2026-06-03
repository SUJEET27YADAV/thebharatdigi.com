"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminAuthContext";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { user, loading: authLoading, refetch } = useAdmin();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    department: "",
    avatar_url: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        department: user.department || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          bio: form.bio,
          department: form.department,
          avatar_url: form.avatar_url,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully");
        refetch();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-160px)] text-[#314158] dark:text-white">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-[#314158] dark:text-gray-400">
          Manage your admin profile
        </p>
      </div>

      {/* Admin Profile */}
      <div className="p-6 rounded border border-[#444444] bg-slate-300 dark:bg-[#0f172b]">
        <h2 className="text-lg font-bold mb-4">Admin Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] focus:outline-none bg-gray-200 dark:bg-[#1d293d] placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] bg-gray-300 dark:bg-[#1d293d]/50 text-gray-500 cursor-not-allowed placeholder:text-gray-500"
            />
            <p className="text-xs text-[#314158] dark:text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Phone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 99999 99999"
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] focus:outline-none bg-gray-200 dark:bg-[#1d293d] placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Department
            </label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
              placeholder="e.g. Engineering, Design"
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] focus:outline-none bg-gray-200 dark:bg-[#1d293d] placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
              placeholder="A short description about yourself"
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] focus:outline-none bg-gray-200 dark:bg-[#1d293d] resize-none placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#314158] dark:text-gray-500">
              Avatar URL
            </label>
            <input
              type="url"
              value={form.avatar_url}
              onChange={(e) => handleChange("avatar_url", e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2 rounded text-sm border border-[#444444] focus:outline-none bg-gray-200 dark:bg-[#1d293d] placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded font-medium transition-opacity hover:opacity-90 disabled:opacity-60 bg-[#ac4bff] text-white cursor-pointer disabled:cursor-not-allowed"
      >
        {saving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
