import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css'
import columnDesign from './columnDesign'
import onDragEnd from './onDragEnd'
import itemsFromBackend from './componentsBackend'

const columnsFromBackend = {
  [uuid()]: {
    name: "Components",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "Area",
    items: []
  },
};

const Modal = (props) => {
  const {handleClose,popUp,removed} = props;
  const showHideClassName = popUp?"modal display-block":"modal display-none";
  return(
    <div className={showHideClassName}>
      <div className="modal-main">
         <form>
           <label>Component Name</label>
           <input type="text" defaultValue={removed.componentName} 
           onChange={(event)=>{removed.componentName=event.target.value}}/>

           <label>Component Description</label>
           <input type="text" defaultValue={removed.componentDescription} 
           onChange={(event)=>{removed.componentDescription=event.target.value}}/>
         </form>
        <button type="button" onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  )
}

function App() {
  const [removed,setRemoved]=useState({});
  const [generatedPayload,setGeneratedPayload]=useState({});
  const [draggedComponentName,setDraggedComponentName]=useState('');
  const [popUp,setPopUp] = useState(false);
  const [columns, setColumns] = useState(Object.entries(columnsFromBackend));
  console.log(columns)
  console.log('Columns----->>',columns);
  return (
    <div className="overall">
      <div className="main">

        <DragDropContext onDragEnd={result => {
          setPopUp(true);
          const removedItem=onDragEnd(result, columns, setColumns);
          setRemoved(removedItem);
          setDraggedComponentName(removedItem.name);
          }}> 

          <Modal handleClose = {()=>setPopUp(false)} popUp={popUp} removed={removed} />

          {generatedPayload[draggedComponentName].push({name:removed.name,params:removed.params})}

          {columnDesign(columns,0,"componentsAlignment")}
          {columnDesign(columns,1,"areaAlignment")}

        </DragDropContext>

      </div>
      <button type="button">GENERATE</button>
    </div>
  );
}

export default App;
