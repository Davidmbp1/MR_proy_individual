// server/seed.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Restaurant from './src/models/Restaurant';

dotenv.config();

async function seed() {
  try {
    // Conectar a Mongo
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Conectado a MongoDB para seeding');

    // Limpia la colección "restaurants"
    await Restaurant.deleteMany({});
    console.log('Colección "restaurants" limpiada');

    // Inserta datos de ejemplo
    await Restaurant.create([
      {
        name: 'thirty7',
        region: 'London',
        cuisine: ['British', 'French', 'Fusion'],
        rating: 4.5,
        mainImage: 'https://example.com/thirty7.jpg',
        address: 'Covent Garden, London',
        priceRange: '$$',
        features: ['Live Music', 'Outdoor Seating'],
        dietary: ['Vegetarian'],
        entryRequirements: ['Over 18'],
        goodFor: ['Couples', 'Groups'],
        venueType: 'Restaurant',
        offers: [
          {
            title: 'Early Bird Dining',
            description: '50% off the food bill from 5pm to 6pm',
            price: 20,
            originalPrice: 40,
            expiryDate: new Date('2025-12-31T23:59:59'),
            quantity: 10,
            status: 'active'
          }
        ]
      },
      {
        name: 'Maroto',
        region: 'London',
        cuisine: ['Brazilian'],
        rating: 4.2,
        mainImage: 'https://example.com/maroto.jpg',
        address: 'Mayfair, London',
        priceRange: '$$',
        features: ['Pet Friendly'],
        dietary: ['Gluten-Free'],
        entryRequirements: ['Smart Casual'],
        goodFor: ['Groups'],
        venueType: 'Restaurant',
        offers: [
          {
            title: 'Lunch Special',
            description: '30% off lunch menu',
            price: 15,
            originalPrice: 25,
            expiryDate: new Date('2025-11-01T12:00:00'),
            quantity: 5,
            status: 'active'
          }
        ]
      },
      {
        name: 'Café Pacífico',
        region: 'London',
        cuisine: ['Mexican'],
        rating: 4.3,
        mainImage: 'https://example.com/cafe-pacifico.jpg',
        address: 'Covent Garden, London',
        priceRange: '$$',
        features: ['Bar', 'Group Friendly'],
        dietary: [],
        entryRequirements: [],
        goodFor: ['Groups'],
        venueType: 'Bar',
        offers: []
      },
      {
        name: 'Ceviche House',
        region: 'Lima',
        cuisine: ['Peruvian', 'Seafood'],
        rating: 4.7,
        mainImage: 'https://example.com/ceviche-house.jpg',
        address: 'Miraflores, Lima',
        priceRange: '$$',
        features: ['Outdoor Seating'],
        dietary: ['Vegan'],
        entryRequirements: ['Over 18'],
        goodFor: ['Couples'],
        venueType: 'Restaurant',
        offers: [
          {
            title: 'Dinner 2x1',
            description: 'Buy one dinner get one free from 6pm-8pm',
            price: 25,
            originalPrice: 50,
            expiryDate: new Date('2025-10-15T20:00:00'),
            quantity: 20,
            status: 'active'
          }
        ]
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
