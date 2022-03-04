import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_id: Sequelize.INTEGER,
        seller_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        name_product: Sequelize.STRING,
        price_product: Sequelize.DOUBLE,
        discount: Sequelize.DOUBLE,
        price_total: Sequelize.DOUBLE,
        quantity: Sequelize.DOUBLE,
        status: Sequelize.ENUM( 'open', 'closed', 'sold' )
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'products' });
    this.belongsTo(models.FinancialBox, { foreignKey: 'financial_id', as: 'financial' });
  }
}

export default Order;
