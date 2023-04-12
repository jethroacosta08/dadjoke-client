<template>
    <div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <form class="w-full min-w-full">
                    <div class="flex items-center border-b border-teal-500 py-2">
                        <input
                            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text" placeholder="Search" v-model="searchTerm">
                        <label class="flex-shrink-0 px-2">
                            page {{ `${getJokes.current_page} of ${getJokes.total_pages}` }}
                        </label>
                        <button v-if="getJokes.previous_page != getJokes.current_page"
                            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-sm border-4 text-white py-1 px-2 mx-2 rounded"
                            type="button" @click="previous">
                            Previous
                        </button>
                        <button v-if="getJokes.next_page != getJokes.current_page"
                            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button" @click="next">
                            Next
                        </button>
                    </div>
                </form>
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" class="px-6 py-4">#</th>
                                <th scope="col" class="px-6 py-4">Joke</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in getJokes.results" :key="index"
                                class="border-b dark:border-neutral-500">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{ ((getJokes.current_page - 1) *
                                    getJokes.limit) + (index + 1) }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ item.joke }}</td>
                            </tr>
                            <tr v-if="getJokes.results.length == 0">
                                <td colspan="2" class="whitespace-nowrap px-6 py-4 font-medium">
                                    No results found...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import useJokes from "../store/jokes";

const jokes = useJokes();
const searchTerm = ref("");
const debounce = createDebounce();

// Computed
const getJokes = computed(() => {
    return jokes.currentJokes;
})

// Watch
watch(searchTerm, (newVal, oldVal) => {
    debounce(() => {
        console.log(`search term => ${newVal}`);
        jokes.get(newVal, 1);
    })
})

// onMounted
onMounted(async () => {
    await jokes.get();
})

// Functions
function next() {
    jokes.get(getJokes.value.term, getJokes.value.current_page + 1);
}

function previous() {
    jokes.get(getJokes.value.term, getJokes.value.current_page - 1);
}

function createDebounce() {
    let timeout = null;
    return function (fnc, delayMs) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}
</script>