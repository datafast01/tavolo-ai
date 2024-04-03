<template>
    <v-stepper editable v-model="e1">
        <v-stepper-header>
            <v-stepper-item title="Create Sequence" :complete="e1 > 1" value="1">

            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Select Template" :complete="e1 > 2" value="2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Create an ad" :complete="e1 > 3" value="3"></v-stepper-item>
        </v-stepper-header>
        <v-stepper-window>
            <v-stepper-window-item value="1">
                <NewSequence />
                <v-btn color="primary" @click="e1 = 1">
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
                <SelectTemplate />
                <v-btn color="primary" @click="e1 = 2">
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-window-item>
            <v-stepper-window-item value="3">
                <CreateEmail />
                <PreviewTemplate ref="previewTemplate" />
                <v-btn color="primary" @click="e1 = 0">
                    Continue
                </v-btn>
                <v-btn color="primary" @click="previewEmail">
                    Preview
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-window-item>
        </v-stepper-window>

    </v-stepper>
</template>

<script>
import NewSequence from './NewSequence.vue'
import SelectTemplate from './SelectTemplate.vue'
import CreateEmail from './CreateEmail.vue'
import PreviewTemplate from './PreviewTemplate.vue'
export default {
    components: { NewSequence, SelectTemplate, CreateEmail, PreviewTemplate },
    data() {
        return {
            e1: 0,
        }
    },
    methods: {
        previewEmail() {
            this.$refs.previewTemplate.dialog = true
        }
    }
}
</script>