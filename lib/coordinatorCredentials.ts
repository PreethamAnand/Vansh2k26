export interface CoordinatorCredential {
  eventSlug: string;
  eventName: string;
  coordinatorName: string;
  phone?: string;
  username: string;
  password: string;
}

const isCoordinatorCredential = (value: unknown): value is CoordinatorCredential => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.eventSlug === "string" &&
    typeof item.eventName === "string" &&
    typeof item.coordinatorName === "string" &&
    typeof item.username === "string" &&
    typeof item.password === "string" &&
    (typeof item.phone === "undefined" || typeof item.phone === "string")
  );
};

export const getCoordinatorCredentials = (): CoordinatorCredential[] => {
  const raw = process.env.COORDINATOR_CREDENTIALS_JSON;

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCoordinatorCredential);
  } catch {
    return [];
  }
};
