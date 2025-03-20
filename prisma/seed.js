const { text } = require("express");
const prisma = require("../configs/prisma");
const bcrypt = require("bcryptjs");
const { image } = require("../configs/cloudinary");

const hashedPassword = bcrypt.hashSync("123456", 10);

const User = [
  {
    firstName: "สมชาย",
    lastName: "ใจดี",
    password: hashedPassword,
    email: "somchai@example.com",
    phoneNumber: "081-123-4567",
    profileImage: "https://example.com/somchai.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "สมหญิง",
    lastName: "ศรีสุข",
    password: hashedPassword,
    email: "somying@example.com",
    phoneNumber: "082-234-5678",
    profileImage: "https://example.com/somying.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "วิชัย",
    lastName: "มีทรัพย์",
    password: hashedPassword,
    email: "vichai@example.com",
    phoneNumber: "083-345-6789",
    profileImage: "https://example.com/vichai.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "กัญญา",
    lastName: "ใจงาม",
    password: hashedPassword,
    email: "kanya@example.com",
    phoneNumber: "084-456-7890",
    profileImage: "https://example.com/kanya.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "เดชา",
    lastName: "เก่งกล้า",
    password: hashedPassword,
    email: "decha@example.com",
    phoneNumber: "085-567-8901",
    profileImage: "https://example.com/decha.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "ดวงใจ",
    lastName: "งามพร้อม",
    password: hashedPassword,
    email: "duangjai@example.com",
    phoneNumber: "086-678-9012",
    profileImage: "https://example.com/duangjai.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "ชัยชนะ",
    lastName: "มีชัย",
    password: hashedPassword,
    email: "chaichana@example.com",
    phoneNumber: "087-789-0123",
    profileImage: "https://example.com/chaichana.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "ธารา",
    lastName: "ใสสะอาด",
    password: hashedPassword,
    email: "thara@example.com",
    phoneNumber: "088-890-1234",
    profileImage: "https://example.com/thara.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "นที",
    lastName: "รื่นรมย์",
    password: hashedPassword,
    email: "natee@example.com",
    phoneNumber: "089-901-2345",
    profileImage: "https://example.com/natee.jpg",
    status: "ACTIVE",
  },
  {
    firstName: "วารี",
    lastName: "ชื่นใจ",
    password: hashedPassword,
    email: "waree@example.com",
    phoneNumber: "090-123-4567",
    profileImage: "https://example.com/waree.jpg",
    status: "ACTIVE",
  },
];

const Status = [
  {
    status: "ACTIVE",
  },
  {
    status: "INACTIVE",
  },
];

