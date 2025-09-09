export interface UserStatus {
  state: "online" | "offline";
  last_changed: any; // Firestore Timestamp
  last_active?: any;
  browser?: string;
  os?: string;
  device?: string;
  ip?: string;
  city?: string;
  country?: string;
}
