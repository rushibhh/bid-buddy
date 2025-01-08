const helper = {
  getInitials: (value: string) => {
    if (!value) return "";
    const parts = value.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return parts
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  },
  convertCentsToDollars(cents: number): string {
    if (isNaN(cents)) {
      throw new Error("Invalid input: cents must be a number.");
    }
    return `$${(cents / 100).toFixed(2)}`;
  },
};
export default helper;
