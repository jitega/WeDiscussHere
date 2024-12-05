const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const port = 3000;

// Razorpay instance with your Key and Secret
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

app.use(express.json());

// Route to create order
app.post('/create-order', (req, res) => {
  const amount = req.body.amount; // Amount in paise (500 paise = 5 INR)

  const options = {
    amount: amount, // amount in paise
    currency: "INR",
    receipt: "order_rcptid_11", // You can generate unique receipt ID
  };

  razorpay.orders.create(options, function(err, order) {
    if (err) {
      return res.status(500).send({ message: "Failed to create order", error: err });
    }
    res.json({
      order_id: order.id,
      amount: order.amount
    });
  });
});

// Serve the quiz page and other static content (example)
app.use(express.static('public')); // Serve static files like quiz.html

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
