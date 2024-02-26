<template>
  <div class="wrapper-steppy bg-card" :style="cssVars">
    <div class="px-8 pt-8">
      <div>
        <p class="h-1">Influencer Collaboration Agreement Checkout</p>
      </div>
      <div class="steppy">
        <div class="steppy-progress">
          <div
            class="steppy-progress-bar"
            :style="'width:' + multiStepperProgress"
          ></div>
        </div>

        <div
          class="steppy-item"
          :class="{
            current: props.step === index + 1,
            success: props.step > index + 1,
          }"
          v-for="(item, index) in props.tabs"
          :key="index"
        >
          <div class="steppy-item-counter">
            <img
              v-if="item.iconSuccess"
              class="icon-success"
              :src="item.iconSuccess"
              alt="Check Mark"
            />
            <!-- <CheckMark
            v-else
            class="icon-success"
            :color="primaryColor1"
            alt="Check Mark"
          /> -->
            <span class="number">{{ index + 1 }}</span>
          </div>
          <!-- <span class="steppy-item-title">{{ item.title }}</span> -->
        </div>
      </div>
    </div>

    <div class="steppy-content" v-for="index in props.tabs.length" :key="index">
      <div class="steppy-pane" v-if="props.step === index">
        <slot :name="index"></slot>
      </div>
    </div>
  </div>

  <div class="wrapper-steppy px-0 mt-6">
    <div class="controls d-flex flex-row justify-space-between">
      <button class="btn" @click="decrementStep" v-if="props.step !== 1">
        {{ props.backText }}
      </button>
      <button
        class="btn btn--default-2"
        @click="incrementStep"
        v-if="props.step !== props.tabs.length"
        :disabled="!props.tabs[props.step - 1].isValid"
      >
        {{ props.nextText }}
      </button>
      <button
        class="btn btn--default-2"
        @click="finalize"
        v-else
        :disabled="!props.tabs[props.step - 1].isValid || loading"
      >
        <span v-if="loading" class="loader"></span>
        <span v-else>{{ props.doneText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
// import CheckMark from "./Icons/CheckMark.vue";

const emit = defineEmits(["update:step"]);

const props = defineProps({
  step: {
    type: Number,
    default: 1,
  },
  tabs: {
    type: Array,
    default: reactive([
      {
        title: "Company",
        iconSuccess: null,
        isValid: true,
      },
      {
        title: "Company Additional Info",
        iconSuccess: null,
        isValid: true,
      },
      {
        title: "Employees",
        iconSuccess: null,
        isValid: true,
      },

      {
        title: "Your Details",
        iconSuccess: null,
        isValid: true,
      },
      {
        title: "Verification",
        iconSuccess: null,
        isValid: true,
      },
    ]),
  },
  finalize: {
    // type: Function,
    // default: function () {
    //   return {};
    // },
  },
  backText: {
    type: String,
    default: "Back",
  },
  nextText: {
    type: String,
    default: "Next ",
  },
  doneText: {
    type: String,
    default: "Done",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  primaryColor1: {
    type: String,
    default: "orange",
  },
  primaryColor2: {
    type: String,
    default: "#fff",
  },
  validateStep: {
    type: Function,
    default: () => true,
  },
});

const cssVars = computed(() => {
  return {
    "--primaryColor1": props.primaryColor1,
    "--primaryColor2": props.primaryColor2,
  };
});

const incrementStep = () => {
  const currentStep = props.step;
  const isValid = props.validateStep(currentStep);

  if (isValid) {
    const step = currentStep + 1;
    emit("update:step", step);
  }
};

const decrementStep = () => {
  const step = props.step - 1;
  emit("update:step", step);
};

const multiStepperProgress = computed(() => {
  return (100 / (props.tabs.length - 1)) * (props.step - 1) + "%";
});
</script>

<style scoped lang="scss">
$primary-1: var(--primaryColor1);
$primary-2: var(--primaryColor2);
$transition: all 500ms ease;

body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

.v-row {
  margin: 0px !important;
}
::v-deep .v-form {
  padding: 0px 32px 32px 32px !important;
}
.h-1 {
  font-size: 30px;
  line-height: 50px;
}
.tx-default-2 {
  color: $primary-1;
  font-weight: 600;
}

.bg-card {
  background-color: #312d4b;
  border-radius: 7px;
}
// .wrapper-steppy {
//   padding: 2rem;
// }

::v-deep .v-card-text {
  padding: 0px !important;
}
.steppy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  position: relative;
  z-index: 0;
  margin-bottom: 5px;

  &-progress {
    position: absolute;
    background-color: #3d3759;
    height: 13px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 5px;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0;
      background-color: $primary-1;
      transition: $transition;
      border-radius: 5px;
    }
  }
}

.steppy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c500;
  transition: $transition;

  &-counter {
    height: 68px;
    width: 68px;
    display: grid;
    place-items: center;
    background-color: $primary-2;
    border-radius: 100%;
    border: 2px solid #c5c5c5;
    position: relative;

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      width: 24px;
      transition: $transition;
    }

    .number {
      font-size: 22px;
      transition: $transition;
    }
  }

  &-title {
    position: absolute;
    text-align: center;
    font-size: 14px;
    bottom: -43px;
  }
}

.steppy-item.success {
  .steppy-item-counter {
    border-color: $primary-1;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .steppy-item-title {
    color: $primary-1;
  }
}

.steppy-item.current {
  .steppy-item-counter {
    border-color: $primary-1;
    background-color: $primary-1;
    color: #fff;
    font-weight: 600;
  }

  .steppy-item-title {
    color: #818181;
  }
}

.steppy-pane {
  border-radius: 15px;

  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  // margin: 60px 0 20px 0;
}

.controls {
  display: flex;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 4px;
  width: fit-content;
  font-size: 0.75rem;
  /* color: #333; */
  background-color: #28243d;
  border: 1px solid #3d3759;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--default-2 {
    background-color: $primary-1;
    border-color: $primary-1;
    color: #fff;
    margin-left: auto;
  }
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.steppy-item-counter {
  height: 40px;
  width: 40px;
  border: none;
}

.steppy-item-counter .number {
  font-size: 1rem;
}

.controls {
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
}

.controls .btn {
  align-self: center;
}

.btn--default-2 {
  // margin: auto;
  text-align: center;
  background: #9155fd;
  border-radius: 4px;
  border: none;
  height: 40px;
  width: 20%;
  font-size: 1rem;
  color: #000407;
  font-weight: bold;
}

@media (max-width: 600px) {
  .steppy-item-title {
    display: none;
  }
  .steppy-pane {
    margin: 10px 0 10px 0;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
