import type { Product } from "../../types";
import { useLocalization, useMessages } from "../../contexts/LocalizationContext";

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function InventoryTable({ products, onEdit, onDelete }: InventoryTableProps): JSX.Element {
  const { formatCurrency } = useLocalization();
  const {
    admin: { inventory }
  } = useMessages();

  return (
    <section className="admin-section" aria-labelledby="admin-inventory-heading">
      <div className="admin-section__header">
        <h2 id="admin-inventory-heading">{inventory.title}</h2>
        <p>{inventory.subtitle}</p>
      </div>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th scope="col">{inventory.columns.name}</th>
              <th scope="col">{inventory.columns.category}</th>
              <th scope="col">{inventory.columns.stock}</th>
              <th scope="col">{inventory.columns.sold}</th>
              <th scope="col">{inventory.columns.price}</th>
              <th scope="col">{inventory.columns.actions}</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-table__empty">
                  {inventory.empty}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.name}</th>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td className="admin-table__actions">
                    <button type="button" onClick={() => onEdit(product)}>
                      {inventory.actions.edit}
                    </button>
                    <button type="button" onClick={() => onDelete(product)}>
                      {inventory.actions.delete}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InventoryTable;
