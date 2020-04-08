import Delivery from '../models/Delivery';

class DeliveryReceivedController {
  async update(req, res) {
    const { id, deliveries_id } = req.params;
    const { signature_id } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
      },
    });

    if (!delivery.start_date || !delivery) {
      return res.status(400).json({ error: 'Delivery not picked up' });
    }

    await delivery.update({
      signature_id,
      end_date: new Date(),
    });

    return res.json(delivery);
  }
}

export default new DeliveryReceivedController();
