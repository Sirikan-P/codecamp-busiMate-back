require('dotenv').config()
const prisma = require('../configs/prisma')

async function resetDatabase() {
    await prisma.$transaction([
        prisma.hospital.deleteMany(),
        prisma.admin.deleteMany(),
        prisma.userAddress.deleteMany(),
        prisma.user.deleteMany(),
        prisma.patient.deleteMany(),
        prisma.driver.deleteMany(),
        prisma.booking.deleteMany(),
        prisma.review.deleteMany(),
        prisma.report.deleteMany(),

    ])
    await prisma.$executeRawUnsafe('Alter Table user auto_increment=1')
}
console.group('Reset DB...')
resetDatabase()
