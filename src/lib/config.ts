// Config constants from environment variables
export const PHONE_CONTACT = process.env.NEXT_PUBLIC_PHONE_CONTACT || "0974326036";

// Social links
export const FACEBOOK_LINK = "https://www.facebook.com/share/1AmffpNi2h/?mibextid=wwXIfr";
export const ZALO_LINK = "https://zalo.me/+84974326036";

// Format phone for display (e.g., "0365 614 778")
export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
};

// Format phone for tel: link
export const telLink = (phone: string) => `tel:${phone}`;

// Format phone for Zalo link
export const zaloLink = (phone: string) => `https://zalo.me/${phone}`;
