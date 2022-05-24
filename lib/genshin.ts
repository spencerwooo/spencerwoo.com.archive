import { GenshinKit } from '@genshin-kit/core'

const getGenshinUserInfo = async () => {
  const genshin = new GenshinKit()
  genshin.loginWithCookie(process.env.MIHOYO_COOKIE || '')

  return await genshin.getUserInfo(168305666)
}
export default getGenshinUserInfo
