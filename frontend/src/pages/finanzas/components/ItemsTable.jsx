import { fmt } from '../utils/format.js';

export default function ItemsTable({ items, subtotal, impuesto, total, totalLabel = 'TOTAL', extraRows, mobileExtraRows }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card mb-6">
      <div className="md:hidden divide-y divide-slate-100">
        {items.map(it => (
          <div key={it.id} className="p-4">
            <div className="text-sm font-medium text-slate-900 break-words">{it.descripcion}</div>
            <div className="mt-3 grid grid-cols-1 min-[380px]:grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-xs text-slate-400">Cant.</div>
                <div className="tabular-nums text-slate-700">{it.cantidad}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Unitario</div>
                <div className="tabular-nums text-slate-700">{fmt(it.precio_unitario)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Subtotal</div>
                <div className="tabular-nums font-medium text-slate-900">{fmt(it.subtotal)}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-slate-50 p-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="tabular-nums">{fmt(subtotal)}</span>
          </div>
          {impuesto > 0 && (
            <div className="flex justify-between gap-3">
              <span className="text-slate-600">Impuesto</span>
              <span className="tabular-nums">{fmt(impuesto)}</span>
            </div>
          )}
          <div className="flex justify-between gap-3 border-t border-slate-200 pt-3">
            <span className="font-semibold text-slate-900">{totalLabel}</span>
            <span className="tabular-nums font-semibold text-brand-700 text-lg">{fmt(total)}</span>
          </div>
          {mobileExtraRows}
        </div>
      </div>

      <table className="hidden md:table w-full">
        <thead className="bg-slate-50 text-xs uppercase text-slate-600 tracking-wider">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Descripción</th>
            <th className="text-right px-4 py-3 font-semibold w-20">Cant.</th>
            <th className="text-right px-4 py-3 font-semibold w-32">P. Unit.</th>
            <th className="text-right px-4 py-3 font-semibold w-32">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map(it => (
            <tr key={it.id}>
              <td className="px-4 py-3 text-sm text-slate-900">{it.descripcion}</td>
              <td className="px-4 py-3 text-sm text-right tabular-nums">{it.cantidad}</td>
              <td className="px-4 py-3 text-sm text-right tabular-nums">{fmt(it.precio_unitario)}</td>
              <td className="px-4 py-3 text-sm text-right tabular-nums font-medium">{fmt(it.subtotal)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 text-sm">
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right text-slate-600">Subtotal</td>
            <td className="px-4 py-2 text-right tabular-nums">{fmt(subtotal)}</td>
          </tr>
          {impuesto > 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-2 text-right text-slate-600">Impuesto</td>
              <td className="px-4 py-2 text-right tabular-nums">{fmt(impuesto)}</td>
            </tr>
          )}
          <tr className="border-t border-slate-200">
            <td colSpan={3} className="px-4 py-3 text-right font-semibold text-slate-900">{totalLabel}</td>
            <td className="px-4 py-3 text-right tabular-nums font-semibold text-brand-700 text-lg">{fmt(total)}</td>
          </tr>
          {extraRows}
        </tfoot>
      </table>
    </div>
  );
}
