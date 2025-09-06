export type User = { name: string; user: string }
export type UserList = Array<User & { pass: string }>

export async function getUser() {
  const request = await fetch('/current.json')
  const user: User = await request.json()
  return user
}

export async function login(username: string, password: string) {
  const request = await fetch('http://bcnutris.bca-365.com:7048/BC230/api/beta/companies(26671DE8-CA21-4927-A4E7-4BD8B962A35D)/RG35Login?$filter=user')
  const usersJson: UserList = await request.json()
  return usersJson.find(s => s.pass === password && s.user === username)
}