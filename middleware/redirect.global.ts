const redirectMapping = {
    '/': '/chat',
    '/settings': '/settings/model',
} as Record<string, string>

export default defineNuxtRouteMiddleware((to) => {
    if (to.path in redirectMapping) {
        return navigateTo(redirectMapping[to.path])
    }
})
