import type { CompareResponse } from "../types/comparison";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

export class ApiError extends Error {
  readonly statusCode: number;
  readonly status: string;

  constructor(
    message: string,
    statusCode: number,
    status = "error",
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.status = status;
  }
}

function isCompareResponse(
  value: unknown,
): value is CompareResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CompareResponse>;

  return (
    typeof candidate.status === "string" &&
    typeof candidate.message === "string"
  );
}

export async function compareProduct(
  query: string,
): Promise<CompareResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
  } catch {
    throw new ApiError(
      "The comparison service is unavailable. Check that the backend is running and try again.",
      0,
      "network",
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ApiError(
      "The comparison service returned an unreadable response.",
      response.status,
    );
  }

  if (!response.ok) {
    const detail =
      payload &&
      typeof payload === "object" &&
      "detail" in payload
        ? payload.detail
        : undefined;

    const errorDetail =
      detail && typeof detail === "object"
        ? (detail as {
            message?: unknown;
            status?: unknown;
          })
        : undefined;

    throw new ApiError(
      typeof errorDetail?.message === "string"
        ? errorDetail.message
        : messageForHttpStatus(response.status),
      response.status,
      typeof errorDetail?.status === "string"
        ? errorDetail.status
        : "error",
    );
  }

  if (!isCompareResponse(payload)) {
    throw new ApiError(
      "The comparison service returned an unexpected response.",
      response.status,
    );
  }

  return payload;
}

function messageForHttpStatus(status: number): string {
  if (status === 422) {
    return "Please enter a valid product query.";
  }

  if (status === 503) {
    return "The comparison service is busy. Please try again in a moment.";
  }

  if (status === 504) {
    return "The comparison took too long. Please try again.";
  }

  if (status >= 500) {
    return "The comparison service encountered an error. Please try again.";
  }

  return "We could not complete this comparison.";
}