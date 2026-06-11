const isProd = process.env.NODE_ENV === "production";

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: isProd, // only secure cookies over HTTPS in production
  sameSite: isProd ? "none" : "lax", // allow cross-site for dev/prod as needed
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

