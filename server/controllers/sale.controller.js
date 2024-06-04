import Sale from '../mongodb/models/sale.js';

const getTotalSales = async (req, res) => {
  try {
    const sales = await Sale.find({}).limit(req.query._end);

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSaleByPropertyId = async (req, res) => {
  const { id } = req.params;
  const sale = await Sale.findOne({ property: id });

  if (sale) {
    res.status(200).json(sale);
  } else {
    res.status(404).json({ message: 'Sale not found!' });
  }
};

const createSale = async (req, res) => {
  try {
    const { price, date, propertyId, userId } = req.body;

    const newSale = await Sale.create({
      price,
      date,
      property: propertyId,
      agent: userId,
    });
    return res.status(200).json(newSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTotalSales, createSale, getSaleByPropertyId };
