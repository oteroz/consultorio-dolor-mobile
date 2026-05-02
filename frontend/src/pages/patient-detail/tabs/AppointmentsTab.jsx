import { useEffect, useState } from 'react';
import { Calendar as CalIcon } from 'lucide-react';
import { StatusBadge } from '../shared/Badges.jsx';
import EmptyState from '../shared/EmptyState.jsx';
import { getPatientAppointments } from '../services/patientDetailService.js';

export default function AgendaTab({ patient }) {
  const [appts, setAppts] = useState([]);
  useEffect(() => {
    const desde = new Date(); desde.setMonth(desde.getMonth() - 6);
    const hasta = new Date(); hasta.setMonth(hasta.getMonth() + 3);
    getPatientAppointments(patient.id, desde.toISOString().slice(0,10), hasta.toISOString().slice(0,10))
      .then(setAppts);
  }, [patient.id]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Agenda del paciente</h2>
      {appts.length === 0 ? (
        <EmptyState icon={CalIcon} text="Sin citas registradas." />
      ) : (
        <ul className="space-y-2">
          {appts.map(a => (
            <li key={a.id} className="bg-white border border-slate-200 rounded-xl p-3 text-sm flex justify-between items-start gap-3 shadow-card">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-900">{a.fecha}</span>
                  {a.hora && <span className="text-slate-500 font-mono">{a.hora}</span>}
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {a.tipo === 'walkin' ? 'Sin cita' : a.tipo === 'followup' ? 'Seguimiento' : 'Cita'}
                  </span>
                </div>
                {a.motivo && <div className="text-slate-500 mt-1 break-words">{a.motivo}</div>}
              </div>
              <StatusBadge estado={a.estado} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
