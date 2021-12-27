function showSalary(users, age) {

  const usersWithSuitableAge = users.filter(user => user.age <= age)
  const usersSalary = usersWithSuitableAge.map(user =>  user.name + ", " + user.balance)

  return usersSalary.join('\n')
}
