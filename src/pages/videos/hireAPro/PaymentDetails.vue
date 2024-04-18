<template>
  <div>
    <VCardText>
      <VForm class="mt-6" ref="paymentDetails">
        <VRow>
          <VCol cols="7">
            <VRow>
              <VCol cols="2" v-for="payments in paymentMethods" :key="payments">
                <!-- <v-badge content="✓ " color="#9155FD"> -->
                <div :class="{
                  'selected-card':
                    payments.id !== currentPkg &&
                    paymentDetails.cardType === payments.key,
                  'pricing-card':
                    payments.id == currentPkg &&
                    paymentDetails.cardType == payments.key,
                }" class="vavatar cursor-pointer relative" @click="paymentDetails.cardType = payments.key">
                  <v-img :src="payments.icon" alt="John"></v-img>
                  <div class="p-2" v-if="paymentDetails.cardType == payments.key">
                    <span color="#9155FD" class="tab-i">✓</span>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <span class="text-subtitle-1">Payment Method</span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="paymentDetails.cardHolderName" label="Cardholder Name" Value="First"
              :rules="[requiredValidator, alphaValidator]" />
          </VCol>

          <VCol cols="6">
            <VTextField :rules="[requiredValidator]" v-model="paymentDetails.cardNumber" label="Card Number"
              v-maska:[masking.cardNumber] />
          </VCol>

          <VCol cols="3">
            <VTextField :rules="[requiredValidator]" v-model="paymentDetails.date" v-maska:[masking.cardDate]
              label="Expiry Date" />
          </VCol>

          <VCol cols="3">
            <VTextField :rules="[requiredValidator]" v-model="paymentDetails.ccv" v-maska:[masking.cvc] label="CVC"
              type="number" />
          </VCol>
          <VCol cols="12" class="py-2">
            <v-checkbox label="Save this card for future payments" v-model="paymentDetails.saveCard"></v-checkbox>
          </VCol>
          <!-- <VCol cols="12" class="pt-3 pb-0 h-totle">
          <div class="d-flex flex-row justify-space-between">
            <p class="ma-0">Total Payment</p>
            <p class="ma-0">$75.00</p>
          </div>
        </VCol> -->
        </VRow>
      </VForm>
      <VRow class="ma-0">
        <VCol cols="12" class="pt-3 pb-0 h-totle">
          <div class="pb-5 px-4 d-flex flex-row justify-space-between">
            <p class="ma-0">Total Payment</p>
            <p class="ma-0">$75.00</p>
          </div>
        </VCol>
      </VRow>
    </VCardText>

  </div>
</template>

<script>
import pay3 from "@/assets/images/cards/pay11.png";
import pay2 from "@/assets/images/cards/pay12.png";

import pay4 from "@/assets/images/cards/pay13.png";
import pay1 from "@/assets/images/cards/pay14.png";
import { masking } from "@core/utils/masking";
import { alphaValidator, requiredValidator } from "@validators";
import { vMaska } from "maska";
export default {
  props: {
    paymentDetails: {
      type: Object
    }
  },
  directives: { maska: vMaska },
  data() {
    return {
      requiredValidator: requiredValidator,
      alphaValidator: alphaValidator,
      pay1: pay1,
      saveCard: false,

      masking: masking,

      paymentMethods: [
        { key: "masterCard", icon: pay1 },
        { key: "applePay", icon: pay2 },
        { key: "visa", icon: pay3 },
        { key: "paypal", icon: pay4 },
      ],

    };
  },
  methods: {
    async completePaymentDetails() {
      const { valid } = await this.$refs.paymentDetails.validate()

      if (valid) {
        this.$emit('submitDetails')

      }

    },
    previousState() {
      this.$emit('previousState')
    }

  },
};
</script>
<style scoped>
.vavatar {
  border-radius: 7px;
  width: 80px;
  padding: 7px 6px;
  border: 2px solid #625d7a;
  text-align: center;
  height: 40px;
  position: relative;
}

.pricing-card {
  border: 2px solid #9155fd;
}

.vavatar-border {
  /* border: 2px solid #625d7a !important; */
}

.h-totle {
  font-size: 32px;
  line-height: 46px;
  font-weight: 500;
  border-top: 2px solid #625d7a;
}

.tab-i {
  right: -11px;
  border-radius: 15px;
  background: #8a50f1;
  position: absolute;
  top: -12px;
  padding: 0px 5px;
  color: black;
}
</style>
