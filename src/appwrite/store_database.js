import config from '../config/config'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);

    }

    async createPost({ Title, slug, content, image, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,//or use ID.unique() value as of tut
                {
                    Title,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { Title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    Title,
                    content,
                    image,
                    status
                }

            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug

            )
        } catch (error) {
            throw error
        }
    }
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    // whichever post are active get only those post
                    Query.equal('status', 'active')
                ]

            )
        } catch (error) {
            throw error
        }
    }

    // file upload service or method below
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service