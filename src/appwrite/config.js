import {Storage,Databases,Client,Query,ID} from 'appwrite'
import { useId } from 'react';

export class Service{
 client = new Client();
 databases;
 storage;
 constructor(){
    this.client
        .setEndpoint(import.meta.env.VITE_PROJECT_URL)
        .setProject(import.meta.env.VITE_PROJECT_ID)
    this.databases=new Databases(this.client)
    this.storage=new Storage(this.client)
 }
 async addPlant({plant_name,typ,featured_img,description,price}){
    let type=JSON.stringify(typ)
    try{
        // console.log(type1)
        // console.log(type)
        return await this.databases.createDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,ID.unique(),{plant_name,type,description,featured_img,price})
    }
    catch(error){
        console.log(error)
    }
 }
 async updatePlant(id,{plant_name,description,price,featured_img}){
    try {
        return await this.databases.updateDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,id,{plant_name,description,price,featured_img})
    } catch (error) {
        console.log(error)
    }
 }
 async deletePlant(id){
    try {
       await this.databases.deleteDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,id)
       return true;
    } catch (error) {
        console.log(error)
        return false
    }
 }
 async getPlant(id){
    try {
        return await this.databases.getDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,id)
    } catch (error) {
        console.log(error)
    }
 }
 async allPlant(query){
    try {
        if(query){
            return await this.databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,[Query.equal("type",[query])])
        }
        else{
            return await this.databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,[Query.limit(20),Query.offset(0)])
        }
    } catch (error) {
        console.log(error)
    }
 }
 // FILE SERVICES
 async uploadFile({featured_img}){
    // console.log(featured_img)
    try {
        const res= await this.storage.createFile(import.meta.env.VITE_BUCKET_ID,ID.unique(),featured_img)
        console.log(res)
        return res;
        
    } catch (error) {
        console.log(error)
        return false;
    }
 }
 async deleteFile(fileId){
    try {
        await this.storage.deleteFile(import.meta.env.VITE_BUCKET_ID,fileId)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
 }
 async getFile(fileId){
    try {
        return this.storage.getFile(import.meta.env.VITE_BUCKET_ID,fileId)
    } catch (error) {
        console.log(error)
    }
 }
//  async getFilePreview(fileId){
//     try {
//         return await this.storage.getFilePreview(import.meta.env.VITE_BUCKET_ID,fileId)
//     } catch (error) {
//         console.log(error)
//     }
//  }

// Cart Functionalites
 async addCartItem(data){
    console.log("from back",data)
    try {
       return await this.databases.createDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_CART_ID,ID.unique(),data)
    } catch (error) {
        console.log(error)
    }
 }
 async getCartItems({$id}){
    console.log("dklfj",$id)
    try {
       return await this.databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_CART_ID,[Query.equal("User_id",[$id])])
    } catch (error) {
        console.log(error)
    }
 }
 async updateCartItems({$id}){
    try {
        return await this.databases.updateDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_CART_ID,$id,data)
    } catch (error) {
        console.log(error)
    }
 }
 async deleteCartItem($id){
     try {
        return await this.databases.deleteDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_CART_ID,$id)
     } catch (error) {
        console.log(error)
     }
 }
}
const service = new Service()
export default service;