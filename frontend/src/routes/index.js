import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import DeliveryMan from '~/pages/DeliveryMan';
import DeliveryManForm from '~/pages/DeliveryMan/Form';
import DeliveryProblem from '~/pages/DeliveryProblem';
import Recipient from '~/pages/Recipient';
import RecipientForm from '~/pages/Recipient/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/delivery-new" component={DeliveryForm} isPrivate />
      <Route path="/delivery-edit/:id" component={DeliveryForm} isPrivate />
      <Route path="/deliveryman" component={DeliveryMan} isPrivate />
      <Route path="/deliveryman-new" component={DeliveryManForm} isPrivate />
      <Route
        path="/deliveryman-edit/:id"
        component={DeliveryManForm}
        isPrivate
      />
      <Route path="/delivery-problem" component={DeliveryProblem} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/recipient-new" component={RecipientForm} isPrivate />
      <Route path="/recipient-edit/:id" component={RecipientForm} isPrivate />
    </Switch>
  );
}
