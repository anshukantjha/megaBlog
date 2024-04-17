import config from '../config/config.js'
import {Client,Account,ID} from 'appwrite'


export class Authservice{
    client = new Client()
    account;

    // this const. for appwrite in future if want another than change only const.
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId); 
        this.account = new Account(this.client)
    }

    async createAccount ({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                // call another method which directly logins 
                return this.loginAccount({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async loginAccount ({email,password}){
        try {
            const session =await this.account.createEmailPasswordSession(email,password)
            return session;
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
            // gives userData
        } catch (error) {
            throw error
        }
    }

    async logoutAccount(){
        try {
            await this.account.deleteSessions() 
        } catch (error) {
            throw error
        }
    }
}

const authservice = new Authservice()

export default authservice