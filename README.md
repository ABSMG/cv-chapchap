# CV ChapChap

Responsive Swahili CV builder with live preview, three templates and print-to-PDF support.

## Frontend
Open `index.html` in a modern browser to preview it. For local hosting, run a static server from the project root.

## Create the GitHub repository
1. Sign in to GitHub and open https://github.com/new
2. Repository name: `cv-chapchap`
3. Choose **Public** only if you are comfortable making the frontend source public. Never store customer data or credentials here.
4. Select **Add a README file**, then create the repository.
5. Add the project files from this ZIP to the repository root. If GitHub created a README, replace it with this one if desired.
6. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. GitHub Pages serves the frontend only.

## Payment integration status — important
**Real M-Pesa payments are not enabled in this starter.** The API intentionally fails closed until the provider-specific adapter, callback signature verification and persistent order database are implemented and tested. It does not invent a business number, API URL, credentials, or claim a payment succeeded.

The backend folder is an initial security scaffold, not a production payment gateway. It has basic HTTP security headers, CORS, rate limiting, and environment-variable placeholders. Orders are not persisted, and the payment endpoints intentionally return 501/503 rather than pretending to process transactions.

### Recommended official path for Vodacom Tanzania M-Pesa
1. Start with the official [Vodacom Tanzania M-Pesa business onboarding](https://business.m-pesa.com/vodacom-tanzania/business-onboarding-tanzania/).
2. Complete merchant/business onboarding and receive the business account/short code and approval required for your use case.
3. Register in the official [M-Pesa Developer Portal](https://business.m-pesa.com/developers/), select the approved product, and use the provider's own documentation and sandbox credentials.
4. Implement the provider-specific server adapter from those docs. Verify callbacks/signatures, amount, currency, merchant reference, order ID, and transaction status on the server. Make the webhook idempotent. Never accept `paid: true` from browser JavaScript.
5. Use a persistent database for orders and audit events; use HTTPS; store secrets only in your backend host's environment variables.
6. Test successful, failed, cancelled, duplicate, forged, and delayed callbacks in sandbox before requesting production access.

## Deploy frontend and backend separately
- **Frontend:** GitHub Pages (static only).
- **Backend:** a Node.js hosting service that supports environment variables and HTTPS. Configure `FRONTEND_ORIGIN` to the exact published frontend origin.
- GitHub Pages does **not** run the Node server; do not put the backend API keys in `index.html`, GitHub files, or browser storage.

## PDF behavior
The preview can be printed with the browser's print dialog. Choose “Save as PDF”. The current preview export is not gated by a verified paid order yet; do not advertise paid-only downloads until the provider integration and server-side download gate are complete.

## Privacy
The frontend does not transmit or persist CV details. The user should avoid entering unnecessary sensitive information, particularly on shared devices.
