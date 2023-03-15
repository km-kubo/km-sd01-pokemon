<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const response = await fetch("https://pokeapi.co/api/v2/pokemon/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
});
const pokemons = await response.json();
const onCatch = async (pokemon) => {
    const response = await fetch(
        `${config.backendOrigin}/api/trainer/${route.params.name}/pokemon/${pokemon.name}`,
        {
            method: "PUT",
        }
    );
    if (!response.ok) return;
    router.push(`/trainer/${route.params.name}`);
};
const { dialog, onOpen, onClose } = useDialog();
</script>
<template>
    <div>
        <h1>ポケモンをつかまえる</h1>
        <div>
            <p>{{ pokemons.count }}しゅるいのポケモン</p>
            {{ pokemons.results.length }}
        </div>
        <GamifyList>
            <GamifyItem v-for="pokemon in pokemons.results" :key="pokemon.url">
                <span>{{ pokemon.name }}</span>
                <GamifyButton @click="onOpen(pokemon)">つかまえる</GamifyButton>
            </GamifyItem>
        </GamifyList>
        <GamifyDialog v-if="dialog" id="confirm-catch" title="かくにん" :description="`ほう！${dialog.name}にするんじゃな？`"
            @close="onClose">
            <GamifyList :border="false" direction="horizon">
                <GamifyItem>
                    <GamifyButton @click="onClose">いいえ</GamifyButton>
                </GamifyItem>
                <GamifyItem>
                    <GamifyButton @click="onCatch(dialog)">はい</GamifyButton>
                </GamifyItem>
            </GamifyList>
        </GamifyDialog>
        <GamifyItem>
            <CatchButton>つぎへ</CatchButton>
            <CatchButton>まえへ</CatchButton>
        </GamifyItem>
    </div>
</template>