const Driver = [
  {
    firstName: "ประวิทย์",
    lastName: "ขับดี",
    email: "prawit@example.com",
    password: hashedPassword,
    phoneNumber: "091-234-5678",
    profileImageUrl:
      "https://plus.unsplash.com/premium_photo-1681821679118-bb069eeb2d98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpdmVyfGVufDB8fDB8fHww",
    age: 35,
    gender: "MALE",
    idCard: "1100100010001",
    carRegNo: "กท1234",
    carType: "SEETS_4",
    hasWheelChair: "NOHAVE",
    hasAssist: "NOHAVE",
    online: "OFFLINE",
    wallet: "1000.00",
    role: "driver",
    status: "ACTIVE",
  },
  {
    firstName: "สุภาพร",
    lastName: "ใจเย็น",
    email: "supaporn@example.com",
    password: hashedPassword,
    phoneNumber: "092-345-6789",
    profileImageUrl:
      "https://media.istockphoto.com/id/2169109477/photo/mom-driving-son-to-school-in-car-for-back-to-school-season.webp?a=1&b=1&s=612x612&w=0&k=20&c=rqn0nshNAp9Rrha0NM2wMAFdORUxzd4p3w6JpupaKSU=",
    age: 40,
    gender: "FEMALE",
    idCard: "1200200020002",
    carRegNo: "กท5678",
    carType: "SEETS_7",
    hasWheelChair: "HAVE",
    hasAssist: "HAVE",
    online: "ONLINE",
    wallet: "2000.00",
    role: "driver",
    status: "ACTIVE",
  },
  {
    firstName: "สมปอง",
    lastName: "เร็วไว",
    email: "sompong@example.com",
    password: hashedPassword,
    phoneNumber: "093-456-7890",
    profileImageUrl:
      "https://images.unsplash.com/photo-1473655587843-eda8944061e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRyaXZlcnxlbnwwfHwwfHx8MA%3D%3D",
    age: 28,
    gender: "MALE",
    idCard: "1300300030003",
    carRegNo: "กท9012",
    carType: "SEETS_4",
    hasWheelChair: "NOHAVE",
    hasAssist: "NOHAVE",
    online: "OFFLINE",
    wallet: "500.00",
    role: "driver",
    status: "ACTIVE",
  },
  {
    firstName: "นงนุช",
    lastName: "ชำนาญทาง",
    email: "nongnuch@example.com",
    password: hashedPassword,
    phoneNumber: "094-567-8901",
    profileImageUrl: "https://cdn.pixabay.com/photo/2016/11/21/14/03/woman-1845572_640.jpg",
    age: 32,
    gender: "FEMALE",
    idCard: "1400400040004",
    carRegNo: "กท3456",
    carType: "SEETS_7",
    hasWheelChair: "HAVE",
    hasAssist: "HAVE",
    online: "ONLINE",
    wallet: "1500.00",
    role: "driver",
    status: "ACTIVE",
  },
  {
    firstName: "วิโรจน์",
    lastName: "ปลอดภัย",
    email: "viroj@example.com",
    password: hashedPassword,
    phoneNumber: "095-678-9012",
    profileImageUrl: "https://plus.unsplash.com/premium_photo-1661306646017-c3f9293fdbd8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpdmVyJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D",
    age: 45,
    gender: "MALE",
    idCard: "1500500050005",
    carRegNo: "กท7890",
    carType: "SEETS_9",
    hasWheelChair: "HAVE",
    hasAssist: "HAVE",
    online: "ONLINE",
    wallet: "3000.00",
    role: "driver",
    status: "ACTIVE",
  },
  {
    firstName: "จันทรา",
    lastName: "บริการดี",
    email: "jantra@example.com",
    password: hashedPassword,
    phoneNumber: "096-789-0123",
    profileImageUrl: "https://media.istockphoto.com/id/2193413893/photo/young-woman-driving-modern-car-smiling-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=KJCWsvGihwbPBGfihdhu21OWdA2kBH94nLpP17ZDiFA=",
    age: 38,
    gender: "FEMALE",
    idCard: "1600600060006",
    carRegNo: "กท1234",
    carType: "SEETS_4",
    hasWheelChair: "NOHAVE",
    hasAssist: "NOHAVE",
    online: "OFFLINE",
    wallet: "3000.00",
    role: "driver",
    status: "ACTIVE",
  },
];

const DriverAddress = [
  {
    address: "123/45 ถนนสุขสันต์ แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500",
    lat: 13.7,
    long: 100.5018,
    status: "USE",
    driverId: 1,
  },
];

const DriverWallet = [
  {
    amount: "0.00",
    type: "INCOME",
    driverId: 1,
  },
];

const TransactionType = [
  {
    type: "INCOME",
  },
  {
    type: "OUTCOME",
  },
];

const UserAddress = [
  {
    address: "123/45 ถนนสุขสันต์ แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500",
    lat: 13.7563,
    long: 100.5018,
    userId: 1,
  },
  {
    address: "99/88 หมู่บ้านแสนสุข ต.ปากเกร็ด อ.ปากเกร็ด จ.นนทบุรี 11120",
    lat: 13.9123,
    long: 100.4957,
    userId: 1,
  },
  {
    address: "55 ซอยลาดพร้าว 15 แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900",
    lat: 13.8192,
    long: 100.5638,
    userId: 1,
  },
  {
    address: "77/2 ถนนเจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพฯ 10600",
    lat: 13.7265,
    long: 100.5102,
    userId: 1,
  },
];

const Gender = [
  {
    gender: "MALE",
  },
  {
    gender: "FEMALE",
  },
  {
    gender: "OTHER",
  },
];

const CarType = [
  {
    carType: "SEETS_4",
  },
  {
    carType: "SEETS_7",
  },
  {
    carType: "SEETS_9",
  },
];

const OnHand = [
  {
    onHand: "HAVE",
  },
  {
    onHand: "NOHAVE",
  },
];

const Online = [
  {
    online: "ONLINE",
  },
  {
    online: "OFFLINE",
  },
];

