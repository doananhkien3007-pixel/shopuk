const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51OKechEEzgIIxf719BNUpXBCOX6cgL2nLE0Q35PmCafQt6GF7j4Fi6TBpCUwLbqATQphoZ1DLoyW8w0yCwdUeOYb00xwDN6wHl');

async function test() {
  const sessions = await stripe.checkout.sessions.list({ limit: 1 });
  if (sessions.data.length > 0) {
    const s = sessions.data[0];
    console.log(Object.keys(s).filter(k => k.includes('shipping') || k.includes('customer')));
  }
}
test();
