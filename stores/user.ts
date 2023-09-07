
import { User } from "firebase/auth";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    getAuth,
    updatePassword,
    Auth,
 } from "firebase/auth";
import { 
    collection,  
    query, 
    getDocs,
    doc,
    where,
    updateDoc,
    Firestore, 
 } from 'firebase/firestore'
import { db, auth } from '@/libs/firebase' 
import UsersService from '../services/user';
import { useNotificationStore } from './notification'
import { IUser, TUserRole } from '@/types';

interface IUserStoreState {
    user: User | null
    userDetails: IUser | null
    users: IUser[] 
}


export const useUserStore = defineStore('user', {

    state: (): IUserStoreState => ({
        user: null,
        userDetails: null,
        users: []
    }),

    actions: {
      
        login(email: string, password: string ): void {
            const notify = useNotificationStore()
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    this.user = userCredential.user
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // const errorMessage = error.message;
                    notify.SetNofication('Error', errorCode, 'error')
                });
        },
 
        async register(username: string, email: string, password: string, role: TUserRole): Promise<void>{
            const notify = useNotificationStore()
            const user = await UsersService.getUserByUsername(username)
            
            if(user){
                notify.SetNofication('Error', 'Пользователь с таким именем уже существует', 'error')
                return
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {                     
                    updateProfile(auth.currentUser! as User, {
                        displayName: username
                      }).then(() => {
                        UsersService.createUser({
                            userId: userCredential.user.uid,
                            username,
                            email,
                            soundAlert: true,
                            role
                        }).then((id) => {
                            notify.SetNofication('Успесшно!', 'Пользователь успешно добавлен', 'success')
                            const user: IUser = {
                                id,
                                userId: userCredential.user.uid,
                                username,
                                email,
                                soundAlert: true, 
                                role
                            }
                            this.users.push(user)
                        })      
                      })                           
            })
            .catch((error) => {
                const errorCode = error.code;
                notify.SetNofication('Error', errorCode, 'error') 
            });
        },

        async getUserDetails() {
            const id = this.user?.uid as string

            try {
                const q = query(collection(db, "User"), where("userId", "==", id))
                    const result = await getDocs(q)
                    result.forEach((doc) => {
                        this.userDetails = {
                            id: doc.id,
                            ...doc.data() as IUser
                        }
                    })
                
            } catch (error) {
                console.log('error', error)

            }
            
        },

        async getAllUsers() {
            this.users = []
            try {
                const q = query(collection(db, "User"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    this.users.push({id: doc.id, ...doc.data() as IUser })
                })
                
            } catch (error) {
                console.log(error)
            }
        },

        async updateUser(username: string, password: string) {
            const notify = useNotificationStore()
            const user = await UsersService.getUserByUsername(username)
            
            if(user){
                notify.SetNofication('Error', 'Пользователь с таким именем уже существует', 'error')
                return
            }
           
            console.log(username, password )
            const auth = getAuth()
           
            updatePassword(auth.currentUser!, password).then(() => {
                const docRef = doc(db, "User", this.userDetails?.id as string);

                const data: Partial<IUser> = {
                    username
                }
                
                updateDoc(docRef, data).then(() => {
                    notify.SetNofication('Succes', 'Пользователь успешно обновлен', 'success')
                    this.userDetails!.username = username
                })
            }).catch(() => {
                notify.SetNofication('Error', 'Ошибка обновления пользователя', 'error')
            })
        },

        updateUserSettings(soundAlert: boolean) {
            const notify = useNotificationStore()
            const docRef = doc(db, "User", this.userDetails?.id as string);

            const data: Partial<IUser> = {
                soundAlert
            }

            updateDoc(docRef, data).then(() => {
                this.userDetails!.soundAlert = soundAlert
                notify.SetNofication('Succes', 'Пользователь успешно обновлен', 'success')
                
            }).catch(() => {

            })
        },
        
        // async deleteUser(user: IUser) {
           
        // },

        singOut() {
            auth.signOut()
            this.user = null 
        }
    },


})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}