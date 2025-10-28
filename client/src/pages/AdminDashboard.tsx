import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  fetchCategoryBreakdown,
  fetchInventorySummary,
  fetchProducts,
  updateProduct
} from "../api/products";
import {
  InventoryTable,
  KpiGrid,
  ProductFormDrawer,
  SalesChart
} from "../components/admin";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useMessages } from "../contexts/LocalizationContext";
import type { CategoryBreakdown, InventorySummary, Product, ProductDraft } from "../types";

interface DrawerStateClosed {
  open: false;
}

interface DrawerStateCreate {
  open: true;
  mode: "create";
}

interface DrawerStateEdit {
  open: true;
  mode: "edit";
  product: Product;
}

type DrawerState = DrawerStateClosed | DrawerStateCreate | DrawerStateEdit;

type ToastState = {
  type: "success" | "error";
  message: string;
};

function createDraft(product?: Product | null): ProductDraft {
  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    category: product?.category ?? "",
    image: product?.image ?? null,
    tags: product?.tags ? [...product.tags] : [],
    stock: product?.stock ?? 0,
    sold: product?.sold ?? 0,
    cost: product?.cost ?? 0
  };
}

function AdminDashboard(): JSX.Element {
  const { logout } = useAdminAuth();
  const messages = useMessages();
  const {
    admin: { intro, notifications }
  } = messages;

  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [drawerState, setDrawerState] = useState<DrawerState>({ open: false });
  const [toast, setToast] = useState<ToastState | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setStatus("loading");
        const [productData, summaryData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchInventorySummary(),
          fetchCategoryBreakdown()
        ]);
        if (cancelled) {
          return;
        }
        setProducts(productData);
        setSummary(summaryData);
        setCategories(categoryData);
        setError(null);
        setStatus("idle");
      } catch (err) {
        if (cancelled) {
          return;
        }
        setStatus("error");
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const refreshMetrics = useCallback(async () => {
    try {
      const [summaryData, categoryData] = await Promise.all([
        fetchInventorySummary(),
        fetchCategoryBreakdown()
      ]);
      setSummary(summaryData);
      setCategories(categoryData);
    } catch (err) {
      console.error("Failed to refresh metrics", err);
    }
  }, []);

  const handleCreateProduct = useCallback(
    async (draft: ProductDraft) => {
      const tempId = -Date.now();
      const now = new Date().toISOString();
      const optimisticProduct: Product = {
        ...draft,
        id: tempId,
        createdAt: now,
        updatedAt: now
      };
      setProducts((previous) => [optimisticProduct, ...previous]);

      try {
        const saved = await createProduct(draft);
        if (!saved) {
          throw new Error("Create failed");
        }
        setProducts((previous) =>
          previous.map((product) => (product.id === tempId ? saved : product))
        );
        setToast({ type: "success", message: notifications.createSuccess(saved.name) });
        await refreshMetrics();
      } catch (err) {
        setProducts((previous) => previous.filter((product) => product.id !== tempId));
        setToast({ type: "error", message: notifications.createError });
        throw err;
      }
    },
    [notifications.createError, notifications.createSuccess, refreshMetrics]
  );

  const handleUpdateProduct = useCallback(
    async (target: Product, draft: ProductDraft) => {
      const previousProducts = products;
      setProducts((current) =>
        current.map((product) =>
          product.id === target.id
            ? {
                ...product,
                ...draft,
                tags: [...draft.tags],
                updatedAt: new Date().toISOString()
              }
            : product
        )
      );

      try {
        const saved = await updateProduct(target.id, draft);
        if (!saved) {
          throw new Error("Update failed");
        }
        setProducts((current) =>
          current.map((product) => (product.id === target.id ? saved : product))
        );
        setToast({ type: "success", message: notifications.updateSuccess(saved.name) });
        await refreshMetrics();
      } catch (err) {
        setProducts(previousProducts);
        setToast({ type: "error", message: notifications.updateError });
        throw err;
      }
    },
    [notifications.updateError, notifications.updateSuccess, products, refreshMetrics]
  );

  const handleDeleteProduct = useCallback(
    async (product: Product) => {
      const confirmed = window.confirm(notifications.confirmDelete(product.name));
      if (!confirmed) {
        return;
      }

      const previousProducts = products;
      setProducts((current) => current.filter((item) => item.id !== product.id));
      try {
        await deleteProduct(product.id);
        setToast({ type: "success", message: notifications.deleteSuccess(product.name) });
        await refreshMetrics();
      } catch (err) {
        setProducts(previousProducts);
        setToast({ type: "error", message: notifications.deleteError });
      }
    },
    [notifications, products, refreshMetrics]
  );

  const openCreateDrawer = () => setDrawerState({ open: true, mode: "create" });
  const openEditDrawer = (product: Product) => setDrawerState({ open: true, mode: "edit", product });
  const closeDrawer = () => setDrawerState({ open: false });

  const drawerValues = useMemo(() => {
    if (!drawerState.open) {
      return createDraft();
    }
    if (drawerState.mode === "edit") {
      return createDraft(drawerState.product);
    }
    return createDraft();
  }, [drawerState]);

  const handleSubmit = async (draft: ProductDraft) => {
    if (!drawerState.open) {
      return;
    }
    if (drawerState.mode === "create") {
      await handleCreateProduct(draft);
      return;
    }
    await handleUpdateProduct(drawerState.product, draft);
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header__content">
          <p className="admin-header__eyebrow">{intro.eyebrow}</p>
          <h1>{intro.title}</h1>
          <p>{intro.subtitle}</p>
        </div>
        <div className="admin-header__actions">
          <button type="button" className="admin-header__primary" onClick={openCreateDrawer}>
            {intro.primaryCta}
          </button>
          <button type="button" className="admin-header__secondary" onClick={logout}>
            {intro.logout}
          </button>
        </div>
      </header>

      {toast ? (
        <div
          className={`admin-toast admin-toast--${toast.type}`}
          role="status"
          aria-live={toast.type === "error" ? "assertive" : "polite"}
        >
          {toast.message}
        </div>
      ) : null}

      {status === "loading" ? <p className="admin-status">{intro.loading}</p> : null}
      {status === "error" && error ? (
        <p role="alert" className="admin-status admin-status--error">
          {intro.error}
        </p>
      ) : null}

      <KpiGrid summary={summary} />
      <InventoryTable products={products} onEdit={openEditDrawer} onDelete={handleDeleteProduct} />
      <SalesChart categories={categories} />

      <ProductFormDrawer
        open={drawerState.open}
        mode={drawerState.open ? drawerState.mode : "create"}
        initialValues={drawerValues}
        onSubmit={handleSubmit}
        onClose={closeDrawer}
      />
    </div>
  );
}

export default AdminDashboard;
