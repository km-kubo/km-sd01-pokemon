<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { data: trainer } = await useFetch(
    () => `${config.backendOrigin}/api/trainer/${route.params.name}`
);
console.log('[FR]'+JSON.stringify(trainer));
const onSubmit = async (name) => {
    console.log(name);
    const response = await fetch(`${config.backendOrigin}/api/trainer/${route.params.name}`, {
    method: "DELETE",
    });
    if (!response.ok) return;
    router.push(`/`);
}
</script>
<template>
    <div>
        <h1>トレーナー情報</h1>
        <div>
            <img src="/avatar.png" alt="" width="50">
            {{ route.params.name }}
        </div>
        <GamifyButton @click="onSubmit($route.params.name)">マサラタウンにかえる</GamifyButton>
        <h2>てもちポケモン</h2>
        <CatchButton :to="`/trainer/${route.params.name}/catch`">ポケモンをつかまえる</CatchButton>
        <GamifyList>
            {{ trainer.pokemons.length }}
        <div v-if="trainer.pokemons.length">
            <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon">
                <div>
                    <img :src=pokemon.sprites.front_default alt="">
                    {{ pokemon.name }}
                    <GamifyButton>ニックネームをつける</GamifyButton>
                    <GamifyButton>はかせにおくる</GamifyButton>
                </div>
            </GamifyItem>
        </div>
        </GamifyList>
    </div>
</template>