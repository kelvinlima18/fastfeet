import Signature from '../models/Signature';
import Delivery from '../models/Delivery';

class DeliveryReceivedController {
  async store(req, res) {
    const { id, deliveries_id } = req.params;
    const { originalname: name, filename: path } = req.file;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
      },
    });

    if (!delivery.start_date || !delivery) {
      return res.status(400).json({ error: 'Delivery not picked up' });
    }

    const file = await Signature.create({
      name,
      path,
    });

    await delivery.update({
      signature_id: file.id,
      end_date: new Date(),
    });

    return res.json(delivery);
  }
}

export default new DeliveryReceivedController();
