import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipients = await Recipient.create(req.body);

    return res.json(recipients);
  }

  async index(req, res) {
    const { name, page = 1, quantity = 10 } = req.query;

    const recipients = await Recipient.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: name ? { name: { [Op.iLike]: `%${name}%` } } : null,
      order: ['name'],
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipients = await Recipient.findByPk(id);

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name, street, number, complement, state, city, cep } = req.body;

    const recipients = await Recipient.findByPk(id);

    await recipients.update({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });

    return res.json(recipients);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Recipient.destroy({ where: { id } });

    return res.send();
  }
}

export default new RecipientController();
