import DownloadsIndex from "@/components/profile/downloads/DownloadsIndex";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="overflow-hidden bg-greynormal p-6 rounded-2xl border border-secprimary">
      <DownloadsIndex downloads={null} pagination={null} current_page={1} />
    </div>
  );
}
