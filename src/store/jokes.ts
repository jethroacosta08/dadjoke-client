import { defineStore } from "pinia";
import ApiService from "../services/ApiService";
import { JokesType } from "../types";

const BASE_URL = "http://127.0.0.1/api";

const defaultState = {
    current_page: 1,
    next_page: 0,
    previous_page: 0,
    total_pages: 0,
    limit: 20,
    term: "",
    results: []
}

const useJokes = defineStore('jokes', {
    state: () => defaultState,
    getters: {
        currentJokes: (state) => {
            return state
        }
    },
    actions: {
        async get(search = "", page = 1) {
            try {
                this.term = search;
                this.page = page;
                const response = await ApiService.get(`${BASE_URL}/jokes?limit=${this.limit}&term=${search}&page=${page}`)
                console.log(response.data);
                const jokes = response.data as JokesType;
                this.term = jokes.search_term;
                this.current_page = jokes.current_page;
                this.next_page = jokes.next_page;
                this.previous_page = jokes.previous_page;
                this.total_pages = jokes.total_pages;
                this.results = jokes.results;
            } catch (err) {
                console.error(err);
            }
        }
    }
})

export default useJokes;