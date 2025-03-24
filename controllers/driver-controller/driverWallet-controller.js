const prisma = require("../../configs/prisma")
const createError = require("../../utils/createError")

// income ----------------------------------------
exports.income= async (req,res,next)=>{
  try {

  const driverId = parseInt(req.user.id);
  const { incomeAmount  } = req.body;

  const wallet = await prisma.$transaction([
    prisma.driverWallet.create({
      data: {
        driverId: driverId,
        amount: +incomeAmount,
        type: "INCOME",
      },
    }),
    prisma.driver.update({
      where: { id: +driverId },
      data: { wallet: { increment: +incomeAmount } },
    }),
  ]);
  console.log(1)
    res.json({  success: true ,
                message: `income, wallet : ${ incomeAmount }` ,
                result: wallet  })
  } catch (error) {
      next(error)
  }
}

// outcome ----------------------------------------
exports.outcome= async (req,res,next)=>{
  try {
    const driverId = parseInt(req.user.id);
    const { outcomeAmount  } = req.body;

    const wallet = await prisma.$transaction([
      prisma.driverWallet.create({
        data: {
          driverId: driverId,
          amount: +outcomeAmount,
          type: "OUTCOME",
        },
      }),
      prisma.driver.update({
        where: { id: +driverId },
        data: { wallet: { decrement: +outcomeAmount } },
      }),
    ]);

    res.json({  success: true ,
                message: `outcome, wallet : ${ outcomeAmount }` ,
                result: wallet  })
  } catch (error) {
      next(error)
  }
}

//get wallet data 
exports.getDriverWalletDetails = async (req,res,next)=>{
  try {
    const driverId = parseInt(req.user.id);

    const driver = await prisma.driver.findUnique({
      where: { id: driverId }, // driverId คือ ID ของคนขับที่ต้องการค้นหา
      select: {
        id: true,
        wallet: true, // ยอดเงินรวมของ driver
        DriverWallet: { // เรียกดู transaction ทั้งหมดของ driver
          orderBy: { createdAt: "desc" }, // เรียงตามวันที่ล่าสุด
          select: {
            id: true,
            amount: true,
            type: true,
            createdAt: true,
          },
        },
      },
    });

    if (!driver) {
      return res.status(404).json({ error: "driver not found" });
    }

    res.json({  success: true ,
                message: `driver, wallet data` ,
                result: driver  })
  } catch (error) {
      next(error)
  }
}