const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path accordingly

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/shopgiay', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Thêm data user 
//Cách chạy 
// Sample data
const sampleUsers = [
  {
    username: 'tainguyen',
    email: 'tainguyen@example.com',
    password: 'tainguyen',
    isAdmin: true,
    // phone: 1234567890,
    // address: '123 Main St',
    // avatar: 'url-to-avatar-image',
    // city: 'Example City',
  },
  // Add more sample data as needed
];

// Seed database function
async function seedDatabase() {
  try {
    // Remove existing data
    await User.deleteMany();

    // Insert sample data
    await User.insertMany(sampleUsers);

    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Run the seeding function
seedDatabase();
