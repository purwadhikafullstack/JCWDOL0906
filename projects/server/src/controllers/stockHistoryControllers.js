const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;

module.exports = {  
  fetchStockHistory: async(req, res) => {
  try {
    console.log("query", req.query);
    // Sort by id
    // const sortByDate = req.query.sortDate;
    // const filterByproduct = req.query.searchProduct;
    const filterByDate = req.query.date;

    // console.log("sortBydate", sortByDate);
    // console.log("product", filterByproduct);
    console.log("filterBydate", filterByDate);

    let startDate = filterByDate ? filterByDate[0] : null;
    let endDate = filterByDate ? filterByDate[1] : null;
    console.log("dikasih", startDate);
    console.log("dibuang", endDate)
    if (startDate && endDate) {
      startDate += " 00:00:00";
      endDate += " 23:59:59";
    }

    console.log("start", startDate);
    console.log("end", endDate);

    let clauseFilterByDate =
      startDate && endDate
        ? `WHERE s.createdAt BETWEEN '${startDate}' AND '${endDate}'`
        : "";
        console.log("sabar",clauseFilterByDate);
    // let clauseFilterByProduct = filterByproduct
    //   ? `WHERE (P.name LIKE '%${filterByproduct}%' OR TD.product_name LIKE '%${filterByproduct}%')`
    //   : "";

    // let ClauseSortByDate =
    //   sortByDate === "Newer"
    //     ? "ORDER BY SH.createdAt ASC"
    //     : sortByDate === "Older"
    //     ? "ORDER BY SH.createdAt DESC"
    //     : "";

    /**
     * Question:
     * 1. kenapa filter dari tanggal awal di database hingga 2023-12-05 tidak keluar tgl 5 ya
     */
    const data = await sequelize.query(
      `SELECT t.id id_out, s.id id_in, t.createdAt createdAt_out, 
        ifnull(td.qty, "-") qty_in,
        ifnull(p.product_name, "-") product_name_out,
        ifnull(p2.product_name, "-") product_name_in,
        ifnull(s.default_unit_qty, "-") default_unit_qty_in, ifnull(s.createdAt, "-") createdAt_in,
        ifnull(du.unit_name, "-") unit_name_in
        FROM Transactions t
        LEFT join Transaction_Details td on t.transaction_code = td.transaction_code
        left join Products p on td.product_id = p.id
        left join stocks s on p.id = s.product_id
        left join Products p2 on s.product_id = p2.id
        left join default_unit du on s.default_unit_id = du.id
        ${clauseFilterByDate} ;`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    // console.log("ini datanya", data);
    return res.status(200).send({ df: data });
  } catch (error) {
    console.log("error", error);
  }
}
};
// ${clauseFilterByProduct}  ${ClauseSortByDate}