export interface MoviePage {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    uploadedBy: User,
    likes: number,
    hates: number
}

export interface User {
    id: string,
    username: string
}

export interface MovieReactions {
    numberOfLikes: number,
    numberOfHates: number
}