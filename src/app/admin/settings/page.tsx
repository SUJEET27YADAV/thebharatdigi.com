'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'The Bharat Digi',
    siteEmail: 'admin@thebharatdigi.com',
    sitePhone: '+91 XXXXXXXXXX',
    businessDescription: 'Web design and development service',
    adminName: 'Admin',
    adminEmail: 'admin@thebharatdigi.com',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1
          className="text-3xl font-bold mb-1"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Settings
        </h1>
        <p
          className="text-sm"
          style={{
            color: '#314158',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          Manage your site and admin settings
        </p>
      </div>

      {saved && (
        <div
          className="p-4 rounded text-sm"
          style={{
            backgroundColor: '#00c75820',
            color: '#00c758',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          ✓ Settings saved successfully!
        </div>
      )}

      {/* Site Settings */}
      <div
        className="p-6 rounded border"
        style={{
          backgroundColor: '#0f172b',
          borderColor: '#444444',
        }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Site Information
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Site Name', field: 'siteName' },
            { label: 'Site Email', field: 'siteEmail' },
            { label: 'Site Phone', field: 'sitePhone' },
            { label: 'Business Description', field: 'businessDescription' },
          ].map((item) => (
            <div key={item.field}>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: '#314158',
                  fontFamily: 'Geist, sans-serif',
                }}
              >
                {item.label}
              </label>
              <input
                type="text"
                value={settings[item.field as keyof typeof settings]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                className="w-full px-4 py-2 rounded text-sm border focus:outline-none"
                style={{
                  backgroundColor: '#1d293d',
                  borderColor: '#444444',
                  color: '#ffffff',
                  fontFamily: 'Geist, sans-serif',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Admin Settings */}
      <div
        className="p-6 rounded border"
        style={{
          backgroundColor: '#0f172b',
          borderColor: '#444444',
        }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Admin Profile
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Admin Name', field: 'adminName' },
            { label: 'Admin Email', field: 'adminEmail' },
          ].map((item) => (
            <div key={item.field}>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: '#314158',
                  fontFamily: 'Geist, sans-serif',
                }}
              >
                {item.label}
              </label>
              <input
                type="text"
                value={settings[item.field as keyof typeof settings]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                className="w-full px-4 py-2 rounded text-sm border focus:outline-none"
                style={{
                  backgroundColor: '#1d293d',
                  borderColor: '#444444',
                  color: '#ffffff',
                  fontFamily: 'Geist, sans-serif',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: '#ac4bff',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Save size={18} />
        Save Settings
      </button>
    </div>
  );
}
