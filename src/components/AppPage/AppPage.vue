<template>
    <wd-config-provider theme="dark" custom-class="app-page">
        <slot />
    </wd-config-provider>
</template>

<style lang="scss">
.app-page {
    height: 100%;
    background-color: var(--wot-filled-bottom);
    color: var(--wot-text-main);
}
</style>
