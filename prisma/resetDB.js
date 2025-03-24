require('dotenv').config();
const prisma = require('../configs/prisma');

async function resetDatabase() {
  try {
    await prisma.$transaction([
      // Delete tables with foreign keys to Booking first
      prisma.message.deleteMany(),
      prisma.review.deleteMany(),
      prisma.report.deleteMany(),

      // Delete Booking (depends on Patient, Driver, Hospital)
      prisma.booking.deleteMany(),

      // Delete tables with foreign keys to User and Driver
      prisma.patient.deleteMany(),
      prisma.userAddress.deleteMany(),
      prisma.driverAddress.deleteMany(),
      prisma.driverWallet.deleteMany(),

      // Delete Hospital (no dependencies after Booking)
      prisma.hospital.deleteMany(),

      // Delete User, Driver, Admin (base tables)
      prisma.driver.deleteMany(),
      prisma.user.deleteMany(),
      prisma.admin.deleteMany(),
    ]);

    // Reset auto-increment for all tables with an id field
    await prisma.$executeRawUnsafe('ALTER TABLE user AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE driver AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE admin AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE booking AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE patient AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE hospital AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE user_address AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE driver_address AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE driver_wallet AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE message AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE review AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE report AUTO_INCREMENT = 1');

    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

console.group('Reset DB...');
resetDatabase()
  .then(() => {
    console.groupEnd();
    process.exit(0);
  })
  .catch((error) => {
    console.groupEnd();
    console.error('Reset failed:', error);
    process.exit(1);
  });