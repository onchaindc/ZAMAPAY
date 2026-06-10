export function getFriendlyErrorMessage(
  error: unknown,
  fallback: "network" | "contract" | "generic" = "generic"
) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (
    message.includes("eth_getlogs") ||
    message.includes("queryfilter") ||
    message.includes("block range") ||
    message.includes("response size exceeded")
  ) {
    return "";
  }

  if (
    message.includes("user rejected") ||
    message.includes("rejected the request") ||
    message.includes("denied")
  ) {
    return "Request cancelled.";
  }

  if (
    message.includes("missing revert data") ||
    message.includes("call_exception") ||
    message.includes("execution reverted") ||
    message.includes("revert")
  ) {
    return "Transaction failed. Check your balance.";
  }

  if (
    message.includes("rpc") ||
    message.includes("network") ||
    message.includes("timeout") ||
    message.includes("fetch") ||
    message.includes("bad gateway")
  ) {
    return "Network error. Please try again.";
  }

  if (fallback === "contract") {
    return "Transaction failed. Check your balance.";
  }

  if (fallback === "network") {
    return "Network error. Please try again.";
  }

  return "Something went wrong. Please try again.";
}
