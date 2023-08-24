import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs,
    Firestore,
} from "firebase/firestore";
import { IUser } from '../types'
import { db } from '@/libs/firebase' 


export default class UsersService {

    static async createUser(user: IUser): Promise<string> {
        const docRef = await addDoc(collection(db, "User"), user)
        return docRef.id
    }

    static async getUserByUsername(username: string): Promise<IUser | undefined> {
        
        let user: IUser | undefined
        const q = query(collection(db, "User"), where("username", "==", username))
        const result = await getDocs(q)

        result.forEach((doc) => {
            user = {
                id: doc.id,
                ...doc.data() as IUser
            }
        })

        return user
    }

    static async getAllUsers(): Promise<IUser[] | undefined> {
        const Users: IUser[] = []
        const q = query(collection(db, "Users"))
        const result = await getDocs(q)

        result.forEach(doc => {
           const user: IUser = doc.data() as IUser
           Users.push(user)
        })
        
       return Users
    }
} 