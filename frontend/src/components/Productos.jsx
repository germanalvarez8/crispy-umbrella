import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = 'http://localhost:3000/productos';

function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', stock: 0, price: 0 });
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const openNew = () => {
    setProduct({ name: '', stock: 0, price: 0 });
    setEditMode(false);
    setVisible(true);
  };

  const openEdit = (row) => {
    setProduct(row);
    setEditMode(true);
    setVisible(true);
  };

  const saveProduct = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${product.id}`, product);
    } else {
      await axios.post(API_URL, product);
    }
    setVisible(false);
    fetchProducts();
  };

  const deleteProduct = async (row) => {
    await axios.delete(`${API_URL}/${row.id}`);
    fetchProducts();
  };

  const exportPDF = () => {
    if (!products.length) return;
    const doc = new jsPDF();
    doc.text('Listado de Productos', 14, 15);
    const columns = Object.keys(products[0]);
    const headers = columns.map(col => col.charAt(0).toUpperCase() + col.slice(1));
    const body = products.map(p => columns.map(col => p[col]));
    autoTable(doc, {
      startY: 20,
      head: [headers],
      body,
    });
    doc.save('productos.pdf');
  };

  return (
    <div>
      <Button label="Nuevo Producto" icon="pi pi-plus" className="mb-3 mr-2" onClick={openNew} />
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="mb-3 p-button-danger" onClick={exportPDF} />
      <DataTable value={products} selectionMode="single" selection={selected} onSelectionChange={e => setSelected(e.value)} dataKey="id" paginator rows={5} className="p-mb-3">
        <Column field="name" header="Nombre" sortable></Column>
        <Column field="stock" header="Stock" sortable></Column>
        <Column field="price" header="Precio" sortable></Column>
        <Column
          header="Acciones"
          body={(row) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-3" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProduct(row)} />
            </>
          )}
        />
      </DataTable>
      <Dialog header={editMode ? 'Editar Producto' : 'Nuevo Producto'} visible={visible} style={{ width: '350px' }} modal onHide={() => setVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Nombre</label>
            <InputText id="name" name="name" value={product.name} onChange={handleInput} autoFocus />
          </div>
          <div className="p-field">
            <label htmlFor="price">Precio</label>
            <InputText id="price" name="price" value={product.price} onChange={handleInput} />
          </div>
          <div className="p-field">
            <label htmlFor="stock">Stock</label>
            <InputText id="stock" name="stock" value={product.stock} onChange={handleInput} />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} autoFocus />
        </div>
      </Dialog>
    </div>
  );
}

export default Products;
