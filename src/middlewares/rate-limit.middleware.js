import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100,                // max 100 request / IP
  standardHeaders: true,   
  legacyHeaders: false,    
  message: {
    success: false,
    message: "Too Many Request !!!",
  },
})

export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 20,                // max 100 request / IP
  message: {
    success: false,
    message: "Too Many Request Write Operation !!!",
  },
})