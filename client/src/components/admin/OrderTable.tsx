import { useMemo } from "react";

import { useLocalization, useMessages } from "../../contexts/LocalizationContext";
import type { Order } from "../../types";

interface OrderTableProps {
  orders: Order[];
}

function OrderTable({ orders }: OrderTableProps): JSX.Element {
  const { formatCurrency } = useLocalization();
  const messages = useMessages();
  const {
    admin: { orders: copy },
    checkout
  } = messages;

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "short",
        timeStyle: "short"
      }),
    []
  );

  return (
    <section className="admin-section" aria-labelledby="admin-orders-heading">
      <div className="admin-section__header">
        <h2 id="admin-orders-heading">{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>

      {orders.length === 0 ? (
        <p className="admin-table__empty">{copy.empty}</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th scope="col">{copy.columns.id}</th>
                <th scope="col">{copy.columns.customer}</th>
                <th scope="col">{copy.columns.total}</th>
                <th scope="col">{copy.columns.delivery}</th>
                <th scope="col">{copy.columns.status}</th>
                <th scope="col">{copy.columns.createdAt}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const deliveryOption = checkout.delivery.options.find(
                  (option) => option.value === order.deliveryMethod
                );
                const deliveryName = deliveryOption?.label ?? order.deliveryMethod;
                return (
                  <tr key={order.id}>
                    <th scope="row">#{order.id}</th>
                    <td>
                      <strong>{order.customerName}</strong>
                      <br />
                      <small>{order.customerEmail}</small>
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>{deliveryName}</td>
                    <td>
                      <span
                        className={`admin-status-tag admin-status-tag--${order.status}`}
                        aria-label={order.status === "paid" ? copy.statuses.paid : copy.statuses.pending}
                      >
                        {order.status === "paid" ? copy.statuses.paid : copy.statuses.pending}
                      </span>
                    </td>
                    <td>{dateFormatter.format(new Date(order.createdAt))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OrderTable;
