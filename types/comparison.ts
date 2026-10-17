
export type ComparisonStatus =
  | "ok"
  | "invalid_query"
  | "unsupported_category"
  | "no_results"
  | "timeout"
  | "busy"
  | "error";

export interface Offer {
  site_name: string;
  site_key: string;
  tier: "retailer" | "marketplace";
  source_type: "retailer" | "marketplace";
  product_name: string;
  url: string;
  image: string | null;
  price: number;
  regular_price: number | null;
  in_stock: boolean | null;
  verified: boolean;
  specs_verified: boolean;
  flags: string[];
}

export interface ComparisonGroup {
  variant_key: string;
  label: string;
  offers: Offer[];
  best_offer: Offer | null;
  price_min: number | null;
  price_max: number | null;
  spread_amount: number | null;
  spread_percent: number | null;
  is_comparable: boolean;
}

export interface SiteStatus {
  name: string;
  status: "ok" | "empty" | "error";
  found_count: number;
  elapsed_seconds: number | null;
  message: string;
}

export interface ComparisonResult {
  query: string;
  groups: ComparisonGroup[];
  site_status: SiteStatus[];
  warnings: string[];
  summary: string;
  generated_at: string;
}

export interface CompareResponse {
  status: ComparisonStatus;
  message: string;
  comparison: ComparisonResult | null;
  elapsed_seconds: number;
}
