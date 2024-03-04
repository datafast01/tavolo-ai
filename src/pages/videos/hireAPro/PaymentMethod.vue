<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="7">
          <VRow>
            <VCol cols="2" v-for="payment in paymentMethods" :key="payment">
              <v-badge content="✓" color="#9155FD">
                <div class="vavatar">
                  <v-img :src="payment.icon" alt="John"></v-img>
                </div>
              </v-badge>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Payment Method</span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="cardHolderName"
            label="Cardholder Name"
            Value="First"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="6">
          <VTextField
            :rules="[requiredValidator]"
            v-model="cardNumber"
            label="Card Number"
            type="data"
          />
        </VCol>

        <VCol cols="3">
          <VTextField
            :rules="[requiredValidator]"
            v-model="expiryDate"
            label="Expiry Date"
            type="date"
          />
        </VCol>

        <VCol cols="3">
          <VTextField
            :rules="[requiredValidator]"
            v-model="ccv"
            label="CCV"
            type="number"
          />
        </VCol>
        <VCol cols="12" class="py-2">
          <v-checkbox
            label="Save this card for future payments"
            v-model="saveCard"
          ></v-checkbox>
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
</template>

<script>
import pay3 from "@/assets/images/cards/pay11.png";
import pay2 from "@/assets/images/cards/pay12.png";
import pay4 from "@/assets/images/cards/pay13.png";
import pay1 from "@/assets/images/cards/pay14.png";
import { requiredValidator } from "@validators";

export default {
  data() {
    return {
      requiredValidator: requiredValidator,

      saveCard: false,
      ccv: "",
      expiryDate: "",
      cardNumber: "",
      cardHolderName: "",

      paymentMethods: [
        { key: "masterCard", icon: pay1 },
        { key: "applePay", icon: pay2 },
        { key: "visa", icon: pay3 },
        { key: "paypal", icon: pay4 },
      ],
      selectedPaymentMethod: "visa",
    };
  },
};
</script>
<style scoped>
.vavatar {
  border-radius: 7px;
  width: 80px;
  padding: 7px 6px;
  border: 2px solid #9155fd;
  text-align: center;
  height: 40px;
}
.vavatar-border {
  border: 2px solid #625d7a !important;
}
.h-totle {
  font-size: 32px;
  line-height: 46px;
  font-weight: 500;
  border-top: 2px solid #625d7a;
}
</style>
