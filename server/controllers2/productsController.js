const { Queries } = require('../db/queries.js');
const pool = require('../db/config.js');

class productsController {
  async getProductsByIds(req, res) {
    try {
      const { productIds } = req.body;
      const { language_id } = res.locals;

      const [rows] = await pool.query(Queries.getProductsByIds, [
        language_id,
        language_id,
        productIds,
      ]);

      return res.status(200).json({
        products: rows,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new productsController();
