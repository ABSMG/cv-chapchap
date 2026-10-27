const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const port = Number(process.env.PORT || 3000);
const frontendOrigin = process.env.FRONTEND_ORIGIN;

app.disable("x-powered-by");
app.use(helmet());

app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === frontendOrigin) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  }
}));

app.use(express.json({ limit: "20kb" }));

app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 60
}));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "cv-chapchap-api",
    payments: "disabled"
  });
});

app.post("/api/payments/initiate", (_req, res) => {
  res.status(503).json({
    ok: false,
    code: "PAYMENTS_NOT_CONFIGURED",
    message: "M-Pesa haijaunganishwa bado."
  });
});

app.post("/api/payments/webhook", (_req, res) => {
  res.status(501).json({
    ok: false,
    code: "WEBHOOK_NOT_IMPLEMENTED",
    message: "Uthibitishaji wa malipo bado haujaandaliwa."
  });
});

app.listen(port, () => {
  console.log(`CV ChapChap API listening on port ${port}`);
});
