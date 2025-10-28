import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useMessages } from "../../contexts/LocalizationContext";

function AdminAccessForm(): JSX.Element {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const {
    admin: { gate }
  } = useMessages();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(code);
      if (success) {
        setError(null);
        navigate("/admin", { replace: true });
      } else {
        setError(gate.error);
      }
    } catch (err) {
      console.error("Admin login failed", err);
      setError(gate.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-gate">
      <div className="admin-gate__card" role="dialog" aria-modal="true" aria-labelledby="admin-gate-title">
        <form onSubmit={handleSubmit} className="admin-gate__form">
          <div className="admin-gate__header">
            <h1 id="admin-gate-title">{gate.title}</h1>
            <p>{gate.subtitle}</p>
          </div>
          <label className="admin-gate__label">
            <span>{gate.label}</span>
            <input
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder={gate.placeholder}
              autoFocus
            />
          </label>
          {error ? <p className="admin-gate__error">{error}</p> : null}
          <button type="submit" className="admin-gate__submit" disabled={isSubmitting}>
            {gate.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAccessForm;
