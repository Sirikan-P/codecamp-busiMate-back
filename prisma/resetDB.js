require('dotenv').config()
const prisma = require('../configs/prisma')

async function resetDatabase() {
    await prisma.$transaction([
        prisma.hospital.deleteMany(),
        prisma.userAddress.deleteMany(),
        // prisma.driverAddress.deleteMany(),
        prisma.message.deleteMany(), // เพิ่มบรรทัดนี้เพื่อลบ Message ก่อน Booking
        prisma.booking.deleteMany(),
        prisma.review.deleteMany(),
        prisma.report.deleteMany(),
        prisma.patient.deleteMany(),
        prisma.driver.deleteMany(),
        prisma.admin.deleteMany(),
        prisma.user.deleteMany(),
        // prisma.driverWallet.deleteMany(),
        // prisma.transactionType.deleteMany(),

    ])
    await prisma.$executeRawUnsafe('Alter Table hospital auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table user_address auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table message auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table booking auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table review auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table report auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table patient auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table driver auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table admin auto_increment=1')
    await prisma.$executeRawUnsafe('Alter Table user auto_increment=1')
}
console.group('Reset DB...')
resetDatabase()

// npm run resetDB