// app/admin/settings/page.jsx
"use client";
import { Suspense } from "react";
import SettingsPageContent from "./SettingsPageContent.jsx";

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading settings...</div>}>
      <SettingsPageContent />
    </Suspense>
  );
}