import {
  parseISO,
  startOfHour,
  setHours,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryStatusController {
  async index(req, res) {
    const { id } = req.params;
    const { delivered } = req.query;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: delivered ? { [Op.ne]: null } : null,
      },
      order: ['id'],
      attributes: [
        'id',
        'product',
        'createdAt',
        'start_date',
        'end_date',
        'canceled_at',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'No deliveries' });
    }

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id, deliveries_id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
        canceled_at: null,
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, deliveries_id } = req.params;
    const { start_date } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const startDate = parseISO(start_date);

    const initialTime = setHours(startOfHour(startDate), 8);
    const endTime = setHours(startOfHour(startDate), 18);

    if (isBefore(startDate, initialTime) || isAfter(startDate, endTime)) {
      return res
        .status(400)
        .json({ error: 'Delivery pick-up must be made between 8 am and 6 pm' });
    }

    const deliveryInDay = await Delivery.findAll({
      where: {
        id: deliveries_id,
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(endTime)],
        },
      },
    });

    if (deliveryInDay.length > 5) {
      return res
        .status(401)
        .json({ error: 'Authorized only 5 withdrawals per day' });
    }

    await delivery.update({
      start_date,
    });

    return res.json(delivery);
  }
}

export default new DeliveryStatusController();
