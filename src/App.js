import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import './App.css'
import columnDesign from './columnDesign'
import onDragEnd from './onDragEnd'
import itemsFromBackend from './componentsBackend'
import axios from "axios";

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
  let params;
  console.log(removed);
  if(Object.keys(removed).length===0){
    return null;
  }
  params=removed.componentTemplate.parameters;
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

           {Object.keys(params).map((element)=>{
             return(
               <div>
                  <label>Component {element}</label>
                  <input type="text" onChange={(event)=>params[element]=event.target.value}></input> 
                </div>
             )
           })}

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
  let [generatedPayload,setGeneratedPayload]=useState({});
  
  const [popUp,setPopUp] = useState(false);
  const [columns, setColumns] = useState(Object.entries(columnsFromBackend));
  return (
    <div className="overall">
      <div className="main">

        <DragDropContext onDragEnd={result => {
          setPopUp(true);
          const removedItem=onDragEnd(result, columns, setColumns);
          removedItem.type=removedItem.componentName;
          setRemoved(removedItem);
          }}> 
       
          <Modal handleClose = {()=>{
            if(!generatedPayload[removed.type]){
              generatedPayload[removed.type]=[];
              generatedPayload[removed.type].push({name:removed.componentName,params:removed.componentTemplate.parameters});
            }
            else
              generatedPayload[removed.type].push({name:removed.componentName,params:removed.componentTemplate.parameters});
              setPopUp(false)
              console.log('yayayayayayaya',removed.componentTemplate.parameters)
          }} popUp={popUp} removed={removed}/>

          {columnDesign(columns,0,"componentsAlignment")}
          {columnDesign(columns,1,"areaAlignment")}

        </DragDropContext>

      </div>
      <button type="button" onClick={async()=>{
        
        console.log('Pay load',generatedPayload);
        
        axios({
        method:'post',
        url: 'http://localhost:8080/user/generateIaC',
        data:
         generatedPayload
      })}}>GENERATE</button>
    </div>
  );
}

export default App;
