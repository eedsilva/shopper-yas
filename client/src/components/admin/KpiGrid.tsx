import { useMemo } from "react";

import { useLocalization, useMessages } from "../../contexts/LocalizationContext";
import type { InventorySummary, OrderSummary } from "../../types";

interface KpiGridProps {
  summary: InventorySummary | null;
  orderSummary: OrderSummary | null;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
}

function KpiGrid({ summary, orderSummary }: KpiGridProps): JSX.Element {
  const { formatCurrency } = useLocalization();
  const {
    admin: { metrics }
  } = useMessages();

  const items = useMemo(() => {
    const inventoryItems = summary
      ? [
          { label: metrics.totalProducts, value: formatNumber(summary.totalProducts) },
          { label: metrics.totalStock, value: formatNumber(summary.totalStock) },
          { label: metrics.totalSold, value: formatNumber(summary.totalSold) },
          { label: metrics.inventoryValue, value: formatCurrency(summary.inventoryValue) },
          { label: metrics.salesRevenue, value: formatCurrency(summary.salesRevenue) },
          { label: metrics.potentialRevenue, value: formatCurrency(summary.potentialRevenue) }
        ]
      : metrics.placeholders.slice(0, 6);

    const orderItems = orderSummary
      ? [
          { label: metrics.totalOrders, value: formatNumber(orderSummary.totalOrders) },
          { label: metrics.pendingOrders, value: formatNumber(orderSummary.pendingOrders) },
          { label: metrics.paidOrders, value: formatNumber(orderSummary.paidOrders) },
          { label: metrics.averageOrderValue, value: formatCurrency(orderSummary.averageOrderValue) }
        ]
      : metrics.placeholders.slice(6);

    return [...inventoryItems, ...orderItems];
  }, [summary, orderSummary, metrics, formatCurrency]);

  return (
    <section className="admin-section" aria-labelledby="admin-metrics-heading">
      <div className="admin-section__header">
        <h2 id="admin-metrics-heading">{metrics.title}</h2>
        <p>{metrics.subtitle}</p>
      </div>
      <div className="admin-kpi-grid">
        {items.map((item) => (
          <article key={item.label} className="admin-kpi-card">
            <p className="admin-kpi-card__label">{item.label}</p>
            <p className="admin-kpi-card__value">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KpiGrid;
