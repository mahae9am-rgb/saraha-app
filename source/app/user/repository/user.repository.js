import { User } from "../model/user.model.js";
export async function updateUserByEmail(email,updateUser) {
    return await User.findOneAndUpdate(
        {email:email},
        updateUser,
        {returnDocument:'after'}
    )
}

export default {updateUserByEmail}