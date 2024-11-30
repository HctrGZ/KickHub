export interface Posts{
    _id?: string; 
    username: string,
    content: string,
    image: string,
    likes: string[],
    createdAt: Date,
    updatedAt: Date
}