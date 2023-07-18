import {atom} from 'recoil'

export const usersState  = atom<{name : string, email : string, _id : string}[]>({
    key: 'users',
    default : []
})