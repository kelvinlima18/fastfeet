import { Op } from 'sequelize';
import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { id, page = 1, quantity = 10 } = req.params;

    const deliverysProblem = await DeliveryProblem.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: id ? { id: { [Op.iLike]: `%${id}` } } : null,
      order: ['id'],
    });

    if (!deliverysProblem) {
      return res.status(400).json({ error: 'Deliverys problem not found' });
    }

    return res.json(deliverysProblem);
  }

  async show(req, res) {
    const { id: delivery_id } = req.params;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id },
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'Delivery problem not found' });
    }

    return res.json(deliveryProblems);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      canceled_at: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { canceled_at } = req.body;

    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery problem not found' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id, {
      include: [
        {
          model: DeliveryMan,
          as: 'delivery_man',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'state', 'cep'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (!delivery.start_date) {
      return res.status(400).json({ error: 'Delivery not picked up' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery completed' });
    }

    const canceledDelivery = await delivery.update({
      canceled_at,
    });

    await Queue.add(CancellationMail.key, {
      delivery,
      deliveryProblem,
    });

    return res.json(canceledDelivery);
  }
}

export default new DeliveryProblemController();