const Patient = [
  {
    firstName: "สมชาย",
    lastName: "สมบูรณ์",
    age: 25,
    gender: "MALE",
    phoneNumber: "089-123-4567",
    healthCondition: "มีปัญหาสมอง",
    userId: 1,
  },
  {
    firstName: "สมหญิง",
    lastName: "สมบูรณ์",
    age: 25,
    gender: "FEMALE",
    phoneNumber: "089-123-4567",
    healthCondition: "มีปัญหาสมอง",
    userId: 2,
  },
];

const Booking = [
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-19",
    bookingStatus: "FIND_DRIVER",
    paymentStatus: "IN_PROCESS",
    appointmentImage:
      "https://images.unsplash.com/photo-1553531381-02339234a09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format",
    specialRequirement: "injury on right leg",
    totalPrice: "3000",
    patientId: 1,
    driverId: 1,
    hospitalId: 1,
  },
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "FIND_DRIVER",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking1.jpg",
    specialRequirement: "ต้องการรถเข็น",
    totalPrice: "500.00",
    patientId: 1,
    driverId: 1,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NOT_NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "UP_COMING",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking2.jpg",
    specialRequirement: "ไม่มี",
    totalPrice: "300.00",
    patientId: 2,
    driverId: 2,
    hospitalId: 2,
  },
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-19",
    bookingStatus: "IN_PROCESS",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking3.jpg",
    specialRequirement: "ต้องการคนช่วยยกของ",
    totalPrice: "700.00",
    patientId: 2,
    driverId: 1,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "COMPLETE",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking4.jpg",
    specialRequirement: "ต้องการคนช่วยดูแล",
    totalPrice: "900.00",
    patientId: 2,
    driverId: 4,
    hospitalId: 2,
  },
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "FIND_DRIVER",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking5.jpg",
    specialRequirement: "ต้องการรถเข็นและคนช่วย",
    totalPrice: "1200.00",
    patientId: 1,
    driverId: 5,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NOT_NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "UP_COMING",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking6.jpg",
    specialRequirement: "ไม่มี",
    totalPrice: "400.00",
    patientId: 1,
    driverId: 2,
    hospitalId: 2,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-21",
    bookingStatus: "IN_PROCESS",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking7.jpg",
    specialRequirement: "ต้องการคนช่วยยกของ",
    totalPrice: "600.00",
    patientId: 2,
    driverId: 3,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-21",
    bookingStatus: "COMPLETE",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking8.jpg",
    specialRequirement: "ต้องการคนช่วยดูแล",
    totalPrice: "800.00",
    patientId: 2,
    driverId: 4,
    hospitalId: 2,
  },
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "FIND_DRIVER",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking9.jpg",
    specialRequirement: "ต้องการรถเข็นและคนช่วย",
    totalPrice: "1000.00",
    patientId: 1,
    driverId: 5,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NOT_NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "UP_COMING",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking10.jpg",
    specialRequirement: "ไม่มี",
    totalPrice: "350.00",
    patientId: 1,
    driverId: 6,
    hospitalId: 2,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "IN_PROCESS",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking11.jpg",
    specialRequirement: "ต้องการคนช่วยยกของ",
    totalPrice: "750.00",
    patientId: 2,
    driverId: 1,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-21",
    bookingStatus: "COMPLETE",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking12.jpg",
    specialRequirement: "ต้องการคนช่วยดูแล",
    totalPrice: "950.00",
    patientId: 2,
    driverId: 2,
    hospitalId: 2,
  },
  {
    needWheelChair: "NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-19",
    bookingStatus: "FIND_DRIVER",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking13.jpg",
    specialRequirement: "ต้องการรถเข็นและคนช่วย",
    totalPrice: "1250.00",
    patientId: 1,
    driverId: 3,
    hospitalId: 1,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NOT_NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "UP_COMING",
    paymentStatus: "COMPLETE",
    appointmentImage: "https://example.com/booking14.jpg",
    specialRequirement: "ไม่มี",
    totalPrice: "450.00",
    patientId: 1,
    driverId: 4,
    hospitalId: 2,
  },
  {
    needWheelChair: "NOT_NEED",
    needAssist: "NEED",
    appointmentDate: "2025-03-20",
    bookingStatus: "IN_PROCESS",
    paymentStatus: "IN_PROCESS",
    appointmentImage: "https://example.com/booking15.jpg",
    specialRequirement: "ต้องการคนช่วยยกของ",
    totalPrice: "650.00",
    patientId: 2,
    driverId: 5,
    hospitalId: 1,
  },
];

