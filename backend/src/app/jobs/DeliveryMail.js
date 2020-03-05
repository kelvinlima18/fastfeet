import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliverymanExists, deliveries, recipientExists } = data;

    await Mail.sendMail({
      to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
      subject: 'Você tem uma nova entrega!!!',
      template: 'delivery',
      context: {
        deliveryman: deliverymanExists.name,
        product: deliveries.product,
        name: recipientExists.name,
        street: recipientExists.street,
        number: recipientExists.number,
        city: recipientExists.city,
        state: recipientExists.state,
        cep: recipientExists.cep,
      },
    });
  }
}

export default new DeliveryMail();
