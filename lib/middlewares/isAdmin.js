const isAdmin = (req, res, next) => {
  const {
    user: { role },
  } = req
  if (role === 'admin') {
    next()
  }
  return res.status(401).send({
    status: 'error',
    error: 'Unauthorized',
    message: 'Access Denied, You are not Admin',
  })
}

export default isAdmin
