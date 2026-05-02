import { Link } from 'react-router-dom';
import { fmt, numeroFactura } from '../utils/format.js';
import InvoiceEstadoBadge from './InvoiceEstadoBadge.jsx';

export default function InvoicesTable({ invoices }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Facturas recientes</h3>
        <span className="text-xs text-slate-500">{invoices.length} mostradas</span>
      </div>
      {invoices.length === 0 ? (
        <p className="p-6 text-slate-500 text-sm text-center">Aun no hay facturas.</p>
      ) : (
        <>
          <div className="md:hidden divide-y divide-slate-100">
            {invoices.map((i) => (
              <Link key={i.id} to={`/finanzas/factura/${i.id}`} className="block p-4 active:bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-semibold text-brand-700">{numeroFactura(i)}</div>
                    <div className="text-sm text-slate-900 truncate">{i.paciente_nombre}</div>
                    <div className="text-xs text-slate-500 mt-1">{i.fecha}</div>
                  </div>
                  <InvoiceEstadoBadge estado={i.estado} />
                </div>
                <div className="mt-3 grid grid-cols-1 min-[380px]:grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="tabular-nums text-slate-700">{fmt(i.total)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Pagado</div>
                    <div className="tabular-nums text-emerald-700">{fmt(i.pagado)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Balance</div>
                    <div className="tabular-nums font-medium text-slate-900">
                      {i.estado === 'anulada' ? '-' : fmt(i.total - i.pagado)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-xs uppercase text-slate-600 tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Numero</th>
                  <th className="text-left px-4 py-3 font-semibold">Fecha</th>
                  <th className="text-left px-4 py-3 font-semibold">Paciente</th>
                  <th className="text-right px-4 py-3 font-semibold">Total</th>
                  <th className="text-right px-4 py-3 font-semibold">Pagado</th>
                  <th className="text-right px-4 py-3 font-semibold">Balance</th>
                  <th className="text-left px-4 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/finanzas/factura/${i.id}`} className="font-mono text-brand-600 hover:text-brand-700">
                        {numeroFactura(i)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{i.fecha}</td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/pacientes/${i.patient_id}`} className="text-slate-900 hover:text-brand-700">{i.paciente_nombre}</Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-right tabular-nums text-slate-700 whitespace-nowrap">{fmt(i.total)}</td>
                    <td className="px-4 py-3 text-sm text-right tabular-nums text-emerald-700 whitespace-nowrap">{fmt(i.pagado)}</td>
                    <td className="px-4 py-3 text-sm text-right tabular-nums font-medium whitespace-nowrap">
                      {i.estado === 'anulada' ? '-' : fmt(i.total - i.pagado)}
                    </td>
                    <td className="px-4 py-3"><InvoiceEstadoBadge estado={i.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
