import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function FormActions({ saving, error, submitLabel, savingLabel = 'Guardando...' }) {
  return (
    <>
      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="flex gap-2 max-sm:sticky max-sm:bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] max-sm:z-20 max-sm:-mx-1 max-sm:rounded-xl max-sm:bg-slate-50/95 max-sm:p-2 max-sm:backdrop-blur">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex flex-1 sm:flex-none justify-center items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm disabled:opacity-50"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? savingLabel : submitLabel}
        </button>
        <Link to="/finanzas" className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-medium">Cancelar</Link>
      </div>
    </>
  );
}
