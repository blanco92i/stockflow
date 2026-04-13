import Sale from '../models/Sale.js';

// Get dashboard stats
export const getDashboard = async (req, res) => {
  try {
   const {_id: userId} = req.user;

    // Get today's date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query today's sales
    const sales = await Sale.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // Calculate totals
    const totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
    const totalTransactions = sales.length;

    res.json({
      totalSales,
      totalProfit,
      totalTransactions,
      date: new Date().toDateString(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
