import { useMemo } from "react";

import { useLocalization, useMessages } from "../../contexts/LocalizationContext";
import type { InventorySummary } from "../../types";

interface KpiGridProps {
  summary: InventorySummary | null;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
}

function KpiGrid({ summary }: KpiGridProps): JSX.Element {
  const { formatCurrency } = useLocalization();
  const {
    admin: { metrics }
  } = useMessages();

  const items = useMemo(() => {
    if (!summary) {
      return metrics.placeholders;
    }
    return [
      { label: metrics.totalProducts, value: formatNumber(summary.totalProducts) },
      { label: metrics.totalStock, value: formatNumber(summary.totalStock) },
      { label: metrics.totalSold, value: formatNumber(summary.totalSold) },
      { label: metrics.inventoryValue, value: formatCurrency(summary.inventoryValue) },
      { label: metrics.salesRevenue, value: formatCurrency(summary.salesRevenue) },
      { label: metrics.potentialRevenue, value: formatCurrency(summary.potentialRevenue) }
    ];
  }, [summary, metrics, formatCurrency]);

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
