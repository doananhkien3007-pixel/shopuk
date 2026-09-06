import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // If there is no real Stripe Secret Key, mock the successful creation 
    // to allow demonstration without needing actual Stripe setup right away
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
      console.log('[MOCK] Creating mock checkout session for items:', items.length);
      return NextResponse.json({ url: `${origin}/checkout/success?session_id=mock_session_123` });
    }

    const lineItems = items.map((item: any) => {
      // Stripe's servers cannot download images from localhost.
      // We use a public placeholder for local testing so the UI still shows an image.
      const isLocalhost = origin.includes('localhost');
      const imageUrl = isLocalhost 
        ? 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300'
        : (item.image?.startsWith('http') ? item.image : `${origin}${item.image}`);
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: `Size: ${item.size} - Màu: ${item.color}`,
            images: [imageUrl],
          },
          unit_amount: Math.round(item.priceNum / 100), // convert 850000 -> 8500 pence ($85.00)
        },
        quantity: item.quantity,
      };
    });

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.priceNum * item.quantity), 0);
    const isFreeShipping = totalAmount >= 500000; // >= $50.00

    const shipping_options = isFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 0, currency: 'usd' },
              display_name: 'Free Standard Delivery (Over $50)',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 3 },
                maximum: { unit: 'business_day', value: 5 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 500, currency: 'usd' },
              display_name: 'Express Delivery',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 2 },
              },
            },
          }
        ]
      : [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 300, currency: 'usd' },
              display_name: 'Standard Delivery',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 3 },
                maximum: { unit: 'business_day', value: 5 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 500, currency: 'usd' },
              display_name: 'Express Delivery',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 2 },
              },
            },
          }
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'afterpay_clearpay'],
      line_items: lineItems,
      mode: 'payment',
      ui_mode: 'embedded_page',
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      locale: 'en',
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['GB', 'VN', 'US'],
      },
      shipping_options: shipping_options as any,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
