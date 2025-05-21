import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = 'http://localhost:3000/usuarios';

function Personas() {
  const [personas, setPersons] = useState([]);
  const [persona, setPerson] = useState({ name: '', email: '', age: 0, gender: '' });
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchPersons = async () => {
    const res = await axios.get(API_URL);
    setPersons(res.data);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleInput = (e) => {
    setPerson({ ...persona, [e.target.name]: e.target.value });
  };

  const openNew = () => {
    setPerson({ name: '', email: '', age: '' });
    setEditMode(false);
    setVisible(true);
  };

  const openEdit = (row) => {
    setPerson(row);
    setEditMode(true);
    setVisible(true);
  };

  const savePerson = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${persona.id}`, persona);
    } else {
      await axios.post(API_URL, persona);
    }
    setVisible(false);
    fetchPersons();
  };

  const deletePerson = async (row) => {
    await axios.delete(`${API_URL}/${row.id}`);
    fetchPersons();
  };

  const exportPDF = () => {
    if (!personas.length) return;
    const doc = new jsPDF();
    doc.text('Listado de Personas', 14, 15);
    const columns = Object.keys(personas[0]);
    const headers = columns.map(col => col.charAt(0).toUpperCase() + col.slice(1));
    const body = personas.map(p => columns.map(col => p[col]));
    autoTable(doc, {
      startY: 20,
      head: [headers],
      body,
    });
    doc.save('personas.pdf');
  };

  return (
    <div>
      <Button label="Nueva Persona" icon="pi pi-plus" className="mb-3 mr-2" onClick={openNew} />
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="mb-3 p-button-danger" onClick={exportPDF} />
      <DataTable value={personas} selectionMode="single" selection={selected} onSelectionChange={e => setSelected(e.value)} dataKey="id" paginator rows={5} className="p-mb-3">
        <Column field="name" header="name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="age" header="age" sortable></Column>
        <Column field="gender" header="gender" sortable></Column>
        <Column
          header="Acciones"
          body={(row) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-3" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deletePerson(row)} />
            </>
          )}
        />
      </DataTable>
      <Dialog header={editMode ? 'Editar Persona' : 'Nueva Persona'} visible={visible} style={{ width: '350px' }} modal onHide={() => setVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Nombre</label>
            <InputText id="name" name="name" value={persona.name} onChange={handleInput} autoFocus />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" value={persona.email} onChange={handleInput} />
          </div>
          <div className="p-field">
            <label htmlFor="age">Edad</label>
            <InputText id="age" name="age" value={persona.age} onChange={handleInput} />
          </div>
          <div className="p-field">
            <label htmlFor="gender">Genero</label>
            <InputText id="gender" name="gender" value={persona.gender} onChange={handleInput} />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Guardar" icon="pi pi-check" onClick={savePerson} autoFocus />
        </div>
      </Dialog>
    </div>
  );
}

export default Personas;
