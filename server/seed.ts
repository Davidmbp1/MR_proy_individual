// server/seed.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Restaurant from './src/models/Restaurant';

dotenv.config();

async function seed() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Conectado a MongoDB para seeding');

    // Limpiar la colección "restaurants"
    await Restaurant.deleteMany({});
    console.log('Colección "restaurants" limpiada');

    // Usamos la misma cuenta conectada y el mismo producto/price para pruebas
    const commonStripeAccountId = 'acct_1QvMXxFYoNrl2xYX';
    const commonStripePriceId = 'price_1QvMXgFEbH7hc5eMjRnYv290';

    // Insertar datos de ejemplo para distintos establecimientos
    await Restaurant.create([
      // --- Miraflores ---
      {
        name: 'Ceviche House',
        region: 'Miraflores',
        cuisine: ['Peruvian', 'Seafood'],
        rating: 4.7,
        mainImage: 'https://example.com/ceviche-house.jpg',
        address: 'Av. Larco 123, Miraflores, Lima',
        priceRange: '$$',
        features: ['Outdoor Seating'],
        dietary: ['Vegan'],
        entryRequirements: ['Over 18'],
        goodFor: ['Couples'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.03, -12.125] },
        offers: [
          {
            title: 'Dinner 2x1',
            description: 'Buy one dinner get one free from 6pm-8pm',
            price: 25,
            originalPrice: 50,
            expiryDate: new Date('2025-10-15T20:00:00'),
            quantity: 20,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'La Mar',
        region: 'Miraflores',
        cuisine: ['Peruvian', 'Seafood'],
        rating: 4.5,
        mainImage: 'https://example.com/la-mar.jpg',
        address: 'Calle La Mar 770, Miraflores, Lima',
        priceRange: '$$',
        features: ['Bar', 'Group Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.028, -12.127] },
        offers: [
          {
            title: 'Lunch Special',
            description: '30% off lunch menu (12pm-3pm)',
            price: 20,
            originalPrice: 30,
            expiryDate: new Date('2025-12-31T15:00:00'),
            quantity: 10,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },

      // --- Barranco ---
      {
        name: 'Barranco Bites',
        region: 'Barranco',
        cuisine: ['Fusion', 'Peruvian'],
        rating: 4.1,
        mainImage: 'https://example.com/barranco-bites.jpg',
        address: 'Av. Grau 300, Barranco, Lima',
        priceRange: '$$',
        features: ['Live Music', 'Bar'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Bar',
        location: { type: 'Point', coordinates: [-77.02, -12.153] },
        offers: [
          {
            title: 'Happy Hour',
            description: '2x1 on cocktails from 7pm-9pm',
            price: 12,
            originalPrice: 24,
            expiryDate: new Date('2025-12-31T21:00:00'),
            quantity: 30,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'Bendito Café',
        region: 'Barranco',
        cuisine: ['Cafe', 'Desserts'],
        rating: 4.3,
        mainImage: 'https://example.com/bendito-cafe.jpg',
        address: 'Jr. Unión 150, Barranco, Lima',
        priceRange: '$',
        features: ['Pet Friendly'],
        dietary: ['Gluten-Free'],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Cafe',
        location: { type: 'Point', coordinates: [-77.022, -12.155] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- San Isidro ---
      {
        name: 'La Bistecca',
        region: 'San Isidro',
        cuisine: ['Italian', 'Grill'],
        rating: 4.4,
        mainImage: 'https://example.com/la-bistecca.jpg',
        address: 'Av. Camino Real 123, San Isidro, Lima',
        priceRange: '$$',
        features: ['Group Friendly', 'Buffet'],
        dietary: [],
        entryRequirements: ['Smart Casual'],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.032, -12.095] },
        offers: [
          {
            title: 'Buffet Discount',
            description: '25% off buffet lunch from 12pm-4pm',
            price: 30,
            originalPrice: 40,
            expiryDate: new Date('2025-12-31T16:00:00'),
            quantity: 20,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'Osso Carnicería',
        region: 'San Isidro',
        cuisine: ['Steakhouse', 'Grill'],
        rating: 4.6,
        mainImage: 'https://example.com/osso.jpg',
        address: 'Calle Los Libertadores 200, San Isidro, Lima',
        priceRange: '$$$',
        features: ['Bar', 'Outdoor Seating'],
        dietary: [],
        entryRequirements: ['Over 18'],
        goodFor: ['Couples'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.034, -12.096] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- Chorrillos ---
      {
        name: 'Chorrillos Fish Market',
        region: 'Chorrillos',
        cuisine: ['Seafood', 'Peruvian'],
        rating: 4.2,
        mainImage: 'https://example.com/chorrillos-fish.jpg',
        address: 'Malecón Grau 500, Chorrillos, Lima',
        priceRange: '$$',
        features: ['Ocean View'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.031, -12.190] },
        offers: [
          {
            title: 'Morning Catch',
            description: '20% off ceviche before 12pm',
            price: 12,
            originalPrice: 15,
            expiryDate: new Date('2025-12-31T12:00:00'),
            quantity: 15,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'La Caleta',
        region: 'Chorrillos',
        cuisine: ['Peruvian', 'Fusion'],
        rating: 4.1,
        mainImage: 'https://example.com/la-caleta.jpg',
        address: 'Playa Agua Dulce, Chorrillos, Lima',
        priceRange: '$$',
        features: ['Outdoor Seating', 'Pet Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.033, -12.192] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- La Molina ---
      {
        name: 'El Pichito',
        region: 'La Molina',
        cuisine: ['Criolla', 'Peruvian'],
        rating: 4.3,
        mainImage: 'https://example.com/el-pichito.jpg',
        address: 'Av. La Fontana 123, La Molina, Lima',
        priceRange: '$$',
        features: ['Group Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-76.994, -12.086] },
        offers: [
          {
            title: 'Comida Criolla Deal',
            description: '30% off from 1pm-3pm on criolla dishes',
            price: 18,
            originalPrice: 26,
            expiryDate: new Date('2025-11-01T15:00:00'),
            quantity: 10,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'La Tranquera',
        region: 'La Molina',
        cuisine: ['Steakhouse'],
        rating: 4.0,
        mainImage: 'https://example.com/la-tranquera.jpg',
        address: 'Calle Los Fresnos 600, La Molina, Lima',
        priceRange: '$$',
        features: ['Bar'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-76.993, -12.088] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- Surco ---
      {
        name: 'Surco Steakhouse',
        region: 'Surco',
        cuisine: ['Grill', 'Steakhouse'],
        rating: 4.5,
        mainImage: 'https://example.com/surco-steak.jpg',
        address: 'Av. Primavera 400, Surco, Lima',
        priceRange: '$$',
        features: ['Bar', 'Pet Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.028, -12.106] },
        offers: [
          {
            title: '2x1 on Ribs',
            description: 'Buy one portion of ribs, get another free (6pm-8pm)',
            price: 30,
            originalPrice: 60,
            expiryDate: new Date('2025-12-31T20:00:00'),
            quantity: 10,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'Pastas del Sur',
        region: 'Surco',
        cuisine: ['Italian'],
        rating: 4.2,
        mainImage: 'https://example.com/pastas-del-sur.jpg',
        address: 'Calle Caminos del Inca 200, Surco, Lima',
        priceRange: '$$',
        features: ['Group Friendly'],
        dietary: ['Gluten-Free'],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.027, -12.108] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- Callao ---
      {
        name: 'Callao Seafood',
        region: 'Callao',
        cuisine: ['Seafood'],
        rating: 4.3,
        mainImage: 'https://example.com/callao-seafood.jpg',
        address: 'Av. Grau 200, Callao',
        priceRange: '$$',
        features: ['Ocean View'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.158, -12.058] },
        offers: [
          {
            title: 'Marinera Evening',
            description: '10% off fish dishes from 5pm-8pm',
            price: 18,
            originalPrice: 20,
            expiryDate: new Date('2025-10-01T20:00:00'),
            quantity: 10,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'Mar Brava',
        region: 'Callao',
        cuisine: ['Peruvian', 'Seafood'],
        rating: 4.1,
        mainImage: 'https://example.com/mar-brava.jpg',
        address: 'La Punta, Callao',
        priceRange: '$$',
        features: [],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Couples'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.159, -12.060] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- San Borja ---
      {
        name: 'Anticucheria SB',
        region: 'San Borja',
        cuisine: ['Peruvian', 'Anticuchos'],
        rating: 4.4,
        mainImage: 'https://example.com/anticucheria-sb.jpg',
        address: 'Av. San Borja Sur 123, San Borja, Lima',
        priceRange: '$',
        features: ['Group Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-76.985, -12.095] },
        offers: [
          {
            title: 'Anticuchos 2x1',
            description: 'Get 2 anticucho portions for the price of 1 (6pm-8pm)',
            price: 15,
            originalPrice: 30,
            expiryDate: new Date('2025-12-31T20:00:00'),
            quantity: 10,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'Casa Andina Café',
        region: 'San Borja',
        cuisine: ['Cafe', 'Desserts'],
        rating: 4.2,
        mainImage: 'https://example.com/casa-andina-cafe.jpg',
        address: 'Av. Javier Prado 500, San Borja, Lima',
        priceRange: '$$',
        features: ['Bar'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Cafe',
        location: { type: 'Point', coordinates: [-76.986, -12.096] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      },

      // --- Lince ---
      {
        name: 'Lince Ramen',
        region: 'Lince',
        cuisine: ['Japanese', 'Asian'],
        rating: 4.3,
        mainImage: 'https://example.com/lince-ramen.jpg',
        address: 'Av. Arequipa 1500, Lince, Lima',
        priceRange: '$$',
        features: ['Pet Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Friends'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.032, -12.087] },
        offers: [
          {
            title: 'Ramen Hour',
            description: '20% off ramen bowls from 5pm-7pm',
            price: 12,
            originalPrice: 15,
            expiryDate: new Date('2025-12-31T19:00:00'),
            quantity: 15,
            status: 'active',
            stripePriceId: commonStripePriceId
          }
        ],
        stripeAccountId: commonStripeAccountId
      },
      {
        name: 'El Carbone',
        region: 'Lince',
        cuisine: ['Grill', 'Sandwiches'],
        rating: 4.1,
        mainImage: 'https://example.com/el-carbone.jpg',
        address: 'Jr. Risso 200, Lince, Lima',
        priceRange: '$',
        features: [],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Families'],
        venueType: 'Restaurant',
        location: { type: 'Point', coordinates: [-77.033, -12.088] },
        offers: [],
        stripeAccountId: commonStripeAccountId
      }
    ]);

    console.log('Datos de ejemplo insertados');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
