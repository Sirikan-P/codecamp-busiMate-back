const prisma = require('../configs/prisma')
const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('123456', 10)

const User = [
    {
        firstName: 'Andy', 
        lastName: 'Codecamp', 
        password: hashedPassword, email: 'andy@ggg.mail',
        addressId: '1',
        phoneNumber: '089-123-4567',
        status: 'ACTIVE',       
    },
    {
        firstName: 'สุนีย์', 
        lastName: 'รักดี', 
        password: hashedPassword, email: 'sunee@ggg.mail',
        addressId: '3',
        phoneNumber: '089-123-4567',
        status: 'ACTIVE',       
    },
    

]

const Status = [
    {
        status: 'ACTIVE',
    },
    {
        status: 'INACTIVE',
    },
]

const Driver = [
    {
        firstName: 'วรชัย', 
        lastname: ' ตั้งตรง',
        email: 'vara@ggg.mail',
        password: hashedPassword, 
        phoneNumber: '089-123-4567',
        age: 25,
        gender: 'MALE',
        idCard: '1234567890123',
        carRegNo : 'ab-1234', 
        carType : 'SEETS_4',      
        hasWheelChair : 'NOHAVE', 
        hasAssist  : 'NOHAVE',  
        online   : 'OFFLINE',
        wallet: '0',     
        address: '12 หมู่ 5 ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110	',
        lat: 13.9134, long: 100.4287,
        status: 'ACTIVE',       
    },
    {
        firstName: 'กานต์รวี', 
        lastname: ' เพียรดี',
        email: 'kanrawee@ggg.mail',
        password: hashedPassword, 
        phoneNumber: '086-999-0000',
        age: 35,
        gender: 'FEMALE',
        idCard: '1234567890123',
        carRegNo : 'ab-2222', 
        carType : 'SEETS_7',      
        hasWheelChair : 'NOHAVE', 
        hasAssist  : 'HAVE',  
        online   : 'OFFLINE',
        wallet: '0',     
        address: '6/23 หมู่บ้านสวนสุข ต.บางแค อ.บางแค กรุงเทพฯ 10160',
        lat: 13.6953, long: 100.4082,
        status: 'ACTIVE',       
    },

    

]

const UserAddress = [
    {
        address: '123/45 ถนนสุขสันต์ แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500', 
        lat: 13.7563, log: 100.5018
    },
    {
        address: '99/88 หมู่บ้านแสนสุข ต.ปากเกร็ด อ.ปากเกร็ด จ.นนทบุรี 11120', 
        lat: 13.9123, log: 100.4957
    },
    {
        address: '55 ซอยลาดพร้าว 15 แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900', 
        lat: 13.8192, log: 100.5638
    },
    {
        address: '77/2 ถนนเจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพฯ 10600', 
        lat: 13.7265, log: 100.5102
    },
 
]

const Gender = [
    {
        gender: 'MALE',
    },
    {
        gender: 'FEMALE',
    },
    {
        gender: 'OTHER',
    }
]

const CarType = [
    {
        carType: 'SEETS_4',
    },
    {
        carType: 'SEETS_7',
    },
    {
        carType: 'SEETS_9',
    },
]

const OnHand = [
    {
        onHand: 'HAVE',
    },
    {
        onHand: 'NOHAVE',
    },
]

const Online = [
    {
        online: 'ONLINE',
    },
    {
        online: 'OFFLINE',
    },
]

const Patient = [
    {
        firstName: 'สมชาย',
        lastName: 'สมบูรณ์',
        age: 25,
        gender: 'MALE',
        phoneNumber: '089-123-4567',
        healthCondition : 'มีปัญหาสมอง',
        userId: 1,
    },
    {
        firstName: 'สมหญิง',
        lastName: 'สมบูรณ์',
        age: 25,
        gender: 'FEMALE',
        phoneNumber: '089-123-4567',
        healthCondition : 'มีปัญหาสมอง',
        userId: 2,
    }

]

const Booking = [
    {
        needWheelChair: "NEED",
        needAssist: "NEED" ,
        appointmentDate: '2023-09-15',
        bookingStatus: 'FIND_DRIVER',
        paymentStatus: 'IN_PROCESS',
        appointmentImage: 'https://images.unsplash.com/photo-1553531381-02339234a09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
        specialRequirement: 'injury on right leg',
        totalPrice: '3000',
        patientId: 1,
        driverId: 1,
        hospitalId: 1,
    }
]

const BookingStatus = [
    {
        bookingStatus: 'FIND_DRIVER',
    },
    {
        bookingStatus: 'UP_COMING',
    },
    {
        bookingStatus: 'IN_PROCESS',
    },
    {
        bookingStatus: 'COMPLETE',
    },
]

const Request = [
    {
        request: 'NEED',
    },
    {
        request: 'NOT_NEED',
    },
]

const PaymentStatus = [
    {
        paymentStatus: 'IN_PROCESS',
    },
    {
        paymentStatus: 'COMPLETE',
    },
]

const Hospital = [
    {
        name: 'รพ.บางบัวทอง',
        address: '12 หมู่ 5 ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110',
        lat: 13.9134, long: 100.4287,
    },
    {
        name: 'รพ.บางแค',
        address: '6/23 หมู่บ้านสวนสุข ต.บางแค อ.บางแค กรุงเทพฯ 1',
        lat: 13.6953, long: 100.4082,
    }
]

const Review = [
    {
        rate: 'A',
        message: 'ดีมากครับ',
        bookingId: 1,
    },
    {
        rate: 'B',
        message: 'ดีมากครับ',
        bookingId: 1,
    },
]

const Rate = [
    {
        rate: 'A',
    },
    {
        rate: 'B',
    },
    {
        rate: 'C',
    },
    {
        rate: 'D',
    },
    {
        rate: 'E',
    },
]

const Report = [
    {
        type : 'USER',
        status: 'IN_PROCESS',
        message: 'รถขับผิดทาง',
        image: 'https://images.unsplash.com/photo-1553531381-02339234a09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format',
        bookingId: 1,
        adminId: 1,
    },

]

const Source = [
    {
        source: 'USER',
    },
    {
        source: 'DRIVER',
    },
]

const ReportStatus = [
    {
        status: 'IN_PROCESS',
    },
    {
        status: 'COMPLETE',
    },
]

const Admin = [
    {
        firstName: 'กรรณิกา',
        lastName: 'สุขสวัสดิ์',
        email: 'kanrawee@ggg.mail',
        password: hashedPassword,
    }
]


console.log('DB seed...')

async function seedDB() {
    await prisma.hospital.createMany({ 
        data: Hospital,
        skipDuplicates: true
     })
    await prisma.admin.createMany({ 
        data: Admin,
        skipDuplicates: true
     })
    await prisma.userAddress.createMany({
         data: UserAddress,
         skipDuplicates: true
         })
    await prisma.user.createMany({ 
        data: User,
        skipDuplicates: true
     })
    await prisma.patient.createMany({ 
        data: Patient,
        skipDuplicates: true
     })
    await prisma.driver.createMany({ 
        data: Driver,
        skipDuplicates: true
     })
    await prisma.booking.createMany({ 
        data: Booking,
        skipDuplicates: true
     })
    await prisma.review.createMany({ 
        data: Review,
        skipDuplicates: true
     })
    await prisma.report.createMany({ 
        data: Report,
        skipDuplicates: true
     })
}

seedDB()