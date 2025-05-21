import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { TabView, TabPanel } from 'primereact/tabview';
import Productos from './components/Productos';
import Personas from './components/Personas';

function App() {
  return (
    <div className="p-m-4 border-round">
      <h1 className="p-text-center">Gestión de Productos y Personas</h1>
      <TabView>
        <TabPanel header="Productos">
          <Productos />
        </TabPanel>
        <TabPanel header="Personas">
          <Personas />
        </TabPanel>
      </TabView>
    </div>
  );
}

export default App;
