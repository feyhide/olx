import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51PuKWcKTcks8p0VLkIilbTclH9RjDFwZbUJIGjPeCAOkNsPCxEAcVJdmAcSroKdz5udgkMwQ0supyQ6hZXJHJA4g00Esv8WZUf");

export const stripeCheckout = async (req, res, next) => {
    try {
        const { products, total } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid product data' });
        }

        const lineItems = products.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.title,
                    description: `Size: ${item.selectedSize.country}:${item.selectedSize.size}, ${item.product.brand}, ${item.product.type}, ${item.product.sex}`, // Optional description
                    images: [item.product.imagesUrl[0]],
                },
                unit_amount: item.product.price * 100, 
            },
            quantity: item.quantity,
        }));


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            success_url: `http://localhost:5173/orderplaced`,
            cancel_url: `http://localhost:5173/ordererror`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
