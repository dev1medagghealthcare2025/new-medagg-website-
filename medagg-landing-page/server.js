import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import fetch from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 3001

// CORS for Vite dev server
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  try {
    const amountInRupees = String(req.body?.amount || '').trim()
    if (!amountInRupees || isNaN(Number(amountInRupees))) {
      return res.status(400).json({ error: 'Amount is required (in INR).' })
    }

    const key_id = process.env.RAZORPAY_KEY_ID
    const key_secret = process.env.RAZORPAY_KEY_SECRET
    if (!key_id || !key_secret) {
      return res.status(500).json({ error: 'Razorpay keys not configured on server' })
    }
    // Log masked key id prefix to confirm .env is loaded
    console.log('create-order using key:', `${key_id.slice(0, 8)}****************`)

    const instance = new Razorpay({ key_id, key_secret })
    const order = await instance.orders.create({
      receipt: 'rcptid_' + Date.now(),
      amount: parseInt(amountInRupees, 10) * 100, // paise
      currency: 'INR',
      payment_capture: 1
    })

    if (!order?.id) return res.status(500).json({ error: 'Failed to create order.' })

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id
    })
  } catch (err) {
    // Razorpay SDK error often under err.error
    const code = err?.error?.code || err?.code
    const description = err?.error?.description || err?.description || err?.message
    console.error('create-order error:', code || '', description || err)
    res.status(500).json({ error: description || 'Server error creating order', code: code || 'SERVER_ERROR' })
  }
})

// Verify signature and forward to Google Sheets
app.post('/api/submit', async (req, res) => {
  try {
    const {
      name = '', email = '', phone = '', organization = '', designation = '', city = '',
      razorpay_payment_id, razorpay_order_id, razorpay_signature
    } = req.body || {}

    if (!name || !email || !phone) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' })
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET
    if (!key_secret) {
      return res.status(500).json({ status: 'error', message: 'Server not configured' })
    }

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ status: 'error', message: 'Missing Razorpay fields' })
    }

    const hmac = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (hmac !== razorpay_signature) {
      return res.status(400).json({ status: 'error', message: 'Payment verification failed. Please try again.' })
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL
    if (!GOOGLE_SCRIPT_URL) {
      return res.status(500).json({ status: 'error', message: 'Google Script URL not configured' })
    }

    const formData = {
      name,
      email,
      phone,
      organization,
      designation,
      city,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id
    }

    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!resp.ok) {
      return res.status(500).json({ status: 'error', message: 'Failed to submit registration. Please try again.' })
    }

    res.json({ status: 'success', message: 'Thank you, your registration is done' })
  } catch (err) {
    console.error('submit error:', err?.message || err)
    res.status(500).json({ status: 'error', message: 'Server error submitting registration', detail: err?.message || String(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Razorpay backend running on http://localhost:${PORT}`)
})
