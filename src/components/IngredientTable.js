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
      <td>{ingredientObj.name}</td>
      <td>{ingredientObj.qty}</td>
      <td className="btn-cell">
        <Link href={`/ingredient/edit/${ingredientObj.firebaseKey}`} passHref>
          <Button onClick={updateThis} className="btn-cell" variant="info">
            EDIT
          </Button>
        </Link>
        <Button className="deleteBtn" onClick={deleteThisIngredient}>
          Delete
        </Button>
      </td>
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
