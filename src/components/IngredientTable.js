import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteIngredient, updateIngredient } from '../api/ingredientData';

function IngredientTable({ ingredientObj, onUpdate }) {
  const deleteThisIngredient = () => {
    if (window.confirm(`Delete ${ingredientObj.name}?`)) {
      deleteIngredient(ingredientObj.firebaseKey).then(() => onUpdate());
    }
  };

  const updateThis = () => {
    updateIngredient(ingredientObj).then(() => onUpdate);
  };

  return (
    <tr>
      <td>
        {ingredientObj.name}
        <Button onClick={deleteThisIngredient}>Delete</Button>
        <Button onClick={updateThis}>Edit</Button>
        <Link href={`/ingredient/edit/${ingredientObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </td>
      <td>{ingredientObj.qty}</td>
    </tr>
  );
}

IngredientTable.propTypes = {
  ingredientObj: PropTypes.shape({
    name: PropTypes.string,
    qty: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default IngredientTable;
