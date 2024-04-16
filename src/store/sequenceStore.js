
import axios from "@axios";


export default {

    state: {

        sequences: [],
        segments: []

    },

    mutations: {


        setSequences(state, data) {
            state.sequences = data
        },
        setSegments(state, data) {
            state.segments = data
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

    },
    getters: {

        getSequences(state) {
            return state.sequences
        },
        getSegments(state) {
            return state.segments
        }

    },
}
