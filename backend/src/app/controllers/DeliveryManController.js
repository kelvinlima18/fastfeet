import { Op } from 'sequelize';
import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import Avatar from '../models/Avatar';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const deliveryManExist = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExist) {
      return res.status(400).json({ error: 'Delivery Man already exists' });
    }

    const deliveryMans = await DeliveryMan.create(req.body);

    return res.json(deliveryMans);
  }

  async index(req, res) {
    const { name, page = 1, quantity = 10 } = req.params;

    const deliveryMans = await DeliveryMan.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: name ? { name: { [Op.iLike]: `%${name}` } } : null,
      order: ['name'],
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMans);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryMans = await DeliveryMan.findByPk(id);

    return res.json(deliveryMans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const deliveryManExist = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExist) {
      return res.status(400).json({ error: 'Delivery Man already exists' });
    }

    const deliveryMans = await DeliveryMan.findByPk(req.params.id);

    await deliveryMans.update(req.body);

    return res.json(deliveryMans);
  }

  async delete(req, res) {
    const { id } = req.params;

    await DeliveryMan.destroy({ where: { id } });

    return res.send();
  }
}

export default new DeliveryManController();
