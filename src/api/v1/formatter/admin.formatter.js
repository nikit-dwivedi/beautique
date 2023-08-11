import { randomBytes } from 'crypto';
import { encryption } from "../middleware/authToken.js"

export function adminFormatter(adminData) {
    const adminId = randomBytes(4).toString("hex")
    let { name, email, password } = adminData
    return { adminId, name, email, password }
}
export function updateAdminFormatter(adminData) {
    let { name, email, password } = adminData
    return { name, email, password }
}