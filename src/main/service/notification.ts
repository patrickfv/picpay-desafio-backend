import { UserModel } from '../../data/models/user-model'

const url = 'https://util.devi.tools/api/v1/notify)'

type HttpNotification = {
    name: string
    status: string
    message: string
}

export const sendNotification = async (user: UserModel) => {
    const res = await fetch(url, { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const httpNotification: HttpNotification = {
        name: 'Notification Service',
        status: res.status.toString(),
        message: res.status == 504 ? 'not available' : `send to ${user.email}`
    }
    console.log(httpNotification)
}