import { Op } from 'sequelize';
import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Signature from '../models/Signature';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await DeliveryMan.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Unregistered DeliveryMan' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveries = await Delivery.create(req.body);

    await Queue.add(DeliveryMail.key, {
      deliverymanExists,
      deliveries,
      recipientExists,
    });

    return res.json(deliveries);
  }

  async index(req, res) {
    const { product, page = 1, quantity = 10 } = req.query;

    const deliveries = await Delivery.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: { product: { [Op.iLike]: `%${product}%` } },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: DeliveryMan,
          as: 'delivery_man',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: DeliveryMan,
          as: 'delivery_man',
          attributes: ['name', 'email'],
        },
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
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await DeliveryMan.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Unregistered DeliveryMan' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveries = await Delivery.findByPk(req.params.id);

    await deliveries.update(req.body);

    return res.json(deliveries);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Delivery.destroy({ where: { id } });

    return res.send();
  }
}

export default new DeliveryController();
