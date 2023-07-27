<template>
    <div class="unsubscribe">
        <h2>Unsubscribe</h2>
        <p v-if="!isUnsubscribed">
            Are you sure you want to unsubscribe from our newsletter?
        </p>
        <p v-else>
            You have been unsubscribed from our newsletter. Thank you.
        </p>
        <input v-if="!isUnsubscribed" v-model="email" type="email" placeholder="Enter your email address" />
        <button v-if="!isUnsubscribed" @click="unsubscribe">Unsubscribe</button>
        <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import httpService from '@/services/http.service';
import { AxiosError } from 'axios';
  
  const isUnsubscribed = ref(false);
  const email = ref('');
  const message = ref('');
  
  const unsubscribe = async () => {
    try {
        const result = await httpService.request("DELETE", "subscribe", { email: email.value });
        isUnsubscribed.value = true;
        console.log(result)
    } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
            message.value = error.response?.data.message || error.message;
        }
        console.error(error);
    }
  };
  </script>
  
<style scoped>
    .unsubscribe {
        max-width: 500px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
    }

    .unsubscribe h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .unsubscribe p {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .unsubscribe input {
        padding: 10px;
        font-size: 16px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .unsubscribe button {
        background-color: #ff4d4f;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        font-size: 16px;
        cursor: pointer;
    }

    .unsubscribe button:hover {
        background-color: #ff7875;
    }
</style>