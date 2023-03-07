const { Queries } = require('../db/queries.js');
const pool = require('../db/config.js');

class pagesController {
  async getInformationForMainPage(req, res) {
    try {
      const { language_id } = res.locals;
      const { watchedProductsIds } = req.body;

      const [categories, discountProducts, newProducts, news, watchedProducts] =
        await Promise.all([
          pool.query(Queries.getAllCategories, [language_id]),
          pool.query(Queries.getProductsWithDiscount, [
            language_id,
            language_id,
          ]),
          pool.query(Queries.getNewProducts, [language_id, language_id]),
          pool.query(Queries.getAllNews, [language_id]),
          pool.query(Queries.getProductsByIds, [
            language_id,
            language_id,
            watchedProductsIds,
          ]),
        ]);

      return res.status(200).json({
        categories: categories[0],
        discountProducts: discountProducts[0],
        newProducts: newProducts[0],
        news: news[0],
        watchedProducts: watchedProducts[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getInformationForProductPage(req, res) {
    try {
      const { url } = req.params;
      const { language_id } = res.locals;

      const [
        productInformationRows,
        photosRows,
        propertiesRows,
        characteristicsRows,
        descriptionRows,
        metaRows,
      ] = await Promise.all([
        pool.query(Queries.getProductByUrl, [language_id, language_id, url]),
        pool.query(Queries.getAllProductPhotosByUrl, [url]),
        pool.query(Queries.getProductsPropertiesProductsByUrl, [
          language_id,
          language_id,
          url,
        ]),
        pool.query(Queries.getProductCharacteristicsByUrl, [
          language_id,
          language_id,
          url,
        ]),
        pool.query(Queries.getProductDescriptionByUrl, [url, language_id]),
        pool.query(Queries.getMetaProduct, [url, language_id]),
      ]);

      return res.status(200).json({
        product_information: productInformationRows[0],
        photos: photosRows[0],
        properties: propertiesRows[0],
        characteristics: characteristicsRows[0],
        description: descriptionRows[0],
        meta: metaRows[0],
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Couldn't get product information" });
    }
  }

  async getSearchProducts(req, res) {
    try {
      const { language_id } = res.locals;
      const { src, page, groupId } = req.query;

      const searchValue = '%' + src + '%';

      const qtyItemsPage = 8;
      const startingLimit = (Number(page) - 1) * qtyItemsPage;

      if (!groupId) {
        const [rows] = await pool.query(Queries.getSearchedProducts, [
          language_id,
          language_id,
          searchValue,
          searchValue,
          language_id,
          language_id,
        ]);

        const numberOfPages = Math.ceil(rows.length / qtyItemsPage);

        const [rows2] = await pool.query(
          Queries.getSearchedProducts +
            ` LIMIT ${startingLimit}, ${qtyItemsPage}`,
          [
            language_id,
            language_id,
            searchValue,
            searchValue,
            language_id,
            language_id,
          ]
        );

        return res.status(200).json({
          data: rows2,
          pageQty: numberOfPages,
        });
      }

      if (groupId) {
        const [rows] = await pool.query(Queries.getSearchedProductsInCategory, [
          language_id,
          language_id,
          language_id,
          searchValue,
          groupId,
        ]);

        const numberOfPages = Math.ceil(rows.length / qtyItemsPage);

        const [rows2] = await pool.query(
          Queries.getSearchedProducts +
            ` LIMIT ${startingLimit}, ${qtyItemsPage}`,
          [
            language_id,
            language_id,
            language_id,
            searchValue,
            searchValue,
            language_id,
            language_id,
            language_id,
          ]
        );

        return res.status(200).json({
          data: rows2,
          pageQty: numberOfPages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryPageInformation(req, res) {
    try {
      const { language_id } = res.locals;
      const { page, groupUrl } = req.query;

      const cleanGroupUrl = groupUrl.replace('/group_', '');

      const qtyItemsPage = 8;
      const startingLimit = (Number(page) - 1) * qtyItemsPage;

      const [rows] = await pool.query(Queries.getCategoryProducts, [
        language_id,
        language_id,
        cleanGroupUrl,
      ]);

      const numberOfPages = Math.ceil(rows.length / qtyItemsPage);

      const [rows2] = await pool.query(
        Queries.getCategoryProducts +
          ` LIMIT ${startingLimit}, ${qtyItemsPage}`,
        [language_id, language_id, cleanGroupUrl]
      );

      return res.status(200).json({
        data: rows2,
        pageQty: numberOfPages,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryPropucrsProperties(req, res) {
    try {
      const { language_id } = res.locals;
      const { groupUrl } = req.query;

      const [rows] = await pool.query(
        `${Queries.getRelationProductsForAllProductsInCategory}; ${Queries.getAllCharacteristicsValuesByCategoryUrl}; ${Queries.getAllCharacteristicsByCategoryUrl}; ${Queries.getAllManufacturersByCategoryUrl}; ${Queries.getMetaCategory}`,
        [
          language_id,
          language_id,
          groupUrl,
          language_id,
          language_id,
          language_id,
          language_id,
          groupUrl,
          language_id,
          language_id,
          language_id,
          language_id,
          groupUrl,
          groupUrl,
          groupUrl,
          language_id,
        ]
      );

      return res.status(200).json({
        products: rows[0],
        values: rows[1],
        characteristics: rows[2],
        manufacturers: rows[3],
        meta: rows[4],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getFiltratedProducts(req, res) {
    try {
      const { language_id } = res.locals;
      const params = req.body.params;
      const manufacturers = req.body.manufacturers;

      const { page, groupUrl } = req.query;

      const qtyItemsPage = 8;
      const startingLimit = (Number(page) - 1) * qtyItemsPage;

      let q = `
      SELECT prpv.product_id, COUNT(prpv.property_id) as qty FROM product_rel_property_value prpv
      JOIN product_category pc
	      ON pc.product_id = prpv.product_id
      JOIN category_lang cl
	      ON cl.category_id = pc.category_id
      JOIN product p
        ON p.id = pc.product_id
      `;
      'get Filtrated Products Before 1 Query' + Date.parse();

      // if req doesnt contain params function will return filtered products by manufacturers
      if (!Object.keys(params).length && manufacturers.length) {
        const [rows] = await pool.query(
          `SELECT DISTINCT p.id FROM product p JOIN product_category pc ON pc.product_id = p.id JOIN category_lang cl ON cl.category_id = pc.category_id WHERE p.manufacturer_id IN (${manufacturers.join(
            ','
          )}) AND cl.url = '${groupUrl}'`
        );

        const numberOfPages = Math.ceil(rows.length / qtyItemsPage);

        const [rows2] = await pool.query(
          Queries.getProductsByManufacturerIdAndCategoryUrl +
            ` LIMIT ${startingLimit}, ${qtyItemsPage}`,
          [language_id, language_id, manufacturers.join(','), groupUrl]
        );

        return res.status(200).json({
          data: rows2,
          pageQty: numberOfPages,
        });
      } else {
        //filtration by manufacturers and params
        const paramsArray = Object.entries(params).flat();
        Object.keys(params).forEach((el, i) => {
          if (i === 0) {
            q += `
          WHERE prpv.property_id = ? AND prpv.property_value_id = ?
          AND prpv.status = 'enabled'
          AND cl.url = "${groupUrl}"
          AND cl.language_id = ${language_id}
          ${
            manufacturers.length
              ? `AND p.manufacturer_id IN (${manufacturers.join(',')})`
              : ''
          }
          `;
          } else {
            q += `
          OR prpv.property_id = ? AND prpv.property_value_id = ?
          AND prpv.status = 'enabled'
          AND cl.url = "${groupUrl}"
          AND cl.language_id = ${language_id}
          ${
            manufacturers.length
              ? `AND p.manufacturer_id IN (${manufacturers.join(',')})`
              : ''
          }
          `;
          }
        });

        q += `GROUP BY prpv.product_id`;

        const [productIds] = await pool.query(q, [...paramsArray]);

        // searching products who have a qty of needed params equel params from req
        const filteredIds = productIds
          .filter((el) => el.qty === paramsArray.length / 2)
          .map((el) => el.product_id);

        if (!filteredIds.length) {
          return res.status(200).json({
            data: [],
            pageQty: 0,
          });
        }

        const numberOfPages = Math.ceil(filteredIds.length / qtyItemsPage);

        const [products] = await pool.query(
          Queries.getProductsByIds + ` LIMIT ${startingLimit}, ${qtyItemsPage}`,
          [language_id, language_id, filteredIds]
        );

        return res.status(200).json({
          data: products,
          pageQty: numberOfPages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getComparePageInformation(req, res) {
    try {
      const { language_id } = res.locals;
      const { productIds, categoriesIds } = req.body;

      const [rows] = await pool.query(
        `${Queries.getCharacteristicsByCategory}; ${Queries.getAllProductCharacteristics}; ${Queries.getProductsByIds}; SELECT category_id, name FROM category_lang cl WHERE cl.language_id = ${language_id} AND cl.category_id IN (?); ${Queries.getPropertiesProductsByIds}; SELECT id, guarantee FROM product WHERE id IN (?); `,
        [
          categoriesIds,
          language_id,
          productIds,
          language_id,
          language_id,
          language_id,
          language_id,
          productIds,
          categoriesIds,
          language_id,
          language_id,
          productIds,
          productIds,
        ]
      );

      return res.status(200).json({
        categoryCharacteristics: rows[0],
        productsCharacteristics: rows[1],
        productsInfo: rows[2],
        categoryInfo: rows[3],
        relationProducts: rows[4],
        guarantee: rows[5],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new pagesController();
