
import axios from "@axios";


export default {

    state: {

        sequences: [],
        segments: [],
        templates: [],
        buttons: [],

    },

    mutations: {


        setSequences(state, data) {
            state.sequences = data
        },
        setSegments(state, data) {
            state.segments = data
        },
        setTemplates(state, data) {
            state.templates = data
        },
        setButtons(state, data) {
            state.buttons = data
        }

    },
    actions: {
        listSequences({ commit, state }) {
            axios
                .get(`dashboard/sequence?status=active`)
                .then((response) => {
                    commit('setSequences', response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        listSegments({ commit, state }) {
            axios
                .get(`dashboard/segmant`)
                .then((response) => {
                    commit('setSegments', response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        listTemplates({ commit, state }) {
            axios
                .get(`dashboard/list-templates`)
                .then((response) => {
                    commit('setTemplates', response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        listButtons({ commit, state }) {
            axios
                .get(`dashboard/list-buttons`)
                .then((response) => {
                    commit('setButtons', response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },

    },
    getters: {

        getSequences(state) {
            return state.sequences
        },
        getSegments(state) {
            return state.segments.data
        },
        getTemplates(state) {
            return state.templates.error
        },
        getButtons(state) {
            return state.buttons.data
        }

    },
}
