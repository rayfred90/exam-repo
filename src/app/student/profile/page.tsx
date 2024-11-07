'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  studentId: string;
}

interface NotificationSettings {
  email: boolean;
  browser: boolean;
  assessmentReminders: boolean;
  resultNotifications: boolean;
  systemUpdates: boolean;
}

interface PrivacySettings {
  showProfile: boolean;
  showResults: boolean;
  showCertificates: boolean;
}

export default function StudentProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/avatars/default.png',
    role: 'Student',
    studentId: 'STU123456',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    browser: true,
    assessmentReminders: true,
    resultNotifications: true,
    systemUpdates: false,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    showProfile: true,
    showResults: false,
    showCertificates: true,
  });

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting: keyof PrivacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* Basic Information */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Basic Information</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-secondary">
              <Image
                src={profile.avatar}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button className="btn btn-secondary w-full mt-4">
              Change Photo
            </button>
          </div>
          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(0,0%,40%)]">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(0,0%,40%)]">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(0,0%,40%)]">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(0,0%,40%)]">Student ID</label>
                <input
                  type="text"
                  value={profile.studentId}
                  readOnly
                  className="input mt-1 w-full bg-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
          <div className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[hsl(0,0%,40%)]">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
          <div className="space-y-4">
            {Object.entries(privacySettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[hsl(0,0%,40%)]">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePrivacyChange(key as keyof PrivacySettings)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support and Resources */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Support and Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Study Resources</h3>
            <p className="text-[hsl(0,0%,40%)] mb-4">Access study materials and guides</p>
            <Link href="/student/resources" className="btn btn-primary w-full">
              View Resources
            </Link>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">FAQs</h3>
            <p className="text-[hsl(0,0%,40%)] mb-4">Find answers to common questions</p>
            <Link href="/student/faqs" className="btn btn-primary w-full">
              View FAQs
            </Link>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-[hsl(0,0%,40%)] mb-4">Contact our support team</p>
            <Link href="/student/support" className="btn btn-primary w-full">
              Get Help
            </Link>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}
