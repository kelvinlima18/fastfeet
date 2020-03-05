import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (!this.start_date && !this.end_date && !this.canceled_at) {
              return 'PENDENTE';
            }
            if (this.start_date && !this.end_date && !this.canceled_at) {
              return 'RETIRADA';
            }
            if (this.start_date && this.end_date && !this.canceled_at) {
              return 'ENTREGUE';
            }
            if (this.start_date && !this.end_date && this.canceled_at) {
              return 'CANCELADA';
            }
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.DeliveryMan, {
      foreignKey: 'deliveryman_id',
      as: 'delivery_man',
    });
    this.belongsTo(models.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
