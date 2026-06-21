import React, { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export const blacklistedUsers: {
  country?: string;
  city?: string;
  ips?: string[];
  browser?: string;
  device?: string;
  os?: string;
}[] = [
  // { country: "Kazakhstan" },
  // { country: "North Korea", city: "Pyongyang" },
  // { device: "iPhone", os: "iOS" },
  // { browser: "Mobile Safari", os: "iOS" },
];

const detectBrowserDeviceOs = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: result.browser.name || "unknown",
    device: result.device.model || "Desktop",
    os: result.os.name || "unknown",
  };
};

export const isUserBlacklisted = (
  country?: string,
  city?: string,
  ip?: string
): boolean => {
  const { browser, device, os } = detectBrowserDeviceOs();

  return blacklistedUsers.some((entry) => {
    if (
      (entry.country &&
        entry.country.toLowerCase() !== (country || "").toLowerCase()) ||
      (entry.city &&
        entry.city.toLowerCase() !== (city || "").toLowerCase()) ||
      (entry.browser &&
        entry.browser.toLowerCase() !== browser.toLowerCase()) ||
      (entry.device &&
        entry.device.toLowerCase() !== device.toLowerCase()) ||
      (entry.os && entry.os.toLowerCase() !== os.toLowerCase()) ||
      (entry.ips &&
        ip &&
        !entry.ips.some((prefix) => ip.startsWith(prefix)))
    ) {
      return false;
    }

    return true;
  });
};

interface CountryBlacklistProps {
  onAccessCheck?: (
    blocked: boolean,
    country: string | null,
    reason?: string | null
  ) => void;
}

const CountryBlacklist: React.FC<CountryBlacklistProps> = ({
  onAccessCheck,
}) => {
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockedReason, setBlockedReason] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let ip = localStorage.getItem("userIP") ?? "";
      let city = localStorage.getItem("userCity") ?? "";
      let country = localStorage.getItem("userCountry") ?? "";

      try {
        if (!ip) {
          const response = await fetch("https://get.geojs.io/v1/ip.json");

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          ip = data.ip;

          localStorage.setItem("userIP", ip);
        }

        if (!city || !country) {
          const response = await fetch(
            `https://get.geojs.io/v1/ip/geo/${ip}.json`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          city = data.city || "Unknown";
          country = data.country || "Unknown";

          localStorage.setItem("userCity", city);
          localStorage.setItem("userCountry", country);
        }

        setCountry(country);
        setCity(city);

        let isBlocked = false;
        let reason: string | null = null;

        if (isUserBlacklisted(country, city, ip)) {
          const { browser, device, os } = detectBrowserDeviceOs();

          isBlocked = true;
          reason = `Blocked by rule (country=${country}, city=${city}, browser=${browser}, device=${device}, os=${os})`;
        }

        setBlocked(isBlocked);
        setBlockedReason(reason);

        onAccessCheck?.(isBlocked, country, reason);
      } catch (err) {
        console.error("Failed to get location:", err);

        setError("Unable to detect location");
        setBlocked(false);
        setBlockedReason(null);

        onAccessCheck?.(false, null, null);
      }
    };

    fetchLocation();
  }, [onAccessCheck]);

  if (onAccessCheck) return null;

  if (error) {
    return <p>{error}</p>;
  }

  if (!country) {
    return <p>Checking location...</p>;
  }

  if (blocked) {
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>
        Access denied for {blockedReason} 🚫
      </div>
    );
  }

  return (
    <div style={{ color: "green", fontWeight: "bold" }}>
      Welcome from {city ? `${city}, ` : ""}
      {country} ✅
    </div>
  );
};

export default CountryBlacklist;
