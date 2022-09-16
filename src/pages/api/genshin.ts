import { GenshinKit } from '@genshin-kit/core'

const genshin = new GenshinKit()

export async function get() {
  try {
    genshin.loginWithCookie(import.meta.env.MIHOYO_COOKIE)
    const user = await genshin.getUserInfo(168305666)
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate' }, // 1 day
    })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
