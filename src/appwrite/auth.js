import { Client, Account, ID} from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(import.meta.env.VITE_PROJECT_URL)
        this.client.setProject(import.meta.env.VITE_PROJECT_ID);
        // this.client.setKey(import.meta.env.VITE_API_KEY);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name="akki"}){
        try{
           const userAccount = await this.account.create(ID.unique(),email,password,name)
           if(userAccount){
            // here we will call the another method like redirect to login page or directly login the user
            return this.logIn({email,password})
           }else{
            return userAccount
           }
        }
        catch(error){
            throw error.message;
        }
    }
    async logIn({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            return error
        }
    }
    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error.message
        }
    }
    async getCurrentUser(){
        try{
          return await this.account.get()
        }
        catch(error){
            console.log(error.message)
        }
        // if there is something error in try catch block then in that case it return null also if no user is there then also its returns null
        return null
    }
}
const authService = new AuthService()

export default authService