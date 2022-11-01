module.exports = function userDtoFunc(user) {
  const { user_id, user_email, is_active, date_of_registration } = user
  return { user_id, user_email, is_active, date_of_registration }
}
