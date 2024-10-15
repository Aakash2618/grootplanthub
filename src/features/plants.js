import { createSlice } from "@reduxjs/toolkit";
// import { preview } from "vite";

const initialState={
    plant:[{id:"1",name:"alovers",img_url:"alovera.jpg",price:60}]
}


export const plantSlice=createSlice({
    name:"plant",
    initialState,
    reducers:{
        addPlant:(state,action)=>{
            let newPlant={
                id:action.payload,
                name:action.payload,
                img_url:action.payload,
                price:action.payload
            }
            state.plant.push(newPlant)
        },
        removePlant:(state,action)=>{
            state.plant.filter((item)=>{item.id!==action.payload.id})
        },
        updatePlant:(state,action)=>{
            let plant=state.plant.find(item => item.id==action.payload.id)

        }
    }
})

export const {addPlant,removePlant,updatePlant}=plantSlice.actions;
export default plantSlice.reducer;