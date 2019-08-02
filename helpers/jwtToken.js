import jwt from 'jsonwebtoken'

const createToken = (payload, secretKey) => jwt.sign(payload, secretKey)

export default createToken