const BookingStatus = [
  {
    bookingStatus: "FIND_DRIVER",
  },
  {
    bookingStatus: "UP_COMING",
  },
  {
    bookingStatus: "IN_PROCESS",
  },
  {
    bookingStatus: "COMPLETE",
  },
];

const Request = [
  {
    request: "NEED",
  },
  {
    request: "NOT_NEED",
  },
];

const PaymentStatus = [
  {
    paymentStatus: "IN_PROCESS",
  },
  {
    paymentStatus: "COMPLETE",
  },
];

const Hospital = [
  {
    name: "รพ.บางบัวทอง",
    address: "12 หมู่ 5 ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110",
    lat: 13.9134,
    long: 100.4287,
  },
  {
    name: "รพ.บางแค",
    address: "6/23 หมู่บ้านสวนสุข ต.บางแค อ.บางแค กรุงเทพฯ 1",
    lat: 13.6953,
    long: 100.4082,
  },
];

const Review = [
  {
    rate: "A",
    message: "ดีมากครับ",
    bookingId: 1,
  },
  {
    rate: "B",
    message: "ดีมากครับ",
    bookingId: 1,
  },
];

const Rate = [
  {
    rate: "A",
  },
  {
    rate: "B",
  },
  {
    rate: "C",
  },
  {
    rate: "D",
  },
  {
    rate: "E",
  },
];

const Report = [
  {
    type: "USER",
    status: "IN_PROCESS",
    topic: "wrong way",
    message: "รถขับผิดทาง",
    image:
      "https://images.unsplash.com/photo-1553531381-02339234a09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format",
    bookingId: 1,
    adminId: 1,
  },
];

const Source = [
  {
    source: "USER",
  },
  {
    source: "DRIVER",
  },
];

const ReportStatus = [
  {
    status: "IN_PROCESS",
  },
  {
    status: "COMPLETE",
  },
];

const Admin = [
  {
    firstName: "กรรณิกา",
    lastName: "สุขสวัสดิ์",
    email: "kanrawee@ggg.mail",
    password: hashedPassword,
  },
];

const Message = [
  {
    text: "สวัสดีค่ะ",
    image:
      "https://images.unsplash.com/photo-1553531381-02339234a09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format",
    senderUserId: 1,
    senderDriverId: 1,
    receiverUserId: 1,
    receiverDriverId: 1,
    bookingId: 1,
  },
];

console.log("DB seed...");

async function seedDB() {
  try {
    // 1. Seed independent tables first (no foreign key dependencies)
    await prisma.hospital.createMany({
      data: Hospital,
      // skipDuplicates: true,
    });
    console.log("Hospitals seeded successfully");

    await prisma.admin.createMany({
      data: Admin,
      // skipDuplicates: true,
    });
    console.log("Admins seeded successfully");

    // 2. Seed User table (needed by Patient and UserAddress)
    await prisma.user.createMany({
      data: User,
      // skipDuplicates: true,
    });
    console.log("Users seeded successfully");

    // 3. Seed tables that depend on User
    await prisma.userAddress.createMany({
      data: UserAddress,
      // skipDuplicates: true,
    });
    console.log("User addresses seeded successfully");

    await prisma.patient.createMany({
      data: Patient,
      // skipDuplicates: true,
    });
    console.log("Patients seeded successfully");

    // 4. Seed Driver table (needed by Booking and DriverAddress)
    await prisma.driver.createMany({
      data: Driver,
      // skipDuplicates: true,
    });
    console.log("Drivers seeded successfully");

    await prisma.driverAddress.createMany({
      data: DriverAddress,
      // skipDuplicates: true,
    });
    console.log("Driver addresses seeded successfully");

    await prisma.driverWallet.createMany({
      data: DriverWallet,
      // skipDuplicates: true,
    });
    console.log("Driver wallets seeded successfully");

    // 5. Seed Booking table (depends on Hospital, Patient, and Driver)
    await prisma.booking.createMany({
      data: Booking,
      // skipDuplicates: true, // Optional: Prevents duplicate bookings if rerun
    });
    console.log("Bookings seeded successfully");

    // 6. Seed tables that depend on Booking
    await prisma.review.createMany({
      data: Review,
      // skipDuplicates: true,
    });
    console.log("Reviews seeded successfully");

    await prisma.report.createMany({
      data: Report,
      // skipDuplicates: true,
    });
    console.log("Reports seeded successfully");

    await prisma.message.createMany({
      data: Message,
      // skipDuplicates: true,
    });
    console.log("Messages seeded successfully");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
seedDB();

// npx prisma db seed
