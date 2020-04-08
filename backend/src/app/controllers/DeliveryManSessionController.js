import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;

    const deliveryMan = await DeliveryMan.findOne({ where: { id } });

    if (!deliveryMan) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    const { name, email } = deliveryMan;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
