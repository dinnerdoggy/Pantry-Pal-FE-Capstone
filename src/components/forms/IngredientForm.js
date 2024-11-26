'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createIngredient, updateIngredient } from '../../api/ingredientData';

const initialState = {
  userId: '',
  name: '',
  qty: '',
  unit: '',
};

export default function IngredientForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // If there's a FB key, use update, if not, use create
      updateIngredient(formInput).then(() => router.push('/ingredient'));
    } else {
      const payload = { ...formInput, userId: user.uid };
      createIngredient(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateIngredient(patchPayload).then(() => {
          router.push('/ingredient');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Ingredient</h2>
      <div className="d-flex mb-3">
        <Form.Group className="flex-grow-1" label="Ingredient Name" controlId="exampleForm.ControlInput1">
          <Form.Label>Ingredient</Form.Label>
          <Form.Control type="text" placeholder="Ingredient" name="name" value={formInput.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" placeholder="Qty." />
        </Form.Group>
      </div>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Ingredient</Button>
    </Form>
  );
}

IngredientForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};
