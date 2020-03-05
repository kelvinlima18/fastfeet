import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async Handle({ data }) {
    const { delivery, deliveryProblem } = data;

    await Mail.sendMail({
      to: `${delivery.delivery_man.name} <${delivery.delivery_man.email}>`,
      subject: `Entrega #${delivery.id} Cancelada`,
      template: 'cancellation',
      context: {
        deliveryman: delivery.delivery_man.name,
        deliveryId: delivery.id,
        product: delivery.product,
        startDate: format(
          parseISO(delivery.start_date),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        description: deliveryProblem.description,
        name: delivery.recipient.name,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        cep: delivery.recipient.cep,
      },
    });
  }
}

export default new CancellationMail();
