module.exports = function userDtoFunction(user) {
  const { userId, userEmail, isActive, dateOfRegistration } = user
  return { userId, userEmail, isActive, dateOfRegistration }
}
