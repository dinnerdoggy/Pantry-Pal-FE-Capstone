import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteIngredient } from '../api/ingredientData';

function IngredientTable({ ingredientObj, onUpdate }) {
  const deleteThisIngredient = () => {
    if (window.confirm(`Delete ${ingredientObj.name}?`)) {
      deleteIngredient(ingredientObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <tr>
      <td>
        {ingredientObj.name}
        <Button onClick={deleteThisIngredient}>Delete</Button>
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
