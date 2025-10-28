import { useMemo } from "react";

import { useMessages } from "../../contexts/LocalizationContext";
import type { CategoryBreakdown } from "../../types";

interface SalesChartProps {
  categories: CategoryBreakdown[];
}

function SalesChart({ categories }: SalesChartProps): JSX.Element {
  const {
    admin: { sales }
  } = useMessages();

  const maxRevenue = useMemo(() => {
    return categories.reduce((max, item) => Math.max(max, item.salesRevenue), 0);
  }, [categories]);

  return (
    <section className="admin-section" aria-labelledby="admin-sales-heading">
      <div className="admin-section__header">
        <h2 id="admin-sales-heading">{sales.title}</h2>
        <p>{sales.subtitle}</p>
      </div>
      <div className="admin-sales-chart">
        {categories.length === 0 ? (
          <p className="admin-sales-chart__empty">{sales.empty}</p>
        ) : (
          <ul>
            {categories.map((category) => {
              const ratio = maxRevenue ? category.salesRevenue / maxRevenue : 0;
              return (
                <li key={category.category}>
                  <div className="admin-sales-chart__label">
                    <span>{category.category}</span>
                    <span>{category.salesRevenue.toLocaleString()}</span>
                  </div>
                  <div className="admin-sales-chart__bar">
                    <span style={{ width: `${Math.max(ratio * 100, 4)}%` }} aria-hidden />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default SalesChart;
