import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import type { ProductDraft } from "../../types";
import { useMessages } from "../../contexts/LocalizationContext";

interface ProductFormDrawerProps {
  open: boolean;
  mode: "create" | "edit";
  initialValues: ProductDraft;
  onSubmit: (values: ProductDraft) => Promise<void> | void;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  stock?: string;
  sold?: string;
  cost?: string;
}

const defaultValues: ProductDraft = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image: null,
  tags: [],
  stock: 0,
  sold: 0,
  cost: 0
};

function ProductFormDrawer({ open, mode, initialValues, onSubmit, onClose }: ProductFormDrawerProps): JSX.Element | null {
  const {
    admin: { form }
  } = useMessages();
  const [values, setValues] = useState<ProductDraft>(initialValues ?? defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(initialValues ?? defaultValues);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [open, initialValues]);

  const tagsInput = useMemo(() => values.tags.join(", "), [values.tags]);

  if (!open) {
    return null;
  }

  const handleIntegerChange = (field: "price" | "cost" | "stock" | "sold") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      if (rawValue === "") {
        setValues((prev) => ({ ...prev, [field]: 0 }));
        return;
      }

      const parsed = Number(rawValue);
      if (!Number.isFinite(parsed)) {
        return;
      }

      setValues((prev) => ({
        ...prev,
        [field]: Math.max(0, Math.round(parsed))
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = form.validation.name;
    }
    if (!values.category.trim()) {
      nextErrors.category = form.validation.category;
    }
    if (Number.isNaN(values.price) || values.price < 0) {
      nextErrors.price = form.validation.price;
    }
    if (!Number.isFinite(values.stock) || values.stock < 0) {
      nextErrors.stock = form.validation.stock;
    }
    if (!Number.isFinite(values.sold) || values.sold < 0) {
      nextErrors.sold = form.validation.sold;
    }
    if (!Number.isFinite(values.cost) || values.cost < 0) {
      nextErrors.cost = form.validation.cost;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    const payload: ProductDraft = {
      ...values,
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean)
    };

    try {
      await onSubmit(payload);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="admin-form-title">
      <div className="admin-drawer__backdrop" onClick={onClose} aria-hidden />
      <div className="admin-drawer__panel">
        <form className="admin-form" onSubmit={handleSubmit}>
          <header className="admin-form__header">
            <h2 id="admin-form-title">{mode === "create" ? form.createTitle : form.editTitle}</h2>
            <p>{form.description}</p>
          </header>
          <div className="admin-form__grid">
            <label>
              <span>{form.fields.name}</span>
              <input
                value={values.name}
                onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              {errors.name ? <small className="admin-form__error">{errors.name}</small> : null}
            </label>
            <label>
              <span>{form.fields.category}</span>
              <input
                value={values.category}
                onChange={(event) => setValues((prev) => ({ ...prev, category: event.target.value }))}
                required
              />
              {errors.category ? <small className="admin-form__error">{errors.category}</small> : null}
            </label>
            <label>
              <span>{form.fields.price}</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                value={values.price}
                onChange={handleIntegerChange("price")}
              />
              {errors.price ? <small className="admin-form__error">{errors.price}</small> : null}
            </label>
            <label>
              <span>{form.fields.cost}</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                value={values.cost}
                onChange={handleIntegerChange("cost")}
              />
              {errors.cost ? <small className="admin-form__error">{errors.cost}</small> : null}
            </label>
            <label>
              <span>{form.fields.stock}</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                value={values.stock}
                onChange={handleIntegerChange("stock")}
              />
              {errors.stock ? <small className="admin-form__error">{errors.stock}</small> : null}
            </label>
            <label>
              <span>{form.fields.sold}</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                value={values.sold}
                onChange={handleIntegerChange("sold")}
              />
              {errors.sold ? <small className="admin-form__error">{errors.sold}</small> : null}
            </label>
            <label className="admin-form__full">
              <span>{form.fields.description}</span>
              <textarea
                value={values.description}
                rows={3}
                onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
            <label className="admin-form__full">
              <span>{form.fields.image}</span>
              <input
                value={values.image ?? ""}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, image: event.target.value.trim() || null }))
                }
              />
            </label>
            <label className="admin-form__full">
              <span>{form.fields.tags}</span>
              <input
                value={tagsInput}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, tags: event.target.value.split(",") }))
                }
                placeholder={form.fields.tagsPlaceholder}
              />
            </label>
          </div>
          <footer className="admin-form__footer">
            <button type="button" onClick={onClose} className="admin-form__secondary">
              {form.cancel}
            </button>
            <button type="submit" className="admin-form__primary" disabled={isSubmitting}>
              {mode === "create" ? form.createCta : form.saveCta}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default ProductFormDrawer;
