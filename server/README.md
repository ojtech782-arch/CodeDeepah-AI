GlueBlue dev server

This development server provides mock and production-ready endpoints (Paystack) used by the GlueBlue Expo client in this repo.

Environment
- Create a `.env` file in this folder. Use `.env.example` as a starting point.
- Set `PAYSTACK_SECRET_KEY` to your Paystack secret key for production.

Start server

nohup npm start >/tmp/glueblue-server.log 2>&1 &

Endpoints
- POST /payments/paystack/create -> initialize transaction (calls Paystack)
- POST /payments/paystack/verify -> verify transaction (calls Paystack)
- POST /payments/paystack/recipient -> create transfer recipient
- POST /payments/paystack/transfer -> initiate transfer
- POST /payments/paystack/virtual_account -> create virtual account
- POST /payments/paystack/webhook -> Paystack webhook (validates signature)

Security
- Keep `PAYSTACK_SECRET_KEY` secret. Use server-side only.
- This server is for development; do not deploy as-is to production.
