<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { data: trainer } = await useFetch(
    () => `${config.backendOrigin}/api/trainer/${route.params.name}`
);
const onSubmit = async (name) => {
    console.log(name);
    const response = await fetch(`${config.backendOrigin}/api/trainer/${route.params.name}`, {
    method: "DELETE",
    });
    if (!response.ok) return;
    router.push(`/trainer`);
}
</script>
<template>
    <div>
        <h1>トレーナー情報</h1>
        <div>
            <img src="/avatar.png" alt="" width="50">
            {{ $route.params.name }}
        </div>
        <GamifyButton @click="onSubmit($route.params.name)">マサラタウンにかえる</GamifyButton>
        <h2>てもちポケモン</h2>
        <CatchButton :to="`/trainer/${trainer.name}/catch`">ポケモンをつかまえる</CatchButton>
        <GamifyList>
        <GamifyItem v-if="true">
            <NuxtLink to="/trainer">aaa</NuxtLink>
        </GamifyItem>
        </GamifyList>
    </div>
</template>