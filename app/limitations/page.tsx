"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LimitationsPage() {
  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/methods/#limitations`);
  }, []);

  return <p><Link href="/methods#limitations">Continue to methods and limitations.</Link></p>;
}
